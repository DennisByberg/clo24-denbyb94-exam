# ADR-008: TanStack Query for Data Fetching

**Status:** Accepted  
**Date:** 2025-11-05  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs a solution for fetching data from the backend API and managing loading/error states.

## Decision Drivers

- Used at internship placement (ESS Group)
- Need to handle API calls and loading states
- Want to learn modern data fetching approach
- Industry standard tool

## Considered Alternatives

### Alternative 1: useEffect with fetch/Axios

What I've used before in education. Familiar but requires manual handling of loading states and caching.

### Alternative 2: Redux/Redux Toolkit

Also used before, but feels heavy for just data fetching. Better for global state management.

## Decision

We will use **TanStack Query** for data fetching.

**Rationale:**

- **Internship alignment**: ESS Group uses TanStack Query
- **Learning opportunity**: Completely new tool for me to learn
- **Modern approach**: Industry standard for React data fetching
- **Built-in features**: Handles caching, loading states, and refetching automatically
- **Better than useEffect**: Less boilerplate code than manual fetch

**Note:** Would normally use useEffect with fetch (familiar from education) or Redux (also used before), but choosing TanStack Query to align with internship tech stack and learn a modern industry-standard tool.

## Consequences

### Positive Consequences

- Aligns with ESS Group's tech stack
- Automatic caching and loading state handling
- Less boilerplate than useEffect approach
- Learning modern industry-standard tool

### Negative Consequences

- Completely new tool to learn
- Additional dependency
- More complex than simple useEffect for basic cases

## References

- [TanStack Query Documentation](https://tanstack.com/query/latest)
