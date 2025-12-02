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

No other alternatives were seriously considered. Azure Blob Storage was the obvious choice given:

- Already using Azure App Service and infrastructure
- Need to avoid bloating Git repository with binary files
- Want to keep everything in Azure ecosystem

For reference, other storage approaches exist but were not evaluated:

### GitHub Repository Storage

Would bloat repository with binary files - not designed for image storage at scale.

### AWS S3 or Google Cloud Storage

Third-party cloud storage - unnecessary when already using Azure infrastructure.

### Database Storage

Would bloat PostgreSQL database - databases not designed for binary file storage.

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
