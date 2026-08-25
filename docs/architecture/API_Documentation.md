# Authentication

## User Registration

### Purpose
Register a new user account.

### Endpoint
POST /api/auth/register/

### Authentication
Required: No

### Allowed Roles
- Admin
- Project Manager
- Team Member

### Request Headers
Content-Type: application/json

### Request Body
{
  "email": "user@example.com",
  "password": "securePassword123",
  "first_name": "John",
  "last_name": "Doe",
  "role": "Team Member"
}

### Success Response
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "Team Member",
  "is_active": true,
  "created_at": "2026-08-24T10:00:00Z"
}

### Error Responses
400 Bad Request
- Validation errors (e.g., email already exists, password too weak, missing required fields)
409 Conflict
- Email already registered
500 Internal Server Error
- Unexpected server error

### Validation Rules
- Email must be unique and valid format.
- Password must be at least 8 characters.
- First name and last name are required.
- Role must be one of: Admin, Project Manager, Team Member.

### Business Rules
- Upon registration, the user is set to active by default.
- JWT tokens are not issued upon registration; user must log in to obtain tokens.
- Role assignment must be valid; if not provided, defaults to Team Member (subject to business logic).

## User Login

### Purpose
Authenticate a user and issue JWT access and refresh tokens.

### Endpoint
POST /api/auth/login/

### Authentication
Required: No

### Allowed Roles
- Admin
- Project Manager
- Team Member

### Request Headers
Content-Type: application/json

### Request Body
{
  "email": "user@example.com",
  "password": "securePassword123"
}

### Success Response
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "Team Member"
  }
}

### Error Responses
400 Bad Request
- Email or password missing
401 Unauthorized
- Invalid credentials
403 Forbidden
- Account is inactive
500 Internal Server Error
- Unexpected server error

### Validation Rules
- Email and password are required.
- Email must be valid format.

### Business Rules
- Only active users can log in.
- Upon successful login, JWT access and refresh tokens are returned.
- Access token is short-lived (e.g., 15 minutes), refresh token is long-lived (e.g., 7 days).
- Login attempts may be rate-limited (though not specified in scope).

## Refresh JWT Token

### Purpose
Obtain a new access token using a valid refresh token.

### Endpoint
POST /api/auth/token/refresh/

### Authentication
Required: No (uses refresh token in body)

### Allowed Roles
- Admin
- Project Manager
- Team Member

### Request Headers
Content-Type: application/json

### Request Body
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}

### Success Response
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}

### Error Responses
400 Bad Request
- Refresh token missing or invalid
401 Unauthorized
- Refresh token expired or blacklisted
500 Internal Server Error
- Unexpected server error

### Validation Rules
- Refresh token must be provided and valid.

### Business Rules
- The refresh token is validated against the token blacklist (if implemented) and expiration.
- A new access token is issued; the refresh token remains valid until its expiration (unless rotated).
- Refresh token rotation may be implemented for security (not in scope).

## User Logout

### Purpose
Log out the user by blacklisting the refresh token.

### Endpoint
POST /api/auth/logout/

### Authentication
Required: Yes (access token)

### Allowed Roles
- Admin
- Project Manager
- Team Member

### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

### Request Body
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}

### Success Response
{
  "detail": "Successfully logged out."
}

### Error Responses
400 Bad Request
- Refresh token missing
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Token blacklisted or invalid refresh token
500 Internal Server Error
- Unexpected server error

### Validation Rules
- Refresh token must be provided.
- Access token must be valid and not expired.

### Business Rules
- The refresh token is added to a blacklist to prevent reuse.
- Access token remains valid until expiration but cannot be used to refresh new tokens.
- User must log in again to obtain new tokens.

## Get Current User Profile

### Purpose
Retrieve the profile of the currently authenticated user.

### Endpoint
GET /api/auth/profile/

### Authentication
Required: Yes (access token)

### Allowed Roles
- Admin
- Project Manager
- Team Member

### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

### Request Body
None

### Success Response
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "Team Member",
  "is_active": true,
  "date_joined": "2026-08-24T10:00:00Z",
  "last_login": "2026-08-24T11:30:00Z"
}

### Error Responses
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Token blacklisted
500 Internal Server Error
- Unexpected server error

### Validation Rules
- Access token must be valid and not expired.

### Business Rules
- Users can only access their own profile.
- Returns user details excluding sensitive information like password.

## Project Management API

### Create Project

#### Purpose
Create a new project in the system.

#### Endpoint
POST /api/projects/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Request Body
{
  "name": "Project Name",
  "description": "Project description",
  "start_date": "2026-09-01",
  "end_date": "2026-12-31",
  "status": "planning"
}

#### Success Response
201 Created
{
  "id": 1,
  "name": "Project Name",
  "description": "Project description",
  "start_date": "2026-09-01",
  "end_date": "2026-12-31",
  "status": "planning",
  "created_by": 1,
  "created_at": "2026-08-24T10:00:00Z",
  "updated_at": "2026-08-24T10:00:00Z"
}

#### Error Responses
400 Bad Request
- Validation errors
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
409 Conflict
- Project name already exists

