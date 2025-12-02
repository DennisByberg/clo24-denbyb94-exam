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
    condition     = can(regex("^(?!pg_)[a-zA-Z][a-zA-Z0-9-]{0,62}$", var.postgresql_admin_username))
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

variable "static_web_app_name" {
  description = "Static Web App name"
  type        = string
}

variable "google_oauth_client_id" {
  description = "Google OAuth client ID for Easy Auth"
  type        = string
  sensitive   = true
}

variable "google_oauth_client_secret" {
  description = "Google OAuth client secret for Easy Auth"
  type        = string
  sensitive   = true
}