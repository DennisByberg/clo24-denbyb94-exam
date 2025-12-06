variable "subscription_id" {
  description = "Azure subscription ID"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
}

variable "storage_account_name" {
  description = "Storage account name"
  type        = string
}

variable "managed_by_tag" {
  description = "Resource management identifier"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "project" {
  description = "Project name"
  type        = string
}

variable "restaurant_images_upload_script" {
  description = "Restaurant images upload script name"
  type        = string

  # Prevent command injection by validating script name format
  validation {
    condition     = can(regex("^[a-zA-Z0-9._-]+\\.sh$", var.restaurant_images_upload_script))
    error_message = "Script name must be alphanumeric with dots, dashes, or underscores, and end with .sh"
  }
}

variable "app_service_plan_name" {
  description = "App Service Plan name"
  type        = string
}

variable "app_service_name" {
  description = "App Service name"
  type        = string
}

variable "postgresql_server_name" {
  description = "PostgreSQL Flexible Server name"
  type        = string
}

variable "postgresql_admin_username" {
  description = "PostgreSQL administrator username"
  type        = string
  sensitive   = true

  validation {
    condition = (
      can(regex("^[a-zA-Z][a-zA-Z0-9-]{0,62}$", var.postgresql_admin_username)) &&
      !can(regex("^pg_", var.postgresql_admin_username))
    )
    error_message = "Username must be 1-63 characters, start with a letter, contain only alphanumeric characters and hyphens, and cannot start with 'pg_'"
  }
}

variable "postgresql_admin_password" {
  description = "PostgreSQL administrator password"
  type        = string
  sensitive   = true

  validation {
    condition     = can(regex("^.{8,128}$", var.postgresql_admin_password))
    error_message = "Password must be between 8 and 128 characters"
  }
}

variable "postgresql_database_name" {
  description = "PostgreSQL database name"
  type        = string
}

variable "frontend_app_service_plan_name" {
  description = "Frontend App Service Plan name"
  type        = string
}

variable "frontend_app_service_name" {
  description = "Frontend App Service name"
  type        = string
}

variable "key_vault_name" {
  description = "Azure Key Vault name"
  type        = string

  validation {
    condition     = can(regex("^[a-zA-Z][a-zA-Z0-9-]{1,22}[a-zA-Z0-9]$", var.key_vault_name))
    error_message = "Key Vault name must be 3-24 characters, start with a letter, contain only alphanumeric characters and hyphens, and end with alphanumeric"
  }
}

variable "nextauth_secret" {
  description = "NextAuth.js secret for session encryption"
  type        = string
  sensitive   = true

  validation {
    condition     = can(regex("^.{32,}$", var.nextauth_secret))
    error_message = "NextAuth secret must be at least 32 characters"
  }
}

variable "database_url" {
  description = "PostgreSQL database connection string"
  type        = string
  sensitive   = true

  validation {
    condition     = can(regex("^postgresql://", var.database_url))
    error_message = "Database URL must be a valid PostgreSQL connection string starting with postgresql://"
  }
}

variable "github_actions_object_id" {
  description = "Object ID of the GitHub Actions Service Principal for Key Vault access"
  type        = string

  validation {
    condition     = can(regex("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", var.github_actions_object_id))
    error_message = "GitHub Actions object ID must be a valid UUID"
  }
}