#### Validation Rules
- Name is required and must be unique
- Description is optional but must not exceed 500 characters if provided
- Start date must be before end date
- End date must be a future date
- Status must be one of: planning, active, on_hold, completed, archived

#### Business Rules
- Project must have at least one assigned team member or owner
- Created_by field is automatically set to the authenticated user
- Projects can only be transitioned through valid status workflows
- Project name must not conflict with existing project names

---

### List Projects

#### Purpose
List all projects accessible to the authenticated user.

#### Endpoint
GET /api/projects/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager
- Team Member

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Query Parameters
- page: integer (default: 1)
- page_size: integer (default: 20, max: 100)
- status: filter by status (planning, active, on_hold, completed, archived)
- search: search by name or description

#### Success Response
200 OK
{
  "count": 5,
  "next": "http://example.com/api/projects?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Project Name",
      "description": "Project description",
      "status": "active",
      "created_at": "2026-08-24T10:00:00Z",
      "updated_at": "2026-08-24T10:00:00Z"
    }
  ]
}

#### Error Responses
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions

#### Validation Rules
- Page and page_size must be positive integers
- Status filter must be one of: planning, active, on_hold, completed, archived

#### Business Rules
- Team members can only see projects they are assigned to
- Project managers can see all projects in their portfolio
- Admins can see all projects
- Pagination is enforced with maximum page_size limit

---

### Project Details

#### Purpose
Retrieve details of a specific project.

#### Endpoint
GET /api/projects/{project_id}/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager
- Team Member (assigned to project)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- project_id: integer (required) - The ID of the project to retrieve

#### Success Response
200 OK
{
  "id": 1,
  "name": "Project Name",
  "description": "Project description",
  "start_date": "2026-09-01",
  "end_date": "2026-12-31",
  "status": "active",
  "created_by": 1,
  "created_at": "2026-08-24T10:00:00Z",
  "updated_at": "2026-08-24T10:00:00Z",
  "assigned_members": [
    {
      "id": 1,
      "name": "John Doe",
      "role": "Team Member"
    }
  ],
  "total_tasks": 10,
  "completed_tasks": 5
}

#### Error Responses
400 Bad Request
- Invalid project ID format
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions to view this project
404 Not Found
- Project not found

#### Validation Rules
- project_id must be a positive integer

#### Business Rules
- Team members can only view projects they are assigned to
- Project managers can view any project in their portfolio
- Admins can view all projects
- Project detail view includes task statistics summary

---

### Update Project

#### Purpose
Update project details.

#### Endpoint
PUT /api/projects/{project_id}/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- project_id: integer (required) - The ID of the project to update

#### Request Body
{
  "name": "Updated Project Name",
  "description": "Updated project description",
  "start_date": "2026-09-01",
  "end_date": "2026-12-31",
  "status": "active"
}

#### Success Response
200 OK
{
  "id": 1,
  "name": "Updated Project Name",
  "description": "Updated project description",
  "start_date": "2026-09-01",
  "end_date": "2026-12-31",
  "status": "active",
  "updated_at": "2026-08-24T11:00:00Z"
}

#### Error Responses
400 Bad Request
- Validation errors
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Project not found

#### Validation Rules
- Name is optional but must be unique if provided
- Description is optional but must not exceed 500 characters if provided
- Start date must be before end date if both provided
- End date must be a future date if provided
- Status must be one of: planning, active, on_hold, completed, archived if provided

#### Business Rules
- Only the project owner or admin can update project details
- Status transitions must follow valid workflow (e.g., active -> on_hold -> completed)
- Project name changes must not conflict with existing project names
- Last updated timestamp is automatically updated

---

### Delete Project

#### Purpose
Delete a project from the system.

#### Endpoint
DELETE /api/projects/{project_id}/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin only

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- project_id: integer (required) - The ID of the project to delete

#### Success Response
204 No Content

#### Error Responses
400 Bad Request
- Project has associated tasks or resources
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions (non-admin users)
404 Not Found
- Project not found

#### Validation Rules
- project_id must be a positive integer

#### Business Rules
- Only admin users can delete projects
- Projects with associated tasks cannot be deleted; must be archived first
- Project deletion is permanent and irreversible
- Audit log entry is created upon deletion

---

### Archive Project

#### Purpose
Archive a project (soft delete / mark as archived).

#### Endpoint
PATCH /api/projects/{project_id}/archive/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- project_id: integer (required) - The ID of the project to archive

#### Request Body
{
  "archive_reason": "Project completed or no longer needed"
}

#### Success Response
200 OK
{
  "id": 1,
  "name": "Project Name",
  "status": "archived",
  "archived_at": "2026-08-24T11:00:00Z",
  "archive_reason": "Project completed"
}

#### Error Responses
400 Bad Request
- Project is already archived
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Project not found

#### Validation Rules
- archive_reason is required and must not exceed 500 characters
- project_id must be a positive integer

#### Business Rules
- Only admin or project owner can archive a project
- Project must be in 'active' or 'on_hold' status to be archived
- Archiving a project is reversible by restoring it to active status
- Archived projects are not included in regular project listings unless specifically filtered
## Task Management

### Create Task

#### Purpose
Create a new task within a project.

