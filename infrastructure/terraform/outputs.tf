output "storage_account_name" {
  description = "Name of the storage account"
  value       = azurerm_storage_account.images.name
}

output "storage_account_primary_blob_endpoint" {
  description = "Primary blob endpoint URL"
  value       = azurerm_storage_account.images.primary_blob_endpoint
}

output "restaurant_images_container_url" {
  description = "URL to restaurant images container"
  value       = "${azurerm_storage_account.images.primary_blob_endpoint}${azurerm_storage_container.restaurant_images.name}/"
}

output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}
