# Project Plan

**Student:** Dennis Byberg  
**Date:** 2025-11-05  
**Repo:** [`github.com/DennisByberg/clo24-denbyb94-exam`](https://github.com/DennisByberg/clo24-denbyb94-exam)  
**Backlog:** [`github.com/users/DennisByberg/projects/14`](https://github.com/users/DennisByberg/projects/14)

## 📖 Project Overview

**Title:** Full-stack Web Platform for ESS Group's New Facility – From .NET to Python

**Summary:** Develop a web platform for ESS Group's new restaurant/spa/event facility with booking system and user management. Learn Python/FastAPI before LIA internship at ESS Group.

## 🎯 Goals & Deliverables

**Main Goal:** Build a functional web platform with booking system and user management in Python/FastAPI.

**Sub-goals / Deliverables:**

- **Week 45:** Approved project plan, initial design
- **Week 46:** Frontend foundation with Next.js
- **Week 47:** Backend PoC with FastAPI + PostgreSQL
- **Week 48:** API integration, authentication
- **Week 49:** Booking system functional
- **Week 50:** Azure deployment, final report
- **Week 51:** Demo & opposition

## 👥 Stakeholders & Target Audience

The project's primary target audience is end users who will book services (customers, members, and administrators). Secondary stakeholders include ESS Group as LIA host and Marcus Medina Ramirez as supervisor.

## 🔍 Scope

### Features Included:

The platform will present ESS Group's facility with focus on restaurant, spa, and event spaces. The core of the system is a booking system with three different booking types: restaurant bookings with time and guest count, spa bookings with simpler time management, and event bookings with more complex time management. The system will use a many-to-many relation between bookings and time slots.

The platform includes user registration and login with three role levels (customer, member, admin), and an admin panel for management. Backend consists of a REST API built with FastAPI and PostgreSQL with SQLAlchemy ORM. The entire system is deployed on Azure App Service.

### Features Not Included:

In the first version, payment solutions, SMS/email notifications, and native mobile applications are excluded.

## 📅 Milestones & Timeline

| Week   | Milestone                 | Deliverable / Activity                                                          |
| ------ | ------------------------- | ------------------------------------------------------------------------------- |
| **44** | Project Setup             | ✅ Github basic structure, Template ADR, mini-idea approved, backlog created    |
| **45** | Planning & Frontend MVP   | Approved project plan, Next.js MVP locally, ADR frontend selection              |
| **46** | Backend PoC               | FastAPI setup, PostgreSQL schema, basic CRUD, Docker configuration              |
| **47** | Integration Foundation    | API integration frontend-backend, Docker compose for full stack, report outline |
| **48** | Integration               | API integration frontend-backend, authentication, progress report #2 + QA plan  |
| **49** | Feature Complete          | Booking system functional, admin panel, slide deck + demo script                |
| **50** | Testing & Deployment      | Azure deployment, CI/CD pipeline, bugfixing, final report                       |
| **51** | Presentation & Reflection | Demo, opposition, final reflection                                              |

## ⚠️ Risk Log

| Risk                          | Probability | Impact | Mitigation / Plan B                                  |
| ----------------------------- | ----------- | ------ | ---------------------------------------------------- |
| Python/FastAPI completely new | **H**       | **M**  | Tutorials, compare with .NET knowledge, weekly goals |
| Next.js learning curve        | **M**       | **M**  | Start simple, compare with React                     |
| Azure deployment              | **M**       | **H**  | Test locally first with Docker                       |
| Azure costs                   | **L**       | **M**  | Azure Free Tier, budget alerts                       |

**Supervisor feedback:** _"Go hard with SRP and it will work out"_

## 🛠️ Resources & Tools

**Code Management:** The project is in the repo [`github.com/DennisByberg/clo24-denbyb94-exam`](https://github.com/DennisByberg/clo24-denbyb94-exam) with branch strategy `main` (production), `dev` (integration), and feature branches. Backlog and project planning is managed in [`GitHub Projects`](https://github.com/users/DennisByberg/projects/14).

**Cloud & Infrastructure:** Azure App Service for hosting, PostgreSQL for database, Azure Key Vault for secrets management. CI/CD pipeline runs via GitHub Actions.

**Python Stack:** The project uses **uv** for package and project management, **Ruff** for linting and formatting, **Pydantic** for schema models with SQLAlchemy, and **Alembic** for database migrations.

**JavaScript Stack:** **Bun** is used as package and project manager for frontend, **Husky** for pre-commit linting.

**Documentation:** Architecture decisions are documented in **ADR** (Architecture Decision Records), weekly progress is logged in **Weekly logs**, and project planning happens in GitHub Projects backlog.

## ✅ Quality Assurance

**Test Strategy:** Backend is tested with pytest, frontend with Jest and React Testing Library. Manual testing is used to validate user flows and edge cases.

**Code Review:** Focus is on Single Responsibility Principle (SRP) to ensure maintainable and modular code. A classmate will conduct opposition in week 51.

**Documentation Requirements:** The project requires a technical report in Swedish with English abstract, README file with setup instructions, and API documentation automatically generated via FastAPI.

## 🎬 Demo & Presentation Plan

The presentation will demonstrate a complete user journey from registration, login to booking services. The admin panel is shown to illustrate management functionality. The entire application runs live from Azure deployment to show the production environment.

Test accounts are prepared for both Customer and Admin roles to enable live demonstration of different user levels.

## 📝 Teacher Feedback

> _Awaiting feedback from supervisor..._