#### Endpoint
POST /api/tasks/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)
- Team Member

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Request Body
{
  "title": "Task Title",
  "description": "Task description",
  "project_id": 1,
  "assigned_to": 1,
  "status": "pending",
  "progress": 0
}

#### Success Response
201 Created
{
  "id": 1,
  "title": "Task Title",
  "description": "Task description",
  "project": 1,
  "assigned_to": 1,
  "status": "pending",
  "progress": 0,
  "created_at": "2026-08-24T12:00:00Z",
  "updated_at": "2026-08-24T12:00:00Z"
}

#### Error Responses
400 Bad Request
- Validation errors
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Project not found

#### Validation Rules
- Title is required and must not exceed 200 characters
- Description is optional but must not exceed 1000 characters if provided
- Project ID must reference an existing project
- Assigned user must reference an existing user
- Status must be one of: pending, in_progress, completed, on_hold, cancelled if provided
- Progress must be an integer between 0 and 100 if provided

#### Business Rules
- Task must belong to a valid project
- If status is provided, progress should be consistent with the status
- Only project members can be assigned to tasks
- Created at and updated at timestamps are automatically generated
EOF

## Task Management

### List Tasks

#### Purpose
List all tasks, with optional filtering and pagination.

#### Endpoint
GET /api/tasks/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager
- Team Member

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Query Parameters
- page: integer (default: 1) - Page number for pagination
- page_size: integer (default: 20, max: 100) - Number of items per page
- project_id: integer (optional) - Filter tasks by project ID
- status: string (optional) - Filter tasks by status (pending, in_progress, completed, on_hold, cancelled)
- assigned_to: integer (optional) - Filter tasks assigned to a specific user
- search: string (optional) - Search in task title and description

#### Success Response
200 OK
{
  "count": 150,
  "next": "http://api.example.com/api/tasks?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Task Title",
      "description": "Task description",
      "project": 1,
      "assigned_to": 1,
      "status": "pending",
      "progress": 0,
      "created_at": "2026-08-24T12:00:00Z",
      "updated_at": "2026-08-24T12:00:00Z"
    }
  ]
}

#### Error Responses
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions

#### Business Rules
- Returns paginated results
- Filters apply AND logic (all provided filters must match)
- Search performs partial match on title and description
EOF

## Task Details

#### Purpose
Retrieve details of a specific task.

#### Endpoint
GET /api/tasks/{task_id}/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager
- Team Member (assigned to task or project owner)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- task_id: integer (required) - The ID of the task to retrieve

#### Success Response
200 OK
{
  "id": 1,
  "title": "Task Title",
  "description": "Task description",
  "project": 1,
  "assigned_to": 1,
  "status": "pending",
  "progress": 0,
  "created_at": "2026-08-24T12:00:00Z",
  "updated_at": "2026-08-24T12:00:00Z"
}

#### Error Responses
400 Bad Request
- Validation errors
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Task not found

#### Validation Rules
- task_id must be a positive integer

#### Business Rules
- Users can view tasks they are assigned to
- Project managers and admins can view all tasks within their projects
- Task details include creation and update timestamps
EOF

## Update Task

#### Purpose
Update task details including title, description, status, and progress.

#### Endpoint
PATCH /api/tasks/{task_id}/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)
- Team Member (assigned to the task)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- task_id: integer (required) - The ID of the task to update

#### Request Body
{
  "title": "Updated Task Title",
  "description": "Updated task description",
  "status": "in_progress",
  "progress": 50
}

#### Success Response
200 OK
{
  "id": 1,
  "title": "Updated Task Title",
  "description": "Updated task description",
  "project": 1,
  "assigned_to": 1,
  "status": "in_progress",
  "progress": 50,
  "created_at": "2026-08-24T12:00:00Z",
  "updated_at": "2026-08-24T13:00:00Z"
}

#### Error Responses
400 Bad Request
- Validation errors
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Task not found

#### Validation Rules
- Title, if provided, must not exceed 200 characters
- Description, if provided, must not exceed 1000 characters
- Status, if provided, must be one of: pending, in_progress, completed, on_hold, cancelled
- Progress, if provided, must be an integer between 0 and 100
- If status is updated, progress should be consistent with the status
- Only fields provided will be updated (partial update supported)

#### Business Rules
- Progress must be consistent with status (e.g., completed status should have progress=100)
- Only project members or assignee can update the task
- Description changes must not conflict with existing task descriptions within the same project
- Last updated timestamp is automatically updated
EOF

## Delete Task

#### Purpose
Delete a task from the system.

#### Endpoint
DELETE /api/tasks/{task_id}/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin only

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- task_id: integer (required) - The ID of the task to delete

#### Success Response
204 No Content

#### Error Responses
400 Bad Request
- Task has associated time entries or comments
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions (non-admin users)
404 Not Found
- Task not found

#### Validation Rules
- task_id must be a positive integer

#### Business Rules
- Only admin users can delete tasks
- Tasks with associated time entries or comments cannot be deleted; must be archived first
- Task deletion is permanent and irreversible
- Audit log entry is created upon deletion
EOF

## Assign Task

#### Purpose
Assign a task to a user.

