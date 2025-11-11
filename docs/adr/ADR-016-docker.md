# ADR-016: Docker for Containerization

**Status:** Accepted  
**Date:** 2025-11-11  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs a deployment and development environment strategy. How should we package and run the application locally and in production?

## Decision Drivers

- Used at internship placement (ESS Group)
- Previous experience with Docker from education
- Industry standard for containerization
- Deployment to Azure App Service
- Consistent development environment

## Considered Alternatives

No alternatives were seriously considered. ESS Group uses Docker, making it the obvious choice for the project.

## Decision

We will use **Docker** for containerization.

**Rationale:**

- **Internship alignment**: ESS Group uses Docker in their stack
- **Previous experience**: Used Docker during education for development environments and building images for Azure Container Registry (ACR)
- **Industry standard**: Docker is increasingly used in the industry
- **Azure integration**: Works with Azure App Service deployment
- **Consistent environments**: Same setup for development and production

**Note:** While I have experience with Docker from education (running development environments, building images, pushing to ACR), I haven't used it with Azure App Service before.

## Consequences

### Positive Consequences

- Prepares for internship at ESS Group
- Familiar tool from education (building on existing knowledge)
- Isolation between services (FastAPI, PostgreSQL)
- Reproducible development environment
- Industry-standard containerization approach

### Negative Consequences

- Need to learn Azure App Service deployment with Docker
- Additional complexity compared to running services directly
- Docker Compose setup required for local development

## References

- [Docker Documentation](https://docs.docker.com/)
