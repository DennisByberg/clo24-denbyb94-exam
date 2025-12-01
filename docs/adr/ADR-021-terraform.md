# ADR-021: Terraform for Infrastructure as Code

**Status:** Accepted  
**Date:** 2025-11-28  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs a strategy for managing Azure cloud infrastructure. How should we provision and manage Azure resources in a reproducible and version-controlled way?

## Decision Drivers

- Previous experience with Terraform from education
- Personal preference for Terraform's syntax and state management
- Need for Infrastructure as Code (IaC) approach
- Version control for infrastructure changes
- Reproducibility across environments

## Considered Alternatives

### Alternative 1: Azure Bicep

- **Pros:**
  - Native Azure tool with first-class Azure support
  - Simpler syntax than ARM templates
  - Direct integration with Azure Resource Manager
- **Cons:**
  - Azure-specific (vendor lock-in)
  - Less familiar from education
  - No previous experience

### Alternative 2: Azure Portal (Manual)

- **Pros:**
  - No learning curve
  - Visual interface
  - Quick for one-off resources
- **Cons:**
  - Not reproducible
  - No version control
  - Error-prone manual clicking
  - Not suitable for educational project demonstrating IaC skills

### Alternative 3: Azure CLI Scripts

- **Pros:**
  - Simple scripting
  - Familiar command-line interface
- **Cons:**
  - Imperative rather than declarative
  - No state management
  - Harder to maintain complex infrastructure

## Decision

We will use **Terraform** for Infrastructure as Code.

**Rationale:**

- **Previous experience**: Used Terraform during education, familiar with HCL syntax and workflow
- **Personal preference**: Clean syntax and state management approach
- **Declarative approach**: Define desired state, Terraform handles the how
- **Version control**: Infrastructure changes tracked in Git alongside application code
- **Reproducibility**: Same configuration can recreate entire infrastructure
- **State management**: Terraform state tracking makes updates and changes safer
- **Multi-cloud potential**: While currently Azure-only, Terraform supports other providers if needed

**Current scope:**

- Azure Storage Account and Blob Container for restaurant images
- Planned expansion to App Service, databases, and full production infrastructure

**Note:** Terraform is not used at ESS Group (internship placement), but the IaC principles and Azure experience are transferable.

## Consequences

### Positive Consequences

- Infrastructure defined as code and version controlled
- Reproducible environments (dev, staging, production)
- Previous knowledge from education can be applied and expanded
- Clear documentation of infrastructure in code form
- Safe infrastructure changes with plan/apply workflow
- Automated provisioning reduces manual errors

### Negative Consequences

- Need to learn new Azure resources (App Service, managed databases)
- State management adds complexity (state file storage and locking)
- Cost optimization requires research into Azure pricing tiers for student projects
- Learning curve for team members unfamiliar with Terraform

### Neutral Consequences

- Infrastructure changes require Terraform knowledge
- Azure-specific resources still require understanding Azure documentation

## References

- [Terraform Documentation](https://www.terraform.io/docs)