#### Endpoint
PATCH /api/tasks/{task_id}/assign/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- task_id: integer (required) - The ID of the task to assign

#### Request Body
{
  "assigned_to": 2
}

#### Success Response
200 OK
{
  "id": 1,
  "title": "Task Title",
  "assigned_to": 2,
  "status": "pending",
  "progress": 0
}

#### Error Responses
400 Bad Request
- Validation errors
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Task not found
- User not found

#### Validation Rules
- assigned_to must reference an existing user
- assigned_to user must be a member of the project the task belongs to
- A task cannot be assigned to itself or to users outside the project

#### Business Rules
- Only project admins or managers can reassign tasks
- Assigned user receives notification of the assignment
- Task owner/assignee can be changed at any time
- Reassignment creates an audit log entry
EOF

## Change Task Status

#### Purpose
Change the status of a task.

#### Endpoint
PATCH /api/tasks/{task_id}/status/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)
- Team Member (assigned to the task)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- task_id: integer (required) - The ID of the task to update status for

#### Request Body
{
  "status": "completed"
}

#### Success Response
200 OK
{
  "id": 1,
  "title": "Task Title",
  "status": "completed",
  "progress": 100,
  "updated_at": "2026-08-24T13:00:00Z"
}

#### Error Responses
400 Bad Request
- Validation errors
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Task not found

#### Validation Rules
- Status must be one of: pending, in_progress, completed, on_hold, cancelled
- If status is "completed", progress should be set to 100 automatically
- If status is "on_hold", progress can be any value
- If status is "cancelled", progress should be set to 0 automatically

#### Business Rules
- Status transitions must follow valid workflow (e.g., pending -> in_progress -> completed)
- Completed tasks should have progress set to 100
- Cancelled tasks should have progress set to 0
- Only project members can change task status
- Status changes create an audit log entry
- Workflow restrictions may apply based on project configuration
EOF

## Update Task Progress

#### Purpose
Update the progress percentage of a task.

#### Endpoint
PATCH /api/tasks/{task_id}/progress/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)
- Team Member (assigned to the task)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- task_id: integer (required) - The ID of the task to update progress for

#### Request Body
{
  "progress": 75
}

#### Success Response
200 OK
{
  "id": 1,
  "title": "Task Title",
  "progress": 75,
  "status": "in_progress",
  "updated_at": "2026-08-24T13:00:00Z"
}

#### Error Responses
400 Bad Request
- Validation errors
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Task not found

#### Validation Rules
- Progress must be an integer between 0 and 100
- If progress is 100, status should be automatically set to "completed" if not already
- If progress is 0 and status is not "completed" or "cancelled", status may be set to "pending"

#### Business Rules
- Progress updates should be consistent with the current status
- Progress of 100% should ideally have status "completed"
- Only project members or the task assignee can update progress
- Progress updates create an audit log entry
- Automatic status updates may occur based on progress percentage

## Budget Management

### Create Budget

#### Purpose
Create a new budget associated with a project.

#### Endpoint
POST /api/budgets/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Request Body
{
  "project_id": 1,
  "name": "Q4 Development Budget",
  "total_amount": 50000.00,
  "currency": "USD",
  "start_date": "2026-09-01",
  "end_date": "2026-12-31",
  "category": "development"
}

#### Success Response
201 Created
{
  "id": 1,
  "project": 1,
  "name": "Q4 Development Budget",
  "total_amount": 50000.00,
  "allocated_amount": 0.00,
  "spent_amount": 0.00,
  "remaining_amount": 50000.00,
  "currency": "USD",
  "start_date": "2026-09-01",
  "end_date": "2026-12-31",
  "category": "development",
  "status": "active",
  "created_by": 1,
  "created_at": "2026-08-24T14:00:00Z",
  "updated_at": "2026-08-24T14:00:00Z"
}

#### Error Responses
400 Bad Request
- Validation errors
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Project not found
409 Conflict
- Budget with the same name already exists for this project

#### Validation Rules
- project_id is required and must reference an existing project
- name is required and must not exceed 200 characters
- total_amount is required and must be a positive decimal value
- currency must be a valid ISO 4217 currency code
- start_date must be before end_date
- category must be one of: development, marketing, operations, personnel, miscellaneous

#### Business Rules
- A project may have multiple budgets across different categories or periods
- created_by field is automatically set to the authenticated user
- allocated_amount and spent_amount default to 0.00 on creation
- Budget total_amount cannot be modified once expenses have been recorded against it without an explicit revision action

---

### List Budgets

#### Purpose
List all budgets accessible to the authenticated user, with optional filtering and pagination.

#### Endpoint
GET /api/budgets/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager
- Team Member

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Query Parameters
- page: integer (default: 1)
- page_size: integer (default: 20, max: 100)
- project_id: integer (optional) - Filter budgets by project ID
- status: string (optional) - Filter by status (active, exhausted, closed, archived)
- category: string (optional) - Filter by category

#### Success Response
200 OK
{
  "count": 8,
  "next": "http://example.com/api/budgets?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "project": 1,
      "name": "Q4 Development Budget",
      "total_amount": 50000.00,
      "spent_amount": 12500.00,
      "remaining_amount": 37500.00,
      "currency": "USD",
      "status": "active"
    }
  ]
}

