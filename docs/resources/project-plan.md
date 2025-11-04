# Project Plan – Full-stack Web Platform for ESS Group

**Student:** Dennis Byberg  
**Date:** 2025-11-03

## 1. Project Overview

- **Title:** Full-stack Web Platform for ESS Group's New Facility – From .NET to Python

- **Summary:**  
  Develop a web platform for ESS Group's new restaurant/spa/event facility with booking system and user management. Learn Python/FastAPI before LIA internship at ESS Group.

## 2. Goals & Deliverables

- **Main Goal:**  
  Build a functional web platform with booking system and user management in Python/FastAPI.

- **Sub-goals / Deliverables:**
  - **Week 45 (4/11):** Approved project plan, initial design
  - **Week 46 (14/11):** Frontend foundation with Next.js
  - **Week 47 (21/11):** Backend PoC with FastAPI + PostgreSQL
  - **Week 48 (28/11):** API integration, authentication
  - **Week 49 (5/12):** Booking system functional
  - **Week 50 (11/12):** Azure deployment, final report
  - **Week 51 (19/12):** Demo & opposition

## 3. Stakeholders & Target Audience

- **Primary audience:** End users (customers/members/administrators)
- **Secondary stakeholders:** ESS Group (LIA host), Marcus Medina Ramirez (supervisor)

## 4. Scope

### Features Included:

- Presentation of the facility (restaurant/spa/event)
- **Booking System:**
  - Restaurant: Table booking with time and guest count
  - Spa: Simple time booking (similar to restaurant)
  - Event: Venue booking with size, capacity and time (more complex)
  - Many-to-many relation between bookings and time slots
- User registration and login (3 roles: customer/member/admin)
- Admin panel
- REST API (FastAPI + PostgreSQL with SQLAlchemy ORM)
- Deployment on Azure App Service

### Features Not Included (for now):

- Payment solution
- SMS/email notifications
- Native mobile app

## 5. Milestones & Timeline

| Week   | Milestone                 | Deliverable / Activity                                                                |
| ------ | ------------------------- | ------------------------------------------------------------------------------------- |
| **44** | Project Setup             | ✅ Basic structure, ADR, mini-idea approved, backlog created                          |
| **45** | Planning & Design         | Approved project plan, UI/UX design (Figma), populated backlog, ADR backend selection |
| **46** | Backend PoC               | FastAPI setup, PostgreSQL schema, basic CRUD, Docker configuration, feasibility study |
| **47** | Frontend Foundation       | Next.js setup, routing, basic components, report outline                              |
| **48** | Integration               | API integration frontend-backend, authentication, progress report #2 + QA plan        |
| **49** | Feature Complete          | Booking system functional, admin panel, slide deck + demo script                      |
| **50** | Testing & Deployment      | Azure deployment, CI/CD pipeline, bugfixing, final report                             |
| **51** | Presentation & Reflection | Demo, opposition, final reflection                                                    |

## 6. Risk Log

| Risk                          | Probability | Impact | Mitigation / Plan B                                  |
| ----------------------------- | ----------- | ------ | ---------------------------------------------------- |
| Python/FastAPI completely new | **H**       | **M**  | Tutorials, compare with .NET knowledge, weekly goals |
| Next.js learning curve        | **M**       | **M**  | Start simple, compare with React                     |
| Azure deployment              | **M**       | **H**  | Test locally first with Docker                       |
| Azure costs                   | **L**       | **M**  | Azure Free Tier, budget alerts                       |

**Supervisor feedback:** _"Go hard with SRP and it will work out"_

## 7. Resources & Tools

- **Code repo:** [`clo24-denbyb94-exam`](https://github.com/DennisByberg/clo24-denbyb94-exam)
- **Branch strategy:** `main` (prod), `dev` (integration), feature branches
- **Cloud:** Azure App Service, PostgreSQL, Key Vault
- **CI/CD:** GitHub Actions
- **Python:**
  - **uv** - Package and project manager
  - **Ruff** - Linting and formatting
  - **Pydantic** - Schema models with SQLAlchemy
  - **Alembic** - Database migrations
- **JavaScript:**
  - **Bun** - Package and project manager
  - **Husky** - Pre-commit linting
- **Documentation:** ADR, Weekly logs, GitHub Project #14

## 8. Quality Assurance

- **Test Strategy:**

  - Backend: pytest
  - Frontend: Jest + React Testing Library
  - Manual testing of user flows

- **Code Review:**

  - Focus on SRP (Single Responsibility Principle)
  - Opposition from classmate (week 51)

- **Documentation Requirements:**
  - Technical report (Swedish + English abstract)
  - README with setup instructions
  - API documentation (FastAPI auto-docs)

## 9. Demo & Presentation Plan

- **Demonstrate:**

  - User journey: registration → login → booking
  - Admin panel
  - Live deployment on Azure

- **Test Accounts:**
  - Customer & Admin

## 10. Approval

- **Student:** Dennis Byberg – 2025-11-03
- **Supervisor:** Marcus Medina Ramirez - 2025-11-03
- **Comments/Conditions:**
