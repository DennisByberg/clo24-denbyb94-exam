terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.5"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location

  tags = {
    managed-by  = var.managed_by_tag
    environment = var.environment
    project     = var.project
  }
}

resource "azurerm_storage_account" "images" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.main.name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    managed-by  = var.managed_by_tag
    environment = var.environment
    project     = var.project
  }
}

resource "azurerm_storage_container" "restaurant_images" {
  name                  = "restaurant-images"
  storage_account_id    = azurerm_storage_account.images.id
  container_access_type = "blob"

  metadata = {
    managedby   = var.managed_by_tag
    environment = var.environment
    project     = var.project
  }
}

data "azurerm_client_config" "current" {}

resource "azurerm_role_assignment" "blob_contributor" {
  scope                = azurerm_storage_account.images.id
  role_definition_name = "Storage Blob Data Contributor"
  principal_id         = data.azurerm_client_config.current.object_id
}

# Upload restaurant images to the storage container
# Runs once when resource is created; re-upload manually if needed
resource "null_resource" "upload_images" {
  depends_on = [
    azurerm_storage_container.restaurant_images,
    azurerm_role_assignment.blob_contributor
  ]

  provisioner "local-exec" {
    command = "bash ${path.module}/../scripts/${var.restaurant_images_upload_script}"
  }
}