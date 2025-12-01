# Infrastructure Documentation

![](../images/ace-group-logo.png)

Developer guide for managing infrastructure resources. Contains Terraform configurations for Azure resources and utility scripts.

See the main **[README](../README.md)** for complete tech stack and ADR documentation.

## 📁 Infrastructure Structure

**Note:** _Only the most important directories and files are listed below._

```bash
infrastructure/
├── scripts/              # Utility scripts for resource management
├── terraform/            # Terraform configuration files
│
└── README.md             # This file
```

## ☁️ Azure Resources

The Terraform configuration provisions the following Azure resources:

- **Resource Group** - Container for all project resources
- **Storage Account** - Blob storage for restaurant images
- **Storage Container** - Public blob container for restaurant images

## 🚀 Quick Start

**Prerequisites:**

- Azure CLI installed and authenticated
- Terraform installed

From `clo24-denbyb94-exam/infrastructure/terraform`:  
**Initialize Terraform:**

```bash
terraform init
```

From `clo24-denbyb94-exam/infrastructure/terraform`:  
**Plan infrastructure changes:**

```bash
terraform plan
```

From `clo24-denbyb94-exam/infrastructure/terraform`:  
**Apply infrastructure changes:**

```bash
terraform apply
```

## 🛠️ Utility Scripts

From `clo24-denbyb94-exam/infrastructure/scripts`:  
**Upload restaurant images to Azure Storage:**

```bash
./upload-restaurant-images.sh
```

From `clo24-denbyb94-exam/infrastructure/scripts`:  
**Delete restaurant images from Azure Storage:**

```bash
./delete-restaurant-images.sh
```

## ⚙️ Configuration

Terraform variables are configured in `terraform/terraform.tfvars`. See `terraform/variables.tf` for available configuration options.
