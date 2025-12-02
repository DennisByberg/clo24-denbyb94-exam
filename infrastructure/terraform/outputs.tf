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

output "app_service_url" {
  description = "URL of the App Service (backend)"
  value       = "https://${azurerm_linux_web_app.backend.default_hostname}"
}

output "app_service_name" {
  description = "Name of the App Service"
  value       = azurerm_linux_web_app.backend.name
}

output "postgresql_fqdn" {
  description = "Fully qualified domain name of PostgreSQL server"
  value       = azurerm_postgresql_flexible_server.main.fqdn
}

output "postgresql_connection_string" {
  description = "PostgreSQL connection string"
  value       = "postgresql://${var.postgresql_admin_username}:${var.postgresql_admin_password}@${azurerm_postgresql_flexible_server.main.fqdn}:5432/${var.postgresql_database_name}?sslmode=require"
  sensitive   = true
}

output "static_web_app_url" {
  description = "URL of the Static Web App (frontend)"
  value       = "https://${azurerm_static_web_app.frontend.default_host_name}"
}

output "static_web_app_deployment_token" {
  description = "Deployment token for Static Web App"
  value       = azurerm_static_web_app.frontend.api_key
  sensitive   = true
}