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