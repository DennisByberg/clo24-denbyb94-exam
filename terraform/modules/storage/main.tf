# Storage Account for all ESS images (restaurants, spa, events)
resource "azurerm_storage_account" "images" {
  name                     = var.storage_account_name
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

# Blob Container for restaurant images
resource "azurerm_storage_container" "restaurant_images" {
  name                  = "restaurant-images"
  storage_account_name  = azurerm_storage_account.images.name
  container_access_type = "blob" # Public read access for images
}

# Get current user's Object ID
data "azurerm_client_config" "current" {}

# Grant current user Storage Blob Data Contributor role
resource "azurerm_role_assignment" "blob_contributor" {
  scope                = azurerm_storage_account.images.id
  role_definition_name = "Storage Blob Data Contributor"
  principal_id         = data.azurerm_client_config.current.object_id
}
