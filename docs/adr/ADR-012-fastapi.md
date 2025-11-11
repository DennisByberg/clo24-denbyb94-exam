# ADR-012: FastAPI as Web Framework

**Status:** Accepted  
**Date:** 2025-11-11  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs a Python web framework to build the REST API for the booking platform. Which framework should we use?

## Decision Drivers

- Used at internship placement (ESS Group)
- Prepare for LIA by learning their stack
- Modern Python framework
- Need to learn new backend technology for exam project
- API-first design for frontend-backend separation

## Considered Alternatives

### Django

- **Pros:**
  - Full-featured framework with ORM, admin panel, authentication
  - Mature and widely used
  - Good for rapid development
- **Cons:**
  - Not used at ESS Group
  - More heavyweight than needed for API-only backend
  - Includes features we don't need (templating, forms)

### Flask

- **Pros:**
  - Lightweight and simple
  - Good for learning Python web development
  - Flexible and minimal
- **Cons:**
  - Not used at ESS Group
  - Less modern than FastAPI
  - No built-in API documentation

## Decision

We will use **FastAPI** as the web framework.

**Rationale:**

- **Internship alignment**: ESS Group uses FastAPI - learning it now prepares for LIA
- **Exam requirement**: Need to learn a new technology, FastAPI is completely new to me
- **Modern framework**: Built for modern Python with async/await support
- **API-first**: Designed specifically for building REST APIs
- **Automatic documentation**: Built-in Swagger/OpenAPI documentation

**Note:** The choice was clear - FastAPI is what I'll use at my LIA placement, making it the obvious choice for the exam project. Django and Flask were considered but not seriously evaluated since they don't align with the LIA tech stack.

## Consequences

### Positive Consequences

- Prepares directly for internship at ESS Group
- Modern Python framework with async support
- Automatic API documentation (Swagger UI)
- Type hints integration with Pydantic
- Learning valuable industry-standard technology

### Negative Consequences

- Completely new framework to learn
- Need to learn async programming in Python

## References

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