#### Error Responses
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions

#### Business Rules
- Team members can only view budgets for projects they are assigned to
- Project managers can view budgets for projects in their portfolio
- Admins can view all budgets
- Filters apply AND logic

---

### Budget Details

#### Purpose
Retrieve details of a specific budget, including expense breakdown.

#### Endpoint
GET /api/budgets/{budget_id}/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager
- Team Member (assigned to project)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- budget_id: integer (required) - The ID of the budget to retrieve

#### Success Response
200 OK
{
  "id": 1,
  "project": 1,
  "name": "Q4 Development Budget",
  "total_amount": 50000.00,
  "allocated_amount": 40000.00,
  "spent_amount": 12500.00,
  "remaining_amount": 37500.00,
  "currency": "USD",
  "start_date": "2026-09-01",
  "end_date": "2026-12-31",
  "category": "development",
  "status": "active",
  "expenses": [
    {
      "id": 1,
      "description": "Cloud infrastructure",
      "amount": 12500.00,
      "recorded_at": "2026-09-15T10:00:00Z"
    }
  ],
  "created_by": 1,
  "created_at": "2026-08-24T14:00:00Z",
  "updated_at": "2026-09-15T10:00:00Z"
}

#### Error Responses
400 Bad Request
- Invalid budget ID format
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions to view this budget
404 Not Found
- Budget not found

#### Validation Rules
- budget_id must be a positive integer

#### Business Rules
- Team members can only view budgets for projects they are assigned to
- Budget detail view includes a summary of recorded expenses

---

### Update Budget

#### Purpose
Update budget details.

#### Endpoint
PUT /api/budgets/{budget_id}/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- budget_id: integer (required) - The ID of the budget to update

#### Request Body
{
  "name": "Q4 Development Budget - Revised",
  "total_amount": 60000.00,
  "start_date": "2026-09-01",
  "end_date": "2026-12-31",
  "category": "development"
}

#### Success Response
200 OK
{
  "id": 1,
  "name": "Q4 Development Budget - Revised",
  "total_amount": 60000.00,
  "remaining_amount": 47500.00,
  "updated_at": "2026-09-20T09:00:00Z"
}

#### Error Responses
400 Bad Request
- Validation errors
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Budget not found

#### Validation Rules
- name is optional but must not exceed 200 characters
- total_amount is optional but, if provided, must not be less than the current spent_amount
- start_date must be before end_date if both provided
- category must be one of the allowed values if provided

#### Business Rules
- Reducing total_amount below spent_amount is rejected
- Only the project owner or admin can update budget details
- Last updated timestamp is automatically updated
- Budget revisions above a configurable threshold may require approval (not in scope)

---

### Delete Budget

#### Purpose
Delete a budget from the system.

#### Endpoint
DELETE /api/budgets/{budget_id}/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin only

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- budget_id: integer (required) - The ID of the budget to delete

#### Success Response
204 No Content

#### Error Responses
400 Bad Request
- Budget has recorded expenses
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions (non-admin users)
404 Not Found
- Budget not found

#### Validation Rules
- budget_id must be a positive integer

#### Business Rules
- Only admin users can delete budgets
- Budgets with recorded expenses cannot be deleted; must be closed or archived instead
- Budget deletion is permanent and irreversible
- Audit log entry is created upon deletion

---

### Record Budget Expense

#### Purpose
Record an expense against a budget.

#### Endpoint
POST /api/budgets/{budget_id}/expenses/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- budget_id: integer (required) - The ID of the budget to record an expense against

#### Request Body
{
  "description": "Cloud infrastructure",
  "amount": 12500.00,
  "task_id": 4
}

#### Success Response
201 Created
{
  "id": 1,
  "budget": 1,
  "description": "Cloud infrastructure",
  "amount": 12500.00,
  "task": 4,
  "recorded_by": 1,
  "recorded_at": "2026-09-15T10:00:00Z"
}

#### Error Responses
400 Bad Request
- Validation errors
- Expense amount exceeds remaining budget
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Budget not found
- Task not found

#### Validation Rules
- description is required and must not exceed 300 characters
- amount is required and must be a positive decimal value
- task_id is optional but, if provided, must reference an existing task within the same project
- amount must not exceed the budget's remaining_amount unless budget allows overrun (not in scope)

#### Business Rules
- Recording an expense increases spent_amount and decreases remaining_amount
- If spent_amount reaches total_amount, budget status is automatically set to "exhausted"
- Expenses cannot be recorded against a closed or archived budget
- recorded_by field is automatically set to the authenticated user

---

### Close Budget

#### Purpose
Close a budget, preventing further expenses from being recorded against it.

#### Endpoint
PATCH /api/budgets/{budget_id}/close/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- budget_id: integer (required) - The ID of the budget to close

#### Request Body
{
  "close_reason": "Budget period ended"
}

#### Success Response
200 OK
{
  "id": 1,
  "name": "Q4 Development Budget",
  "status": "closed",
  "closed_at": "2026-12-31T23:59:00Z",
  "close_reason": "Budget period ended"
}

