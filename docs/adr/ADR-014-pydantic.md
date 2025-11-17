# ADR-014: Pydantic for Data Validation

**Status:** Accepted  
**Date:** 2025-11-11  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs data validation for API requests and responses in FastAPI. How should we validate and serialize data between the API and database?

## Decision Drivers

- Recommended by internship placement (ESS Group)
- Integration with FastAPI
- No prior experience with Python validation libraries
- Need type-safe data models for API endpoints

## Considered Alternatives

No alternatives were seriously considered. ESS Group recommended Pydantic as part of the FastAPI stack, and I have no experience with Python validation libraries to evaluate other options.

## Decision

We will use **Pydantic** for data validation.

**Rationale:**

- **Internship alignment**: ESS Group recommended Pydantic for the project
- **FastAPI integration**: Built-in support in FastAPI for request/response validation
- **Type hints**: Uses Python type hints for automatic validation
- **Similar to Zod**: Appears similar to Zod which I use in the frontend (familiar concept)

**Note:** I have zero experience with Pydantic and haven't had time to explore it yet. The decision is based purely on the internship recommendation. I'm uncertain how it integrates with SQLAlchemy, but will learn during implementation.

## Consequences

### Positive Consequences

- Prepares for internship at ESS Group
- Automatic request/response validation in FastAPI
- Type-safe data models
- Potentially similar patterns to Zod (if comparable)

### Negative Consequences

- Completely new library to learn
- Uncertain how it integrates with SQLAlchemy models
- Don't know if it's required for FastAPI or optional

## References

- [Pydantic Documentation](https://docs.pydantic.dev/)
- [FastAPI with Pydantic](https://fastapi.tiangolo.com/tutorial/body/)
