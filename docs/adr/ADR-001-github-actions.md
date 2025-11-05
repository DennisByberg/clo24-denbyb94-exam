# ADR-001: GitHub Actions for CI/CD

**Status:** Accepted  
**Date:** 2025-11-05  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs a CI/CD solution to automate testing, linting, and deployment to Azure App Service.

## Decision Drivers

- Already using GitHub for code hosting
- Free for public repositories
- Easy to learn and set up
- Good documentation

## Considered Alternatives

No alternatives were seriously considered. GitHub Actions is the natural choice for a GitHub-hosted project.

## Decision

We will use **GitHub Actions** for CI/CD.

**Rationale:**

- **Free**: Unlimited minutes for public repositories
- **Integrated**: Workflows live in `.github/workflows/` - no external service needed
- **Easy to learn**: YAML-based configuration with good documentation
- **Azure support**: Official actions available for Azure deployment
- **Industry standard**: Widely used in modern projects

## Consequences

### Positive Consequences

- Free for this public repository
- Integrated directly in GitHub
- Good learning opportunity for CI/CD concepts
- Workflows are version controlled

### Negative Consequences

- Need to learn YAML syntax
- Tied to GitHub platform

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