#### Error Responses
400 Bad Request
- Budget is already closed
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Budget not found

#### Validation Rules
- close_reason is required and must not exceed 500 characters
- budget_id must be a positive integer

#### Business Rules
- Only admin or project owner can close a budget
- Closed budgets reject any new expense records
- Closing is reversible only by an admin re-opening the budget (not in scope)

---

## Invoice Management

### Create Invoice

#### Purpose
Create a new invoice associated with a project.

#### Endpoint
POST /api/invoices/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Request Body
{
  "project_id": 1,
  "client_name": "Acme Corp",
  "client_email": "billing@acmecorp.com",
  "issue_date": "2026-09-01",
  "due_date": "2026-09-30",
  "currency": "USD",
  "line_items": [
    {
      "description": "Development services - August",
      "quantity": 1,
      "unit_price": 15000.00
    }
  ],
  "tax_rate": 0.0
}

#### Success Response
201 Created
{
  "id": 1,
  "invoice_number": "INV-2026-0001",
  "project": 1,
  "client_name": "Acme Corp",
  "client_email": "billing@acmecorp.com",
  "issue_date": "2026-09-01",
  "due_date": "2026-09-30",
  "currency": "USD",
  "line_items": [
    {
      "description": "Development services - August",
      "quantity": 1,
      "unit_price": 15000.00,
      "line_total": 15000.00
    }
  ],
  "subtotal": 15000.00,
  "tax_rate": 0.0,
  "tax_amount": 0.0,
  "total_amount": 15000.00,
  "status": "draft",
  "created_by": 1,
  "created_at": "2026-09-01T09:00:00Z",
  "updated_at": "2026-09-01T09:00:00Z"
}

#### Error Responses
400 Bad Request
- Validation errors
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Project not found

#### Validation Rules
- project_id is required and must reference an existing project
- client_name is required and must not exceed 200 characters
- client_email is required and must be a valid email format
- issue_date is required and must not be after due_date
- line_items is required and must contain at least one item
- Each line item requires description, quantity (positive integer), and unit_price (positive decimal)
- tax_rate, if provided, must be between 0 and 1

#### Business Rules
- invoice_number is auto-generated sequentially and is unique per system
- subtotal is calculated as the sum of all line_items' line_total
- tax_amount is calculated as subtotal * tax_rate
- total_amount is calculated as subtotal + tax_amount
- New invoices are created in "draft" status and are not visible to the client until sent
- created_by field is automatically set to the authenticated user

---

### List Invoices

#### Purpose
List all invoices accessible to the authenticated user, with optional filtering and pagination.

#### Endpoint
GET /api/invoices/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Query Parameters
- page: integer (default: 1)
- page_size: integer (default: 20, max: 100)
- project_id: integer (optional) - Filter invoices by project ID
- status: string (optional) - Filter by status (draft, sent, paid, overdue, cancelled)
- search: string (optional) - Search by client_name or invoice_number

#### Success Response
200 OK
{
  "count": 12,
  "next": "http://example.com/api/invoices?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "invoice_number": "INV-2026-0001",
      "project": 1,
      "client_name": "Acme Corp",
      "total_amount": 15000.00,
      "status": "sent",
      "due_date": "2026-09-30"
    }
  ]
}

#### Error Responses
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions

#### Business Rules
- Team members do not have list access to invoices
- Project managers can view invoices for projects in their portfolio
- Admins can view all invoices
- Invoices past due_date and not marked "paid" are surfaced with status "overdue" at read time

---

### Invoice Details

#### Purpose
Retrieve details of a specific invoice.

#### Endpoint
GET /api/invoices/{invoice_id}/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- invoice_id: integer (required) - The ID of the invoice to retrieve

#### Success Response
200 OK
{
  "id": 1,
  "invoice_number": "INV-2026-0001",
  "project": 1,
  "client_name": "Acme Corp",
  "client_email": "billing@acmecorp.com",
  "issue_date": "2026-09-01",
  "due_date": "2026-09-30",
  "line_items": [
    {
      "description": "Development services - August",
      "quantity": 1,
      "unit_price": 15000.00,
      "line_total": 15000.00
    }
  ],
  "subtotal": 15000.00,
  "tax_amount": 0.0,
  "total_amount": 15000.00,
  "status": "sent",
  "sent_at": "2026-09-01T10:00:00Z",
  "paid_at": null,
  "created_at": "2026-09-01T09:00:00Z",
  "updated_at": "2026-09-01T10:00:00Z"
}

#### Error Responses
400 Bad Request
- Invalid invoice ID format
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions to view this invoice
404 Not Found
- Invoice not found

#### Validation Rules
- invoice_id must be a positive integer

#### Business Rules
- Only the project owner, admin, or a user with billing access can view invoice details

---

### Update Invoice

#### Purpose
Update an invoice's details. Only permitted while the invoice is in "draft" status.

#### Endpoint
PUT /api/invoices/{invoice_id}/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- invoice_id: integer (required) - The ID of the invoice to update

#### Request Body
{
  "client_name": "Acme Corp",
  "client_email": "billing@acmecorp.com",
  "due_date": "2026-10-05",
  "line_items": [
    {
      "description": "Development services - August",
      "quantity": 1,
      "unit_price": 16000.00
    }
  ],
  "tax_rate": 0.05
}

