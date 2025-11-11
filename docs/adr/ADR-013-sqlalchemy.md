# ADR-013: SQLAlchemy as ORM

**Status:** Accepted  
**Date:** 2025-11-11  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs an ORM (Object-Relational Mapping) tool to interact with the PostgreSQL database. Should we use an ORM or write raw SQL queries?

## Decision Drivers

- Recommended by internship placement (ESS Group)
- Previous positive experience with Entity Framework in .NET
- Type safety and model-based queries
- Database migrations support
- Integration with FastAPI and Pydantic

## Considered Alternatives

No alternatives were seriously considered. ESS Group recommended SQLAlchemy, and since I had positive experience with Entity Framework in .NET, using an ORM was a natural choice. I lack the knowledge to evaluate other Python ORMs, so I trusted the LIA recommendation.

## Decision

We will use **SQLAlchemy** as the ORM.

**Rationale:**

- **Internship alignment**: ESS Group recommended SQLAlchemy for the project
- **Familiar pattern**: Similar to Entity Framework which I used and liked in .NET
- **Type safety**: Model-based queries instead of raw SQL strings
- **Migrations**: Built-in support with Alembic
- **FastAPI integration**: Works well with Pydantic models
- **Industry standard**: Most popular ORM in Python ecosystem

**Note:** Supervisor warned that SQLAlchemy can be tricky to configure but I see this as a valuable learning opportunity. The challenge of getting it configured correctly will be good preparation for real-world development.

## Consequences

### Positive Consequences

- Prepares for internship at ESS Group
- Type-safe database queries
- Automatic migrations with Alembic
- Similar patterns to Entity Framework (familiar)
- Learning industry-standard Python ORM

### Negative Consequences

- Configuration complexity (supervisor's warning)
- Learning curve for SQLAlchemy-specific patterns
- Potential "headaches" during setup
- Abstraction layer may hide some SQL details

## References

- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [SQLAlchemy with FastAPI](https://fastapi.tiangolo.com/tutorial/sql-databases/)
