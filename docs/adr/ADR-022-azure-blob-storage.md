# ADR-022: Azure Blob Storage for Restaurant Images

**Status:** Accepted  
**Date:** 2025-11-29  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The booking platform needs a solution for storing and serving restaurant images. Where should we store image files in a scalable and cost-effective way?

## Decision Drivers

- Need to store potentially many restaurant images
- GitHub repository storage limitations
- Already using Azure ecosystem for entire project
- Scalability for growing number of images
- Cost considerations for student project

## Considered Alternatives

### Alternative 1: GitHub Repository Storage

- **Pros:**
  - Simple - files committed with code
  - No additional service needed
  - Version controlled
- **Cons:**
  - Takes up too much repository space
  - Not designed for binary files
  - Poor performance for serving images
  - Makes git operations slow with many images
  - Not scalable

## Decision

We will use **Azure Blob Storage** for storing restaurant images.

**Rationale:**

- **Repository size**: GitHub repository would grow too large with many images
- **Azure ecosystem**: Already using Azure for App Service and other infrastructure
- **Scalability**: Can handle many images without performance degradation
- **Cost-effective**: Pay only for storage used, reasonable pricing for student project
- **Terraform integration**: Can provision and manage with existing Terraform setup
- **Performance**: Designed specifically for serving binary files like images
- **HTTP access**: Direct HTTP URLs for serving images to frontend

**Note:** The decision was straightforward - using Azure Blob Storage keeps everything in the Azure ecosystem and solves the repository size problem.

## Consequences

### Positive Consequences

- Images don't bloat Git repository
- Scalable storage for growing number of restaurant images
- Fast image serving with HTTP URLs
- Integrated with Azure ecosystem (authentication, monitoring)
- Managed by Terraform alongside other infrastructure
- Cost-effective for student project scale

### Negative Consequences

- Additional Azure service to manage and monitor
- Cost implications (though expected to be minimal)
- Vendor lock-in to Azure ecosystem
- Need to handle image upload and URL management in application code

### Neutral Consequences

- Images stored separately from code (deployment consideration)
- Need to manage blob container permissions and access

## References

- [Azure Blob Storage Documentation](https://learn.microsoft.com/en-us/azure/storage/blobs/)