#### Success Response
200 OK
{
  "id": 1,
  "client_name": "Acme Corp",
  "due_date": "2026-10-05",
  "subtotal": 16000.00,
  "tax_amount": 800.00,
  "total_amount": 16800.00,
  "updated_at": "2026-09-02T08:00:00Z"
}

#### Error Responses
400 Bad Request
- Validation errors
- Invoice is not in "draft" status
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Invoice not found

#### Validation Rules
- Same field-level rules as Create Invoice, applied to any field provided
- Invoice must currently be in "draft" status to be updated

#### Business Rules
- Invoices in "sent", "paid", or "cancelled" status cannot be updated; a credit note or new invoice must be issued instead
- subtotal, tax_amount, and total_amount are recalculated automatically when line_items or tax_rate change
- Last updated timestamp is automatically updated

---

### Delete Invoice

#### Purpose
Delete an invoice from the system. Only permitted while the invoice is in "draft" status.

#### Endpoint
DELETE /api/invoices/{invoice_id}/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin only

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- invoice_id: integer (required) - The ID of the invoice to delete

#### Success Response
204 No Content

#### Error Responses
400 Bad Request
- Invoice is not in "draft" status
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions (non-admin users)
404 Not Found
- Invoice not found

#### Validation Rules
- invoice_id must be a positive integer

#### Business Rules
- Only admin users can delete invoices
- Invoices that have been sent, paid, or cancelled cannot be deleted, to preserve the billing audit trail
- Invoice deletion is permanent and irreversible
- Audit log entry is created upon deletion

---

### Send Invoice

#### Purpose
Send an invoice to the client and transition it out of draft status.

#### Endpoint
PATCH /api/invoices/{invoice_id}/send/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- invoice_id: integer (required) - The ID of the invoice to send

#### Request Body
{
  "recipient_email": "billing@acmecorp.com",
  "message": "Please find attached your invoice for August development services."
}

#### Success Response
200 OK
{
  "id": 1,
  "invoice_number": "INV-2026-0001",
  "status": "sent",
  "sent_at": "2026-09-01T10:00:00Z",
  "recipient_email": "billing@acmecorp.com"
}

#### Error Responses
400 Bad Request
- Invoice is not in "draft" status
- Invoice has no line items
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Invoice not found

#### Validation Rules
- recipient_email is required and must be a valid email format
- Invoice must have at least one line item
- Invoice must currently be in "draft" status

#### Business Rules
- Sending an invoice transitions its status from "draft" to "sent" and locks line items from further edits
- sent_at timestamp is recorded
- An email with the invoice (or a link to it) is dispatched to recipient_email
- Once sent, an invoice can only move to "paid" or "cancelled"

---

### Mark Invoice as Paid

#### Purpose
Mark an invoice as paid, optionally recording payment details.

#### Endpoint
PATCH /api/invoices/{invoice_id}/pay/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager (assigned as project owner)

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Path Parameters
- invoice_id: integer (required) - The ID of the invoice to mark as paid

#### Request Body
{
  "payment_date": "2026-09-25",
  "payment_method": "bank_transfer",
  "payment_reference": "TXN-88213"
}

#### Success Response
200 OK
{
  "id": 1,
  "invoice_number": "INV-2026-0001",
  "status": "paid",
  "paid_at": "2026-09-25T00:00:00Z",
  "payment_method": "bank_transfer",
  "payment_reference": "TXN-88213"
}

#### Error Responses
400 Bad Request
- Invoice is not in "sent" or "overdue" status
- Validation errors
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Invoice not found

#### Validation Rules
- payment_date is required and must not be a future date
- payment_method must be one of: bank_transfer, credit_card, cash, check, other
- payment_reference is optional but must not exceed 100 characters
- Invoice must currently be in "sent" or "overdue" status

#### Business Rules
- Marking as paid transitions status to "paid" and is a terminal state
- paid_at timestamp is set from payment_date
- Once paid, an invoice cannot be edited, deleted, or reverted through this API
- Corresponding budget expense entries are not automatically created; this remains a manual or separate integration step (not in scope)

---

## Dashboard APIs

### Get Dashboard Overview

#### Purpose
Retrieve a high-level summary across projects, tasks, budgets, and invoices for the authenticated user.

#### Endpoint
GET /api/dashboard/overview/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager
- Team Member

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Query Parameters
- date_range: string (optional) - One of: last_7_days, last_30_days, last_90_days, ytd (default: last_30_days)

#### Success Response
200 OK
{
  "projects": {
    "total": 12,
    "active": 8,
    "on_hold": 1,
    "completed": 3
  },
  "tasks": {
    "total": 145,
    "pending": 40,
    "in_progress": 60,
    "completed": 45
  },
  "budgets": {
    "total_allocated": 250000.00,
    "total_spent": 98500.00,
    "currency": "USD"
  },
  "invoices": {
    "outstanding_amount": 32000.00,
    "overdue_count": 2,
    "currency": "USD"
  },
  "date_range": "last_30_days",
  "generated_at": "2026-08-24T15:00:00Z"
}

