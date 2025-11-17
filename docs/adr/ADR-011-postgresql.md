# ADR-011: PostgreSQL as Database

**Status:** Accepted  
**Date:** 2025-11-11  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The booking platform needs a database to store users, bookings, and facility information. Should we use a relational database or a NoSQL database?

## Decision Drivers

- Complex relationships (users, bookings, time slots, facilities)
- Need for ACID transactions for booking system
- Many-to-many relationships between bookings and time slots
- Data integrity is critical for booking conflicts
- Learning opportunity before internship

## Considered Alternatives

### MySQL

- **Pros:**
  - Popular and widely used
  - Good documentation
  - Similar to PostgreSQL
- **Cons:**
  - Less feature-rich than PostgreSQL
  - Weaker support for advanced data types
  - PostgreSQL preferred in modern stacks

### MongoDB (NoSQL)

- **Pros:**
  - Flexible schema
  - Good for rapid prototyping
- **Cons:**
  - Not ideal for complex relationships
  - No built-in transaction support (in older versions)
  - Booking system needs relational integrity

## Decision

We will use **PostgreSQL** as the database.

**Rationale:**

- **Relational data**: Booking system has complex relationships (users, bookings, time slots)
- **ACID transactions**: Critical for preventing double bookings
- **Data integrity**: Foreign keys and constraints ensure data validity
- **Industry standard**: PostgreSQL is widely used in modern web applications
- **Learning value**: Want to learn PostgreSQL properly before internship

**Note:** The booking system's relational nature (many-to-many between bookings and time slots) makes a relational database the clear choice.

## Consequences

### Positive Consequences

- Strong data integrity with foreign keys and constraints
- ACID transactions prevent booking conflicts
- Excellent support for complex queries
- Large community and good tooling
- Learning valuable database skills

### Negative Consequences

- Need to learn SQL and database design
- Schema changes require migrations
- Fixed schema structure (less flexible than NoSQL)

## References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
