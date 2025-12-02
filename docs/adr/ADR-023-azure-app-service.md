# ADR-023: Azure App Service for Deployment Platform

**Status:** Accepted  
**Date:** 2025-12-02  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The full-stack restaurant booking application needs a deployment platform that can host the Python/FastAPI backend. The platform must support easy deployment, managed infrastructure, database integration, and authentication.

## Decision Drivers

- Course requirement to learn Azure cloud services
- Need managed deployment platform to avoid infrastructure complexity
- Integration with PostgreSQL database
- Built-in authentication support (Easy Auth)
- Support for Python 3.13 runtime
- Cost considerations for student project
- Ease of deployment and CI/CD integration

## Considered Alternatives

### Azure Container Apps

- **Pros:**
  - Modern containerized approach
  - Better scalability with microservices
  - More flexible resource configuration
- **Cons:**
  - More complex than needed for monolithic app
  - Requires Docker knowledge and Dockerfile creation
  - Higher learning curve for container orchestration
  - Overkill for this project size
  - Additional complexity in CI/CD pipeline
  - No built-in Easy Auth (would need custom implementation)

## Decision

We will use **Azure App Service (Linux B1 tier)** for deploying the FastAPI backend.

**Rationale:**

- **Azure ecosystem**: Fulfills course requirement to learn Azure cloud services
- **Built-in Easy Auth**: Native Google OAuth integration without custom code
- **Managed infrastructure**: No need to manage servers, OS updates, or Docker
- **Python 3.13 support**: Official support for latest Python version
- **PostgreSQL integration**: Direct connection to Azure PostgreSQL Flexible Server
- **GitHub Actions integration**: Official Azure deployment actions available
- **Cost-effective**: B1 tier (~$13/month) suitable for student project
- **Simple deployment**: Straightforward deployment process via GitHub Actions
- **Environment variables**: Easy configuration management via Azure Portal or CLI
- **Monitoring**: Built-in Application Insights integration
- **Learning opportunity**: Hands-on experience with Azure PaaS

## Consequences

### Positive Consequences

- Aligned with course objectives to learn Azure
- No infrastructure management (managed OS, runtime, security patches)
- Built-in Easy Auth reduces authentication code complexity
- Direct integration with other Azure services (PostgreSQL, Blob Storage)
- Simple CI/CD setup with GitHub Actions
- Good monitoring and logging capabilities
- Professional deployment platform experience

### Negative Consequences

- Vendor lock-in to Azure ecosystem
- Monthly cost (~$13/month for B1 tier) - no free tier
- Limited customization compared to container-based solutions
- Azure-specific deployment configurations

### Neutral Consequences

- Need to learn Azure-specific deployment patterns
- Environment variables managed via Azure Portal/CLI
- CORS configuration via Azure settings
- Dependency on Azure uptime and service availability

## References

- [Azure App Service Documentation](https://learn.microsoft.com/en-us/azure/app-service/)
