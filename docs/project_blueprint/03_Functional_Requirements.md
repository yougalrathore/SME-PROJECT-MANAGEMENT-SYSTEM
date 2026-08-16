# Functional Requirements
# Functional Requirements

## Introduction

This document defines the functional requirements for Version 1 of the **SME Project Management System**. Each requirement specifies a single functional capability that the system shall provide. These requirements serve as the foundation for the Software Requirements Specification (SRS), database design, API design, user interface design, test planning, and software development.

---

# Authentication

## Functional Requirements

**FR-AUTH-001**  
The system shall allow new users to register using a unique email address.

**FR-AUTH-002**  
The system shall require users to provide a password during registration.

**FR-AUTH-003**  
The system shall prevent registration using an email address that already exists.

**FR-AUTH-004**  
The system shall allow registered users to log in using their email address and password.

**FR-AUTH-005**  
The system shall validate user credentials before granting access.

**FR-AUTH-006**  
The system shall deny access when invalid credentials are provided.

**FR-AUTH-007**  
The system shall securely store user passwords in hashed form.

**FR-AUTH-008**  
The system shall allow authenticated users to log out.

**FR-AUTH-009**  
The system shall invalidate the active session after user logout.

**FR-AUTH-010**  
The system shall allow users to request a password reset.

**FR-AUTH-011**  
The system shall allow users to set a new password after successful password reset verification.

**FR-AUTH-012**  
The system shall issue a JSON Web Token (JWT) after successful authentication.

**FR-AUTH-013**  
The system shall require a valid JWT to access protected resources.

**FR-AUTH-014**  
The system shall restrict access to protected resources when the JWT is invalid or expired.

**FR-AUTH-015**  
The system shall assign one role to each user.

**FR-AUTH-016**  
The system shall support the following user roles:
- Admin
- Project Manager
- Team Member

**FR-AUTH-017**  
The system shall enforce role-based access control for protected operations.

**FR-AUTH-018**  
The system shall allow only authorized users to perform administrative functions.

---

# Project Management

## Functional Requirements

**FR-PROJ-001**  
The system shall allow authorized users to create a project.

**FR-PROJ-002**  
The system shall require a project name during project creation.

**FR-PROJ-003**  
The system shall allow authorized users to view the list of projects.

**FR-PROJ-004**  
The system shall allow authorized users to view project details.

**FR-PROJ-005**  
The system shall allow authorized users to update project information.

**FR-PROJ-006**  
The system shall allow authorized users to delete a project.

**FR-PROJ-007**  
The system shall allow users to assign a status to a project.

**FR-PROJ-008**  
The system shall support the following project statuses:
- Not Started
- In Progress
- Completed
- On Hold

**FR-PROJ-009**  
The system shall allow users to assign a priority level to a project.

**FR-PROJ-010**  
The system shall support the following project priorities:
- Low
- Medium
- High

**FR-PROJ-011**  
The system shall allow users to define a project start date.

**FR-PROJ-012**  
The system shall allow users to define a project end date.

**FR-PROJ-013**  
The system shall allow users to modify the project timeline.

---

# Task Management

## Functional Requirements

**FR-TASK-001**  
The system shall allow authorized users to create a task.

**FR-TASK-002**  
The system shall require a task title during task creation.

**FR-TASK-003**  
The system shall allow authorized users to assign a task to a team member.

**FR-TASK-004**  
The system shall allow authorized users to update task information.

**FR-TASK-005**  
The system shall allow authorized users to delete a task.

**FR-TASK-006**  
The system shall allow users to define a due date for a task.

**FR-TASK-007**  
The system shall allow users to assign a priority level to a task.

**FR-TASK-008**  
The system shall support the following task priorities:
- Low
- Medium
- High

**FR-TASK-009**  
The system shall allow users to assign a status to a task.

**FR-TASK-010**  
The system shall support the following task statuses:
- To Do
- In Progress
- Completed

**FR-TASK-011**  
The system shall allow authorized users to update task progress.

**FR-TASK-012**  
The system shall display the current progress of each task.

---

# Team Allocation

## Functional Requirements

**FR-TEAM-001**  
The system shall allow authorized users to create a team.

**FR-TEAM-002**  
The system shall allow authorized users to assign members to a team.

**FR-TEAM-003**  
The system shall allow authorized users to remove members from a team.

**FR-TEAM-004**  
The system shall allow authorized users to view team members.

**FR-TEAM-005**  
The system shall allow a team member to belong to multiple projects where authorized.

**FR-TEAM-006**  
The system shall allow authorized users to allocate workload among team members.

**FR-TEAM-007**  
The system shall display workload allocation for each assigned team member.

---

# Budget Management

## Functional Requirements

**FR-BUD-001**  
The system shall allow authorized users to create a project budget.

**FR-BUD-002**  
The system shall allow authorized users to update a project budget.

**FR-BUD-003**  
The system shall allow authorized users to record project expenses.

**FR-BUD-004**  
The system shall allow authorized users to view the budget summary of a project.

**FR-BUD-005**  
The system shall calculate the total recorded expenses for a project.

**FR-BUD-006**  
The system shall calculate the remaining budget for a project.

**FR-BUD-007**  
The system shall update the remaining budget whenever a new expense is recorded.

---

# Invoice Management

## Functional Requirements

**FR-INV-001**  
The system shall allow authorized users to create an invoice.

**FR-INV-002**  
The system shall allow authorized users to update an invoice.

**FR-INV-003**  
The system shall allow authorized users to delete an invoice.

**FR-INV-004**  
The system shall allow authorized users to view invoice details.

**FR-INV-005**  
The system shall allow users to assign a payment status to an invoice.

**FR-INV-006**  
The system shall support the following payment statuses:
- Pending
- Paid
- Overdue

**FR-INV-007**  
The system shall maintain a history of invoice records.

**FR-INV-008**  
The system shall allow authorized users to view invoice history.

---

# Dashboard & Analytics

## Functional Requirements

**FR-DASH-001**  
The system shall display the total number of projects.

**FR-DASH-002**  
The system shall display the number of projects by status.

**FR-DASH-003**  
The system shall display the total number of tasks.

**FR-DASH-004**  
The system shall display the number of tasks by status.

**FR-DASH-005**  
The system shall display the total allocated budget across projects.

**FR-DASH-006**  
The system shall display the total recorded expenses across projects.

**FR-DASH-007**  
The system shall display the remaining budget across projects.

**FR-DASH-008**  
The system shall display the total number of invoices.

**FR-DASH-009**  
The system shall display invoice counts by payment status.

**FR-DASH-010**  
The system shall present project statistics using charts.

**FR-DASH-011**  
The system shall present task statistics using charts.

**FR-DASH-012**  
The system shall present budget statistics using charts.

**FR-DASH-013**  
The system shall present invoice statistics using charts.

**FR-DASH-014**  
The system shall display key performance indicators (KPIs) for projects.

**FR-DASH-015**  
The system shall display key performance indicators (KPIs) for tasks.

**FR-DASH-016**  
The system shall display key performance indicators (KPIs) for budgets.

**FR-DASH-017**  
The system shall display key performance indicators (KPIs) for invoices.