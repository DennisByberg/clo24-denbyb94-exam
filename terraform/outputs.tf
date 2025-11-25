# Storage Account outputs
output "storage_account_name" {
  description = "Name of the storage account"
  value       = module.storage.storage_account_name
}

output "storage_account_primary_blob_endpoint" {
  description = "Primary blob endpoint URL"
  value       = module.storage.storage_account_primary_blob_endpoint
}

output "restaurant_images_container_url" {
  description = "URL to restaurant images container"
  value       = module.storage.restaurant_images_container_url
}

output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}
