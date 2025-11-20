# ADR-017: UV as Python Package Manager

**Status:** Accepted  
**Date:** 2025-11-11  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs a Python package manager for installing dependencies and managing the virtual environment for the backend.

## Decision Drivers

- Used at internship placement (ESS Group)
- Prepare for internship by learning their stack
- Modern Python tooling
- Need fast and reliable dependency management

## Considered Alternatives

### pip (Python Package Installer)

- **Pros:**
  - Already familiar with it from education
  - Standard Python package installer
  - Well-documented and widely used
  - Comes with Python
- **Cons:**
  - Not used at ESS Group
  - Slower than modern alternatives
  - No built-in lock file (requires requirements.txt)
  - Manual virtual environment management

## Decision

We will use **UV** as the Python package manager.

**Rationale:**

- **Internship alignment**: ESS Group uses UV - learning it now prepares for internship
- **Learning opportunity**: Similar to ESLint and other linting tools in workflow
- **Modern tooling**: Built in Rust for speed and reliability
- **Fast**: Significantly faster than pip for installation and resolution
- **Lock file**: Built-in `uv.lock` for reproducible builds
- **pyproject.toml**: Native support for modern Python project structure

**Note:** Would normally use pip (more familiar from education), but choosing UV to align with internship tech stack and learn modern Python tooling.

## Consequences

### Positive Consequences

- Prepares for internship at ESS Group
- Much faster dependency installation than pip
- Learning modern Python tooling
- Reproducible builds with uv.lock
- Integrated virtual environment management

### Negative Consequences

- Need to learn new tool (unfamiliar)
- Smaller community than pip
- Newer tool with potentially less documentation

## References

- [UV Documentation](https://docs.astral.sh/uv/)
