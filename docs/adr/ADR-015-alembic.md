# ADR-015: Alembic for Database Migrations

**Status:** Accepted  
**Date:** 2025-11-11  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs a way to manage database schema changes and version control for the PostgreSQL database. How should we handle database migrations?

## Decision Drivers

- Recommended by internship supervisor as "a good learning experience"
- Need for version control of database schema
- Previous experience with Entity Framework migrations in .NET
- Integration with SQLAlchemy

## Considered Alternatives

No alternatives were seriously considered. ESS Group's supervisor recommended Alembic as a valuable learning opportunity, and I lack the experience to evaluate other migration tools.

## Decision

We will use **Alembic** for database migrations.

**Rationale:**

- **Learning opportunity**: ESS Group supervisor recommended it as "a good learning experience" even though they don't use it in production
- **Trusted recommendation**: The supervisor explicitly suggested it - I trust his judgment completely
- **Familiar concept**: Similar to Entity Framework migrations which I've worked with in .NET
- **SQLAlchemy integration**: Standard migration tool for SQLAlchemy
- **Professional skill**: Database migrations are essential knowledge regardless of specific tool

**Important note**: ESS Group does **not** use Alembic in production due to their system architecture, but the supervisor believes learning it will be valuable for my development. This is purely an educational decision to gain migration experience.

## Consequences

### Positive Consequences

- Learn database migration concepts and version control
- Experience similar to Entity Framework migrations (familiar pattern)
- Professional skill applicable beyond this specific tool
- Proper schema versioning for the project
- Supervisor-endorsed learning opportunity

### Negative Consequences

- Learning a tool that won't be used at the internship
- May need to adapt to different migration approach at ESS Group
- Additional complexity compared to manual SQL scripts

## References

- [Alembic Documentation](https://alembic.sqlalchemy.org/)
- [Alembic with SQLAlchemy](https://alembic.sqlalchemy.org/en/latest/tutorial.html)
