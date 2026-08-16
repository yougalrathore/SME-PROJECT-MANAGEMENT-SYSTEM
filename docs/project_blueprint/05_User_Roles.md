User roles
# User Roles

## Introduction

The SME Project Management System follows a Role-Based Access Control (RBAC) model to ensure that users can only access the features and information required for their responsibilities. Each role is assigned a defined set of permissions to maintain system security, operational efficiency, and accountability.

Version 1 of the system supports the following user roles:

- Admin
- Project Manager
- Team Member

Each role has clearly defined responsibilities, permissions, and restrictions as described below.

---

## Admin

The Admin is responsible for overall system administration and organizational management. This role has the highest level of access and oversees users, projects, teams, budgets, invoices, and system operations.

### Responsibilities

- Manage user accounts.
- Create, update, and remove users.
- Assign user roles.
- Create and manage projects.
- Manage project teams.
- Monitor project progress across the organization.
- Manage project budgets.
- Manage invoices.
- Access organizational dashboards and reports.
- Maintain overall system administration.

### Permissions

- Full access to all system modules.
- Create, edit, and delete users.
- Assign and modify user roles.
- Create, update, and archive projects.
- Manage all project teams.
- View and manage all tasks.
- Create, update, and monitor project budgets.
- Create, update, and manage invoices.
- Access all dashboards and reports.
- View organization-wide project information.

### Restrictions

- Cannot perform actions outside the capabilities provided by the system.
- Must operate within organizational policies and system security requirements.

---

## Project Manager

The Project Manager is responsible for planning, coordinating, and monitoring assigned projects. This role manages project execution while ensuring tasks, budgets, and project activities remain on schedule.

### Responsibilities

- Manage assigned projects.
- Create project tasks.
- Assign tasks to team members.
- Monitor task progress.
- Manage assigned project teams.
- Monitor project budgets.
- Monitor project invoices.
- Track project performance using dashboards.

### Permissions

- View assigned projects.
- Create, update, and manage tasks within assigned projects.
- Assign tasks to project team members.
- Update project information within assigned projects.
- View project budgets.
- View project invoices.
- Access dashboards related to assigned projects.
- View project progress and task completion status.

### Restrictions

- Cannot manage projects not assigned to them.
- Cannot create, modify, or remove user accounts.
- Cannot assign or modify system roles.
- Cannot perform system administration functions.
- Cannot access organization-wide administrative settings.

---

## Team Member

The Team Member is responsible for completing assigned work and keeping task progress up to date. This role has access only to information relevant to assigned responsibilities.

### Responsibilities

- View assigned projects.
- View assigned tasks.
- Update task status.
- Update task progress.
- Monitor personal workload through dashboards.

### Permissions

- View assigned project information.
- View assigned tasks.
- Update task status.
- Update task progress.
- Access dashboard information related to assigned work.

### Restrictions

- Cannot create or manage projects.
- Cannot assign tasks to other users.
- Cannot manage project teams.
- Cannot access budget information beyond assigned permissions.
- Cannot manage invoices.
- Cannot manage users or system settings.
- Cannot access administrative dashboards or organization-wide data.