#### Error Responses
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions

#### Validation Rules
- date_range, if provided, must be one of the allowed values

#### Business Rules
- Data is scoped to the authenticated user's role: team members see only their assigned projects/tasks; project managers see their portfolio; admins see system-wide data
- Financial fields (budgets, invoices) are omitted from the response for users with the Team Member role
- Response values are computed at request time and are not cached beyond a short TTL (implementation detail, not in scope)

---

### Get Project Statistics

#### Purpose
Retrieve aggregated statistics across projects, such as status distribution and completion trends.

#### Endpoint
GET /api/dashboard/projects/stats/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Query Parameters
- date_range: string (optional) - One of: last_7_days, last_30_days, last_90_days, ytd (default: last_30_days)

#### Success Response
200 OK
{
  "status_breakdown": {
    "planning": 2,
    "active": 8,
    "on_hold": 1,
    "completed": 3,
    "archived": 4
  },
  "average_completion_days": 42,
  "projects_completed_this_period": 3,
  "projects_started_this_period": 2,
  "date_range": "last_30_days"
}

#### Error Responses
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions

#### Validation Rules
- date_range, if provided, must be one of the allowed values

#### Business Rules
- Team members do not have access to this endpoint; use project-level detail endpoints instead
- Statistics are scoped to the requesting project manager's portfolio unless the user is an admin

---

### Get Task Statistics

#### Purpose
Retrieve aggregated task statistics, such as status distribution and overdue counts.

#### Endpoint
GET /api/dashboard/tasks/stats/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager
- Team Member

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Query Parameters
- project_id: integer (optional) - Scope statistics to a single project
- date_range: string (optional) - One of: last_7_days, last_30_days, last_90_days, ytd (default: last_30_days)

#### Success Response
200 OK
{
  "status_breakdown": {
    "pending": 40,
    "in_progress": 60,
    "completed": 45,
    "on_hold": 0,
    "cancelled": 0
  },
  "overdue_count": 5,
  "average_progress": 62,
  "tasks_completed_this_period": 18,
  "date_range": "last_30_days"
}

#### Error Responses
400 Bad Request
- Invalid project_id format
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Project not found (if project_id provided)

#### Validation Rules
- project_id, if provided, must reference an existing project the user has access to
- date_range, if provided, must be one of the allowed values

#### Business Rules
- Team members see statistics limited to tasks assigned to them or within their assigned projects
- "overdue_count" reflects tasks without a due date field are excluded (task due dates are not currently modeled in Task Management; this field is reserved for future use) [Guessing: your Task Management section has no due_date field, so this metric currently has no data source — flagging rather than quietly inventing one]

---

### Get Budget Summary

#### Purpose
Retrieve aggregated budget and spending statistics.

#### Endpoint
GET /api/dashboard/budgets/summary/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Query Parameters
- project_id: integer (optional) - Scope summary to a single project
- currency: string (optional) - Filter/convert results to a specific currency

#### Success Response
200 OK
{
  "total_allocated": 250000.00,
  "total_spent": 98500.00,
  "total_remaining": 151500.00,
  "budgets_exhausted": 1,
  "budgets_active": 7,
  "currency": "USD",
  "by_category": {
    "development": 60000.00,
    "marketing": 20000.00,
    "operations": 18500.00
  }
}

#### Error Responses
400 Bad Request
- Invalid project_id format
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions
404 Not Found
- Project not found (if project_id provided)

#### Validation Rules
- project_id, if provided, must reference an existing project the user has access to
- currency, if provided, must be a valid ISO 4217 currency code

#### Business Rules
- Team members do not have access to this endpoint
- If budgets exist in multiple currencies and no currency filter is provided, totals are grouped by currency rather than summed
- by_category totals reflect spent_amount only

---

### Get Recent Activity

#### Purpose
Retrieve a feed of recent activity across projects, tasks, budgets, and invoices relevant to the authenticated user.

#### Endpoint
GET /api/dashboard/activity/

#### Authentication
Required: Yes (access token)

#### Allowed Roles
- Admin
- Project Manager
- Team Member

#### Request Headers
Content-Type: application/json
Authorization: Bearer <access_token>

#### Query Parameters
- page: integer (default: 1)
- page_size: integer (default: 20, max: 100)
- entity_type: string (optional) - Filter by one of: project, task, budget, invoice

#### Success Response
200 OK
{
  "count": 34,
  "next": "http://example.com/api/dashboard/activity?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "entity_type": "task",
      "entity_id": 12,
      "action": "status_changed",
      "description": "Task 'Implement login flow' status changed to completed",
      "actor": 1,
      "timestamp": "2026-08-24T13:00:00Z"
    }
  ]
}

#### Error Responses
401 Unauthorized
- Invalid or expired access token
403 Forbidden
- Insufficient permissions

#### Validation Rules
- entity_type, if provided, must be one of the allowed values

#### Business Rules
- Activity entries are sourced from the audit log entries referenced throughout the Project, Task, Budget, and Invoice sections
- Team members only see activity for entities they have access to
- Financial entity activity (budget, invoice) is omitted for users with the Team Member role
- Feed is ordered by timestamp, most recent first