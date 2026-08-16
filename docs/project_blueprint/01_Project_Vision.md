# Project Vision
**# Project Vision**

**\*\*Document Version:\*\*** 1.0  
**\*\*Last Updated:\*\*** 2026  
**\*\*Status:\*\*** Draft  
**\*\*Owner:\*\*** Project Team  

**---**

**## Table of Contents**

1\. [Problem Statement]\(#1-problem-statement)
2\. [Proposed Solution]\(#2-proposed-solution)
3\. [Objectives]\(#3-objectives)
4\. [Target Users]\(#4-target-users)
5\. [Business Value]\(#5-business-value)
6\. [Success Criteria]\(#6-success-criteria)

**---**

**## 1. Problem Statement**

Small and Medium Enterprises (SMEs) form the backbone of the global economy, yet they face persistent operational challenges that hinder growth, profitability, and competitive advantage. Despite the proliferation of digital tools, most SMEs operate with a fragmented technology stack that creates more problems than it solves.

**### 1.1 Disconnected Tools & Information Silos**

SMEs typically rely on a patchwork of disconnected applications:
\- **\*\*Project tracking\*\*** in Trello, Asana, or Jira
\- **\*\*Team communication\*\*** via Slack, Microsoft Teams, or email
\- **\*\*Document storage\*\*** across Google Drive, Dropbox, or SharePoint
\- **\*\*Financial management\*\*** in QuickBooks, Xero, or spreadsheets
\- **\*\*Time tracking\*\*** in Harvest, Toggl, or manual timesheets
\- **\*\*Resource planning\*\*** in Excel or dedicated tools like Float

**\*\*Impact:\*\*** Data fragmentation leads to information silos where critical project information is scattered across 5-7 different platforms. Teams waste 15-20% of their workweek searching for information, reconciling discrepancies, and manually transferring data between systems. Decision-makers lack a single source of truth, leading to decisions based on stale or incomplete data.

**### 1.2 Resource Mismanagement & Workload Imbalance**

Without centralized visibility into team capacity and project demands:
\- **\*\*Overallocation\*\*** burns out high-performing team members while others remain underutilized
\- **\*\*Skill mismatches\*\*** assign tasks to people lacking the right expertise, causing delays and quality issues
\- **\*\*No real-time capacity view\*\*** makes it impossible to confidently accept new projects or reallocate resources
\- **\*\*Ad-hoc resource planning\*\*** in spreadsheets becomes unmanageable beyond 10-15 people

**\*\*Impact:\*\*** SMEs lose an estimated 20-30% of productive capacity due to poor resource allocation. Employee burnout increases turnover costs (typically 1.5-2x annual salary per departure), while underutilization represents direct financial waste.

**### 1.3 Financial & Budget Leakage**

Financial oversight in SMEs is often reactive rather than proactive:
\- **\*\*Budget tracking\*\*** happens in disconnected spreadsheets updated weekly or monthly
\- **\*\*Invoice management\*\*** is manual, leading to delayed billing, missed invoices, and cash flow gaps
\- **\*\*Cost overruns\*\*** are discovered only at project close-out, not during execution
\- **\*\*No integrated view\*\*** of project profitability (revenue vs. labor costs vs. expenses)
\- **\*\*Client billing disputes\*\*** arise from inaccurate time tracking and poor documentation

**\*\*Impact:\*\*** Studies indicate SMEs lose 5-15% of project revenue to budget leakage—unbilled hours, scope creep without change orders, expense misallocation, and late invoice collection. For a typical SME, this represents significant preventable losses annually.

**### 1.4 The SME-Specific Gap**

Existing enterprise solutions (Microsoft Project, Monday.com Enterprise, Smartsheet) are:
\- **\*\*Over-engineered\*\*** for SME workflows, with steep learning curves
\- **\*\*Priced for enterprise budgets\*\***, not SME realities
\- **\*\*Rigid\*\*** in workflow customization, forcing SMEs to adapt processes to the tool
\- **\*\*Feature-heavy\*\*** but lacking the specific integrations SMEs need

Meanwhile, SME-focused tools (Trello, Asana, Notion) lack:
\- Native budget/invoice tracking
\- Role-based access control for financial data
\- Resource capacity planning
\- Real-time profitability analytics

**\*\*The Core Problem:\*\*** No unified, affordable, SME-native platform exists that bridges project execution, team management, and financial control in a single system.

**---**

**## 2. Proposed Solution**

We propose a **\*\*unified, full-stack SME Project Management System\*\*** built on **\*\*Django REST Framework (backend) + React with Vite and Tailwind CSS (frontend)\*\***, designed specifically for SME operational realities. The system consolidates four core modules into a single platform with shared data models, unified RBAC, and real-time analytics via standard HTTPS/REST API communication.

**### 2.1 System Architecture Overview**

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React + Vite)                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │   Tasks     │ │    Team     │ │  Budget &   │ │ Dashboard │ │
│  │   Module    │ │ Allocation  │ │ Invoicing   │ │  Module   │ │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └─────┬─────┘ │
│         │               │               │               │       │
│         └───────────────┼───────────────┼───────────────┘       │
│                         ▼                                           │
│              ┌─────────────────────┐                               │
│              │   API Client Layer  │                               │
│              │   (TanStack Query)  │                               │
│              └──────────┬──────────┘                               │
└─────────────────────────┼─────────────────────────────────────────┘
                          │ HTTPS / REST API
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (Django REST Framework)          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │   Tasks     │ │    Team     │ │  Budget &   │ │ Analytics │ │
│  │   API       │ │ Allocation  │ │ Invoicing   │ │  Engine   │ │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └─────┬─────┘ │
│         │               │               │               │       │
│         └───────────────┼───────────────┼───────────────┘       │
│                         ▼                                           │
│              ┌─────────────────────┐                               │
│              │   Core Services     │                               │
│              │  (Auth, RBAC,       │                               │
│              │   Notifications,    │                               │
│              │   Audit Logs)       │                               │
│              └──────────┬──────────┘                               │
│                         ▼                                           │
│              ┌─────────────────────┐                               │
│              │   PostgreSQL /      │                               │
│              │   MySQL Database    │                               │
│              └─────────────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

**### 2.2 Core Modules**

**#### Module 1: Task Management**
**\*\*Purpose:\*\*** End-to-end project and task lifecycle management with SME-appropriate workflows.

**\*\*Key Features:\*\***
\- **\*\*Hierarchical Work Breakdown:\*\*** Projects → Phases → Tasks → Subtasks (unlimited depth)
\- **\*\*Flexible Workflows:\*\*** Customizable Kanban boards per project (To Do → In Progress → Review → Done, or custom)
\- **\*\*Task Attributes:\*\*** Assignees, priorities, due dates, estimates (story points/hours), labels, dependencies
\- **\*\*Time Tracking:\*\*** Native timer + manual entry, linked to tasks for budget burn-rate calculation
\- **\*\*Comments & Mentions:\*\*** Threaded discussions with @mentions, file attachments, activity feed
\- **\*\*Recurring Tasks:\*\*** Template-based recurring work (weekly standups, monthly reporting)
\- **\*\*Bulk Operations:\*\*** Multi-select for status changes, reassignment, priority updates
\- **\*\*Import/Export:\*\*** CSV, Excel, and JSON for migration and reporting

**\*\*SME Differentiator:\*\*** Lightweight setup (< 10 min to first project), no forced methodology (Scrum/Kanban/Waterfall/hybrid), templates for common SME project types (marketing campaigns, client deliverables, internal initiatives).

**#### Module 2: Team Allocation & Capacity Planning**
**\*\*Purpose:\*\*** Real-time visibility into team capacity, skills, and workload to optimize resource deployment.

**\*\*Key Features:\*\***
\- **\*\*People Directory:\*\*** Profiles with skills, roles, cost rates, availability calendars, time-off
\- **\*\*Capacity Calendar:\*\*** Visual heatmap of allocation % per person per week/month
\- **\*\*Assignment Intelligence:\*\*** Drag-and-drop assignment with conflict detection (overallocation, skill gaps, time-off)
\- **\*\*Utilization Targets:\*\*** Configurable targets (e.g., 75% billable, 85% total) with alerts
\- **\*\*Scenario Planning:\*\*** "What-if" modeling for new projects before commitment
\- **\*\*Team Views:\*\*** Filter by department, skill, location, employment type (FTE/contractor)
\- **\*\*Workload Balancing:\*\*** Automated suggestions for rebalancing overallocated resources
\- **\*\*Integration:\*\*** Sync with Google/Outlook calendars for time-off and meetings

**\*\*SME Differentiator:\*\*** Built for 5-200 person teams, not enterprise resource pools. Simple skill taxonomy (not complex competency matrices). Contractor/freelancer support with rate cards.

**#### Module 3: Budget Tracking & Invoicing**
**\*\*Purpose:\*\*** Unified financial control from project estimation through client payment collection.

**\*\*Key Features:\*\***
\- **\*\*Project Budgeting:\*\*** Multi-line budgets (labor, materials, expenses, contingency) with version control
\- **\*\*Cost Rate Cards:\*\*** Role-based and person-specific rates (internal cost + client billable rates)
\- **\*\*Real-Time Burn Rate:\*\*** Live calculation of actual vs. planned spend as time is logged
\- **\*\*Expense Management:\*\*** Receipt capture, categories, approval workflows, mileage tracking
\- **\*\*Invoice Generation:\*\*** Automated from time entries + expenses, customizable templates, multi-currency support
\- **\*\*Billing Schedules:\*\*** Milestone-based, time & materials, retainer, fixed-fee with progress billing
\- **\*\*Payment Tracking:\*\*** Invoice status (draft/sent/viewed/paid/overdue), automated reminders
\- **\*\*Profitability Dashboard:\*\*** Per-project and aggregate margin analysis (revenue - internal cost - expenses)
\- **\*\*Tax Compliance:\*\*** Standard tax schemes (VAT/GST), configurable tax rates per jurisdiction
\- **\*\*Client Portal:\*\*** Branded client access to view invoices, project progress, approve timesheets

**\*\*SME Differentiator:\*\*** Integrated with task/time data (no duplicate entry), standard tax/compliance support, affordable for 5-50 person firms, client-facing portal included.

**#### Module 4: Real-Time Dashboard & Analytics**
**\*\*Purpose:\*\*** Actionable insights for owners, managers, and team leads without requiring BI expertise.

**\*\*Key Features:\*\***
\- **\*\*Executive Dashboard:\*\*** Revenue pipeline, utilization, profitability, cash flow, project health—single screen
\- **\*\*Project Health Cards:\*\*** RAG status (Red/Amber/Green) with drill-down: schedule variance, budget variance, scope changes, risk count
\- **\*\*Team Utilization:\*\*** Billable vs. non-billable, by person/team/role, trend lines, forecast vs. actual
\- **\*\*Financial Analytics:\*\*** AR aging, revenue recognition (accrual vs. cash), project margin waterfall, client profitability ranking
\- **\*\*Custom Reports:\*\*** Drag-and-drop report builder, scheduled email delivery, export to PDF/Excel
\- **\*\*Alerts & Notifications:\*\*** Threshold-based (budget > 80%, invoice 30 days overdue, utilization < 60%)
\- **\*\*Mobile-Responsive:\*\*** Full dashboard access on tablet/phone for on-the-go owners
\- **\*\*Role-Based Views:\*\*** Owners see financials; PMs see project health; Team leads see team utilization; Members see own tasks

**\*\*SME Differentiator:\*\*** Pre-built SME KPIs (no configuration required), plain-language insights ("Project Alpha is 15% over budget and trending worse"), not just charts.

**### 2.3 Cross-Cutting Capabilities**

\| Capability | Description |
\|------------|-------------|
\| **\*\*Multi-Tenant Architecture\*\*** | Single deployment serves multiple SME clients (SaaS-ready) with data isolation |
\| **\*\*Role-Based Access Control (RBAC)\*\*** | 3 core roles with granular permissions (Admin/SME Owner, Project Manager, Team Member) |
\| **\*\*Audit Logging\*\*** | Immutable audit trail for all financial and permission changes (compliance-ready) |
\| **\*\*Notifications Engine\*\*** | In-app, email, webhook—configurable per user per event type |
\| **\*\*API & Webhooks\*\*** | REST API + webhooks for custom integrations (CRM, accounting, HRIS) |
\| **\*\*Single Sign-On (SSO)\*\*** | SAML/OIDC for Google Workspace, Microsoft 365, Okta |
\| **\*\*Data Export/GDPR\*\*** | Full data portability, right-to-erasure, automated backup retention |

**### 2.4 Technology Stack**

\| Layer | Technology | Rationale |
\|-------|------------|-----------|
\| **\*\*Backend Framework\*\*** | Django 5.x (Python 3.12+) with Django REST Framework | Mature, secure, batteries-included, excellent ORM, strong ecosystem |
\| **\*\*API\*\*** | Django REST Framework + drf-spectacular (OpenAPI 3) | Industry standard, browsable API, auto-generated docs |
\| **\*\*Database\*\*** | PostgreSQL 16+ / MySQL 8+ | ACID compliance, JSON support, advanced indexing, proven at scale |
\| **\*\*Frontend Framework\*\*** | React 18+ with TypeScript, Vite build tool | Component-driven, strong typing, fast HMR, modern tooling |
\| **\*\*Styling\*\*** | Tailwind CSS | Utility-first, responsive, dark mode, small bundle size |
\| **\*\*State Management\*\*** | TanStack Query (React Query) + Zustand | Server state + client state separation, caching, optimistic updates |
\| **\*\*UI Components\*\*** | Radix UI + Tailwind CSS | Accessible primitives, composable, no runtime overhead |
\| **\*\*Charts/Visualization\*\*** | Recharts / Tremor | React-native, composable, performant |
\| **\*\*Forms\*\*** | React Hook Form + Zod | Performant, type-safe validation, schema-driven |
\| **\*\*Authentication\*\*** | Django Allauth + SimpleJWT | Social login, MFA, JWT access/refresh tokens, token rotation |
\| **\*\*File Storage\*\*** | Local storage (dev) / S3-compatible (prod) | Simple, scalable, signed URLs |
\| **\*\*Search\*\*** | PostgreSQL Full Text Search / MySQL Full Text Search | Zero-config start, native database features |
\| **\*\*Testing\*\*** | pytest (backend), Vitest + Playwright (frontend) | Comprehensive coverage, E2E confidence |
\| **\*\*CI/CD\*\*** | GitHub Actions → Docker → Cloud provider (Railway, Render, etc.) | Containerized, reproducible, simple deployment |

**---**

**## 3. Objectives**

The project objectives are structured as **\*\*SMART goals\*\*** (Specific, Measurable, Achievable, Relevant, Time-bound) aligned with FYP deliverables.

**### 3.1 Primary Objectives (Must Have for FYP Completion)**

\| ID | Objective | Success Metric | Target |
\|----|-----------|----------------|--------|
\| **\*\*OBJ-01\*\*** | **\*\*Implement Multi-Role RBAC\*\*** | 3 distinct roles (Admin, Project Manager, Team Member) with granular permissions; zero privilege escalation vulnerabilities | 100% coverage of defined permission matrix; pass OWASP Top 10 auth tests |
\| **\*\*OBJ-02\*\*** | **\*\*Deliver Workload Management\*\*** | Team capacity heatmap with drag-and-drop assignment; overallocation detection < 200ms for 100 users | Support 200 concurrent users; < 2s page load for capacity view |
\| **\*\*OBJ-03\*\*** | **\*\*Enable Budget & Invoice Tracking\*\*** | End-to-end flow: project budget → time logging → burn rate → invoice generation → payment tracking | 95%+ invoice accuracy vs. manual calculation; < 30s to generate invoice |
\| **\*\*OBJ-04\*\*** | **\*\*Provide Real-Time Analytics Dashboard\*\*** | Executive dashboard with 10+ KPIs updating via REST API polling (< 5s refresh) | Sub-5s data freshness; 99.9% uptime for dashboard API |
\| **\*\*OBJ-05\*\*** | **\*\*Achieve Unified Data Model\*\*** | Single source of truth: tasks, time, people, money linked without duplication | Zero duplicate data entry for core workflows; referential integrity 100% |

**### 3.2 Secondary Objectives (Should Have)**

\| ID | Objective | Success Metric | Target |
\|----|-----------|----------------|--------|
\| **\*\*OBJ-06\*\*** | **\*\*Client Portal\*\*** | Branded client access to invoices, project status, timesheet approval | 3 pilot clients actively using portal |
\| **\*\*OBJ-07\*\*** | **\*\*Mobile-Responsive UI\*\*** | All core workflows functional on 375px viewport | Lighthouse mobile score > 90 |
\| **\*\*OBJ-08\*\*** | **\*\*Automated Notifications\*\*** | In-app + email + webhook for 15+ event types with user preferences | 99% delivery rate; < 30s latency |
\| **\*\*OBJ-09\*\*** | **\*\*Data Import/Export\*\*** | CSV/Excel import for projects, people, budgets; PDF/Excel export for reports | 100% fidelity round-trip for supported formats |
\| **\*\*OBJ-10\*\*** | **\*\*Standard Tax Compliance\*\*** | Configurable tax rates, tax-inclusive/exclusive pricing, standard tax reports | Pass standard tax calculation test scenarios |

**---**

**## 4. Target Users**

The system is designed for **\*\*three primary user roles\*\*** within SMEs (5-200 employees), as defined in the approved FYP proposal.

**### 4.1 Primary Roles**

**#### Role 1: Admin (SME Owner)**
\- **\*\*Description:\*\*** Business owner with full P&L accountability and strategic oversight
\- **\*\*Company Context:\*\*** 20-100 employees, operational decision-maker
\- **\*\*Pain Points:\*\*** 
  - No single view of project profitability across portfolio
  - Cash flow surprises from late invoicing/collection
  - Cannot confidently answer "can we take this new project?"
  - Spends excessive time in spreadsheets reconciling data
\- **\*\*Goals:\*\***
  - Real-time portfolio health (revenue, margin, utilization, cash flow)
  - Drill-down from summary to transaction level in 2 clicks
  - Automated alerts for exceptions (budget overrun, overdue invoices)
  - Client profitability ranking to inform business development
\- **\*\*Key Modules:\*\*** Dashboard (executive view), Budget/Invoicing (financial control), Team Allocation (capacity for sales)
\- **\*\*Permissions:\*\*** Full system access; financial data visibility; user management; billing configuration; all project access

**#### Role 2: Project Manager**
\- **\*\*Description:\*\*** Delivery lead for 3-8 concurrent projects, managing 5-15 team members
\- **\*\*Pain Points:\*\***
  - Status updates scattered across email, chat, tools
  - Resource conflicts discovered late
  - Scope creep not tracked/approved formally
  - Manual status reporting to leadership (2-3 hrs/week)
\- **\*\*Goals:\*\***
  - Single project command center (plan, track, communicate)
  - Instant resource availability for assignment decisions
  - Automated status reports generated from live data
  - Change request workflow with budget/schedule impact
\- **\*\*Key Modules:\*\*** Task Management (primary), Team Allocation, Budget Tracking (project-level), Dashboard (project health)
\- **\*\*Permissions:\*\*** Project CRUD for owned projects; team assignment within projects; budget view/edit for owned projects; invoice review for owned projects

**#### Role 3: Team Member**
\- **\*\*Description:\*\*** Specialist contributor (designer, developer, consultant, marketer) — billable resource
\- **\*\*Pain Points:\*\***
  - Unclear priorities across multiple projects
  - Time tracking is a chore (forgotten, inaccurate)
  - No visibility into how work impacts project health
  - Context switching between too many tools
\- **\*\*Goals:\*\***
  - Clear "what should I work on today" view
  - Frictionless time logging (timer + quick entry)
  - See task context (project goal, client, dependencies)
  - Minimal tool overhead (< 10 min/day admin)
\- **\*\*Key Modules:\*\*** Task Management (my tasks), Time Tracking, Dashboard (personal utilization)
\- **\*\*Permissions:\*\*** Task update (assigned tasks only); time entry (own); view project context (assigned projects); personal dashboard only

**### 4.2 Role-Permission Matrix**

\| Permission Category | Admin (Owner) | Project Manager | Team Member |
\|---------------------|---------------|-----------------|-------------|
\| **\*\*User Management\*\*** | ✅ | ❌ | ❌ |
\| **\*\*Role Assignment\*\*** | ✅ | ❌ | ❌ |
\| **\*\*Project CRUD\*\*** | ✅ | Own | View\* |
\| **\*\*Task Management\*\*** | ✅ | Own | Assigned |
\| **\*\*Team Allocation\*\*** | ✅ | Own | View |
\| **\*\*Budget Create/Edit\*\*** | ✅ | Own | ❌ |
\| **\*\*Invoice Generate\*\*** | ✅ | Own\* | ❌ |
\| **\*\*Invoice Approve/Send\*\*** | ✅ | ❌ | ❌ |
\| **\*\*Financial Reports\*\*** | ✅ | Own\* | ❌ |
\| **\*\*Executive Dashboard\*\*** | ✅ | ❌ | ❌ |
\| **\*\*Project Health Dashboard\*\*** | ✅ | Own | Assigned |
\| **\*\*Personal Dashboard\*\*** | ✅ | ✅ | ✅ |
\| **\*\*Time Entry\*\*** | ✅ | ✅ | Own |
\| **\*\*Expense Submit\*\*** | ✅ | ✅ | Own |
\| **\*\*Expense Approve\*\*** | ✅ | Own | ❌ |
\| **\*\*System Settings\*\*** | ✅ | ❌ | ❌ |
\| **\*\*API Access\*\*** | ✅ | Config | ❌ |

\*Scoped to relevant projects only

**---**

**## 5. Business Value**

The system delivers measurable value across **\*\*operational efficiency, cost reduction, revenue protection, and strategic enablement\*\***.

**### 5.1 Operational Efficiency Gains**

\| Metric | Current State (Typical SME) | Target State (With System) | Improvement |
\|--------|----------------------------|---------------------------|-------------|
\| **\*\*Time spent on status reporting\*\*** | 2-3 hrs/week per PM | < 15 min/week (automated) | **\*\*85-90% reduction\*\*** |
\| **\*\*Time spent reconciling tools\*\*** | 3-5 hrs/week per knowledge worker | < 30 min/week | **\*\*85-90% reduction\*\*** |
\| **\*\*Resource allocation decision time\*\*** | Hours (spreadsheet analysis) | Minutes (visual heatmap) | **\*\*90%+ faster\*\*** |
\| **\*\*Invoice generation cycle\*\*** | 2-5 days (manual compilation) | < 30 minutes (auto-generated) | **\*\*95%+ faster\*\*** |
\| **\*\*Time tracking compliance\*\*** | 60-70% (forgotten/inaccurate) | 95%+ (integrated, frictionless) | **\*\*35-50% improvement\*\*** |
\| **\*\*New project "can we deliver?" answer\*\*** | Days (manual capacity check) | Real-time (live capacity view) | **\*\*Days → Seconds\*\*** |

**\*\*Annual Time Savings (50-person SME):\*\*** \~2,500-4,000 hours = **\*\*1.2-2.0 FTE\*\*** redirected to billable/strategic work.

**### 5.2 Cost Reduction**

\| Cost Category | Typical Annual Leakage (Typical SME) | System Impact | Annual Savings |
\|---------------|-------------------------------------|---------------|----------------|
\| **\*\*Unbilled hours\*\*** (forgotten time, scope creep) | 5-15% of project revenue | Integrated time→invoice; change orders | **\*\*3-10% of revenue\*\*** |
\| **\*\*Budget overruns undiscovered\*\*** | 3-8% of project revenue | Real-time burn alerts; variance tracking | **\*\*2-5% of revenue\*\*** |
\| **\*\*Late invoice collection\*\*** (cash flow cost) | 1-4% of revenue | Auto-reminders; client portal; easy payment | **\*\*1-2.5% of revenue\*\*** |
\| **\*\*Resource overallocation\*\*** (burnout, turnover) | High (replacement cost 1.5-2x salary) | Capacity planning; utilization alerts | **\*\*Significant reduction\*\*** |
\| **\*\*Tool subscription sprawl\*\*** (5-7 tools) | $15K-40K annually | Single platform replaces 4+ tools | **\*\*$10K-30K\*\*** |
\| **\*\*Manual admin labor\*\*** (reconciliation, reporting) | $25K-60K annually | Automation; unified data | **\*\*$15K-40K\*\*** |

**\*\*Total Addressable Annual Savings:\*\*** **\*\*5-16% of revenue\*\*** for a typical SME

**### 5.3 Revenue Protection & Growth Enablement**

\| Value Driver | Mechanism | Quantified Impact |
\|--------------|-----------|-------------------|
\| **\*\*Faster quote-to-cash\*\*** | Integrated pipeline: capacity check → proposal → project → invoice | 20-30% reduction in quote-to-invoice cycle |
\| **\*\*Confident capacity-based selling\*\*** | Sales can check real-time capacity before committing | 10-15% more projects accepted without overtime |
\| **\*\*Client retention via transparency\*\*** | Client portal builds trust; proactive communication | 5-10% improvement in client retention |
\| **\*\*Margin optimization\*\*** | Per-project profitability visibility → pricing adjustments | 2-5% margin improvement on future projects |
\| **\*\*Data-driven hiring\*\*** | Utilization trends + skill gaps → precise hiring plans | Avoid 1-2 bad hires/year |

**### 5.4 Centralized Tracking — The "Single Source of Truth" Value**

\| Before (Fragmented) | After (Unified) |
\|---------------------|-----------------|
\| Project status in Asana | Project status **\*\*linked to\*\*** budget burn, team capacity, invoice status |
\| Time in Harvest | Time entries **\*\*automatically flow to\*\*** project budget, invoice draft, utilization |
\| Budget in Excel | Budget **\*\*versioned, shared, with\*\*** real-time actuals from time/expenses |
\| Invoices in accounting tool | Invoices **\*\*generated from\*\*** approved time/expenses, **\*\*visible in\*\*** project & dashboard |
\| Capacity in spreadsheets | Capacity **\*\*live, visual, connected to\*\*** project assignments and time-off |
\| Reports manual | Reports **\*\*automated, scheduled, drillable\*\*** from unified data model |

**\*\*Strategic Value:\*\*** Leadership moves from **\*\*reactive firefighting\*\*** to **\*\*proactive portfolio management\*\*** — deciding which projects to pursue, which clients to fire, which roles to hire, based on data not gut feel.

**### 5.5 Competitive Positioning for the SME**

\- **\*\*Professionalizes delivery\*\*** — client portal, branded invoices, transparent reporting = enterprise-grade experience
\- **\*\*Enables scaling\*\*** — processes that work at 20 people still work at 100 (no tool migration)
\- **\*\*Reduces key-person risk\*\*** — knowledge captured in system, not heads/spreadsheets
\- **\*\*Supports exit/valuation\*\*** — documented processes, clean financial data, recurring revenue visibility

**---**

**## 6. Success Criteria**

Success criteria are defined at three levels: **\*\*FYP Academic Requirements\*\***, **\*\*Product MVP Readiness\*\***, and **\*\*Business Validation\*\***.

**### 6.1 FYP Completion Criteria (Academic Mandatory)**

\| Criterion | Definition of Done | Evidence |
\|-----------|-------------------|----------|
\| **\*\*SC-FYP-01: Complete Requirements Specification\*\*** | All blueprint docs (01-07) approved; traceability matrix linking requirements → design → tests | Signed-off docs in \`docs/project\_blueprint/\`; traceability matrix document |
\| **\*\*SC-FYP-02: System Design Documentation\*\*** | Architecture diagrams, data models, API contracts (OpenAPI), UI wireframes, security design | \`docs/architecture/\`, \`docs/api/openapi.yaml\`, \`design/wireframes/\` |
\| **\*\*SC-FYP-03: Working Prototype (MVP)\*\*** | Deployed system demonstrating all 4 core modules with RBAC, end-to-end workflows | Live URL; demo script; video walkthrough (10-15 min) |
\| **\*\*SC-FYP-04: Test Coverage\*\*** | ≥ 80% backend unit/integration coverage; ≥ 70% frontend component coverage; E2E for 10 critical paths | Coverage reports (pytest-cov, Vitest); CI pipeline artifacts |
\| **\*\*SC-FYP-05: Security & Quality\*\*** | No critical/high vulnerabilities (OWASP ZAP/bandit); code quality gates passed (lint, type-check, complexity) | Security scan reports; CI quality gate logs |
\| **\*\*SC-FYP-06: Dissertation/Report\*\*** | 15,000-20,000 word dissertation with literature review, methodology, results, evaluation, conclusions | Submitted PDF; supervisor sign-off |
\| **\*\*SC-FYP-07: Presentation & Viva\*\*** | 20-min presentation + 30-min Q&A demonstrating system, decisions, learning | Presentation slides; viva recording/notes |

**### 6.2 Product MVP Readiness Criteria (Launch-Ready)**

\| Criterion | Target | Measurement |
\|-----------|--------|-------------|
\| **\*\*SC-MVP-01: Core Workflow Completion\*\*** | 100% of P0 user stories implemented and tested | Story mapping board; acceptance criteria checklist |
\| **\*\*SC-MVP-02: Performance Benchmarks\*\*** | • API p95 < 500ms (simple), < 1.5s (complex)\<br>• Dashboard load < 2s\<br>• Support 200 concurrent users | k6/Locust load test results; Lighthouse CI |
\| **\*\*SC-MVP-03: Accessibility\*\*** | WCAG 2.1 AA compliance for all user-facing pages | axe-core audit; manual keyboard/screen reader test |
\| **\*\*SC-MVP-04: Browser/Device Support\*\*** | Chrome, Firefox, Safari, Edge (last 2 versions); iOS Safari, Chrome Android; responsive 375px-1920px | BrowserStack test matrix |
\| **\*\*SC-MVP-05: Data Integrity\*\*** | Zero data loss scenarios in failure testing (DB failover, network partition) | Chaos engineering test report |
\| **\*\*SC-MVP-06: Deployment Automation\*\*** | One-command deploy to staging/production; rollback < 2 min; zero-downtime deploys | CI/CD pipeline; runbook |
\| **\*\*SC-MVP-07: Observability\*\*** | Structured logging (JSON); metrics (RED method); alerting on SLO breach | Grafana dashboards; alert rules; runbook |
\| **\*\*SC-MVP-08: Documentation\*\*** | • API docs (auto-generated)\<br>• User guide (end-user)\<br>• Admin guide\<br>• Developer onboarding guide | Published docs site; README |

**### 6.3 Business Validation Criteria (Post-MVP, 3-Month Pilot)**

\| Criterion | Target | Measurement Method |
\|-----------|--------|-------------------|
\| **\*\*SC-BV-01: Pilot Adoption\*\*** | 3+ SMEs (15-100 users each) actively using system for ≥ 8 weeks | Active user analytics; weekly active users > 60% of licensed |
\| **\*\*SC-BV-02: Time Savings Realized\*\*** | Pilot users report ≥ 5 hrs/week saved on admin/reporting per PM | Structured interviews; time-tracking comparison (pre/post) |
\| **\*\*SC-BV-03: Billing Accuracy Improvement\*\*** | ≥ 90% reduction in invoice corrections/re-issues | Invoice revision rate comparison |
\| **\*\*SC-BV-04: Budget Visibility\*\*** | 100% of pilot projects have real-time budget tracking enabled | Feature flag analytics; project configuration audit |
\| **\*\*SC-BV-05: Net Promoter Score\*\*** | NPS ≥ 40 from pilot users | Quarterly NPS survey |
\| **\*\*SC-BV-06: Willingness to Pay\*\*** | ≥ 50% of pilot users express intent to purchase at target price point | Pricing survey; conversion discussions |
\| **\*\*SC-BV-07: Support Load\*\*** | < 5 critical bugs/month; < 20 support tickets/month per 50 users | Support ticketing system |

**### 6.4 Success Criteria Traceability**

\`\`\`
FYP Requirements (SC-FYP-01 to SC-FYP-07)
       │
       ├──→ Blueprint Docs (01-07) ──→ User Stories (06) ──→ Acceptance Tests
       │
       ├──→ Architecture & Design ──→ Implementation ──→ Unit/Integration/E2E Tests
       │                                          │
       │                                          ├──→ Performance Tests (SC-MVP-02)
       │                                          ├──→ Security Tests (SC-FYP-05)
       │                                          └──→ Accessibility Tests (SC-MVP-03)
       │
       ├──→ Deployment Pipeline ──→ Staging/Prod ──→ Observability (SC-MVP-07)
       │
       ├──→ Documentation (SC-MVP-08)
       │
       └──→ Dissertation + Viva (SC-FYP-06, SC-FYP-07)

MVP Launch (SC-MVP-01 to SC-MVP-08)
       │
       └──→ 3-Month Pilot ──→ Business Validation (SC-BV-01 to SC-BV-07)
\`\`\`

**---**

**## Appendix A: Glossary**

\| Term | Definition |
\|------|------------|
\| **\*\*SME\*\*** | Small and Medium Enterprise (typically 10-250 employees) |
\| **\*\*RBAC\*\*** | Role-Based Access Control |
\| **\*\*RAG\*\*** | Red/Amber/Green status indicator |
\| **\*\*AR\*\*** | Accounts Receivable |
\| **\*\*P&L\*\*** | Profit and Loss statement |
\| **\*\*FTE\*\*** | Full-Time Equivalent |
\| **\*\*SaaS\*\*** | Software as a Service |
\| **\*\*SLO\*\*** | Service Level Objective |
\| **\*\*RED Method\*\*** | Rate, Errors, Duration (key service metrics) |
\| **\*\*NPS\*\*** | Net Promoter Score |
\| **\*\*REST\*\*** | Representational State Transfer |
\| **\*\*API\*\*** | Application Programming Interface |
\| **\*\*JWT\*\*** | JSON Web Token |
\| **\*\*SSO\*\*** | Single Sign-On |
\| **\*\*OIDC\*\*** | OpenID Connect |

**---**

**## Appendix B: References**

1\. **\*\*SME Digitalization Reports:\*\*** OECD (2023), Global SME surveys
2\. **\*\*Project Management Waste Statistics:\*\*** PMI Pulse of the Profession (2023), Wellingtone State of PM (2024)
3\. **\*\*Tool Sprawl Data:\*\*** Industry SaaS Trends Reports (2023-2024)
4\. **\*\*Technical Standards:\*\*** OWASP Top 10 (2021), WCAG 2.1, OpenAPI 3.1, GDPR Articles 5, 15-22

**---**

**## Document Control**

\| Version | Date | Author | Changes |
\|---------|------|--------|---------|
\| 1.0 | 2026 | Project Team | Initial comprehensive draft for FYP Phase 0 - aligned with approved proposal |

**---**

**\*\*End of Document\*\***
