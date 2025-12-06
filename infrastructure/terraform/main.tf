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

# App Service Plan for Backend
resource "azurerm_service_plan" "backend" {
  name                = var.app_service_plan_name
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location
  os_type             = "Linux"
  sku_name            = "B1"

  tags = {
    managed-by  = var.managed_by_tag
    environment = var.environment
    project     = var.project
  }
}

# App Service for Backend (Python 3.13)
resource "azurerm_linux_web_app" "backend" {
  name                = var.app_service_name
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location
  service_plan_id     = azurerm_service_plan.backend.id
  https_only          = true

  site_config {
    application_stack {
      python_version = "3.13"
    }
    always_on        = true
    app_command_line = "bash startup.sh"
  }

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "MOCK_AUTH"                           = "false"
    "NEXTAUTH_SECRET"                     = "@Microsoft.KeyVault(SecretUri=https://${azurerm_key_vault.main.name}.vault.azure.net/secrets/${azurerm_key_vault_secret.nextauth_secret.name})"
    "ALLOWED_ORIGINS"                     = "https://${var.frontend_app_service_name}.azurewebsites.net"
    "DATABASE_URL"                        = "@Microsoft.KeyVault(SecretUri=https://${azurerm_key_vault.main.name}.vault.azure.net/secrets/${azurerm_key_vault_secret.database_url.name})"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    managed-by  = var.managed_by_tag
    environment = var.environment
    project     = var.project
  }
}

# PostgreSQL Flexible Server
resource "azurerm_postgresql_flexible_server" "main" {
  name                   = var.postgresql_server_name
  resource_group_name    = azurerm_resource_group.main.name
  location               = var.location
  version                = "16"
  administrator_login    = var.postgresql_admin_username
  administrator_password = var.postgresql_admin_password
  storage_mb             = 32768
  sku_name               = "B_Standard_B1ms"
  # Explicitly enable public network access (required for B1 App Service to connect)
  # For production, use Private Endpoint with Premium tier App Service
  public_network_access_enabled = true

  backup_retention_days        = 7
  geo_redundant_backup_enabled = false # true for production

  lifecycle {
    ignore_changes = [zone]
  }

  tags = {
    managed-by  = var.managed_by_tag
    environment = var.environment
    project     = var.project
  }
}

# PostgreSQL Database
# Note: Database is created empty. Run Alembic migrations after deployment:
# - Manually: alembic upgrade head
# - Via GitHub Actions: Add migration step in deployment workflow
# - Or via App Service SSH: Connect and run migrations
resource "azurerm_postgresql_flexible_server_database" "main" {
  name      = var.postgresql_database_name
  server_id = azurerm_postgresql_flexible_server.main.id
  charset   = "UTF8"
  collation = "en_US.utf8"
}

# PostgreSQL Firewall Rule - Allow Azure services
# Note: 0.0.0.0 is a special Azure value that allows access from Azure services
# Security: This allows any Azure service to attempt connection. For production:
# - Use Private Endpoint/VNet Integration (requires Premium tier App Service)
# - Or restrict to specific App Service outbound IPs
# - Current B1 tier limits secure networking options
resource "azurerm_postgresql_flexible_server_firewall_rule" "app_service" {
  name             = "allow-app-service"
  server_id        = azurerm_postgresql_flexible_server.main.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# Azure Key Vault for secrets management
resource "azurerm_key_vault" "main" {
  name                       = var.key_vault_name
  resource_group_name        = azurerm_resource_group.main.name
  location                   = var.location
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  sku_name                   = "standard"
  soft_delete_retention_days = 7
  purge_protection_enabled   = false

  # Allow current user/service principal to manage secrets
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    secret_permissions = [
      "Get",
      "List",
      "Set",
      "Delete",
      "Purge",
      "Recover"
    ]
  }

  tags = {
    managed-by  = var.managed_by_tag
    environment = var.environment
    project     = var.project
  }
}

# Key Vault Secret: NextAuth Secret
resource "azurerm_key_vault_secret" "nextauth_secret" {
  name         = "nextauth-secret"
  value        = var.nextauth_secret
  key_vault_id = azurerm_key_vault.main.id

  depends_on = [azurerm_key_vault.main]
}

# Key Vault Secret: Database URL
resource "azurerm_key_vault_secret" "database_url" {
  name         = "database-url"
  value        = var.database_url
  key_vault_id = azurerm_key_vault.main.id

  depends_on = [azurerm_key_vault.main]
}

# Key Vault Access Policy for Backend App Service
resource "azurerm_key_vault_access_policy" "backend" {
  key_vault_id = azurerm_key_vault.main.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = azurerm_linux_web_app.backend.identity[0].principal_id

  secret_permissions = [
    "Get",
    "List"
  ]

  depends_on = [azurerm_linux_web_app.backend]
}

# Key Vault Access Policy for Frontend App Service
resource "azurerm_key_vault_access_policy" "frontend" {
  key_vault_id = azurerm_key_vault.main.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = azurerm_linux_web_app.frontend.identity[0].principal_id

  secret_permissions = [
    "Get",
    "List"
  ]

  depends_on = [azurerm_linux_web_app.frontend]
}

# Key Vault Access Policy for GitHub Actions Service Principal
resource "azurerm_key_vault_access_policy" "github_actions" {
  key_vault_id = azurerm_key_vault.main.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = var.github_actions_object_id

  secret_permissions = [
    "Get",
    "List"
  ]

  depends_on = [azurerm_key_vault.main]
}

# App Service Plan for Frontend
resource "azurerm_service_plan" "frontend" {
  name                = var.frontend_app_service_plan_name
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location
  os_type             = "Linux"
  sku_name            = "B1"

  tags = {
    managed-by  = var.managed_by_tag
    environment = var.environment
    project     = var.project
  }
}

# App Service for Frontend (Node.js)
resource "azurerm_linux_web_app" "frontend" {
  name                = var.frontend_app_service_name
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location
  service_plan_id     = azurerm_service_plan.frontend.id
  https_only          = true

  site_config {
    application_stack {
      node_version = "20-lts"
    }
    always_on = true
  }

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "NEXTAUTH_SECRET"                     = "@Microsoft.KeyVault(SecretUri=https://${azurerm_key_vault.main.name}.vault.azure.net/secrets/${azurerm_key_vault_secret.nextauth_secret.name})"
    "NEXTAUTH_URL"                        = "https://${var.frontend_app_service_name}.azurewebsites.net"
    "NEXT_PUBLIC_API_URL"                 = "https://${var.app_service_name}.azurewebsites.net"
    "NEXT_PUBLIC_AZURE_BLOB_URL"          = "${azurerm_storage_account.images.primary_blob_endpoint}restaurant-images/"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    managed-by  = var.managed_by_tag
    environment = var.environment
    project     = var.project
  }
}