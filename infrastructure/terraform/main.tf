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
    always_on = false
  }

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "GOOGLE_CLIENT_SECRET"                = var.google_oauth_client_secret
  }

  identity {
    type = "SystemAssigned"
  }

  auth_settings_v2 {
    auth_enabled           = true
    require_authentication = true
    unauthenticated_action = "RedirectToLoginPage"

    login {
      token_store_enabled = true
    }

    google_v2 {
      client_id                  = var.google_oauth_client_id
      client_secret_setting_name = "GOOGLE_CLIENT_SECRET"
      allowed_audiences          = []
      login_scopes               = ["openid", "profile", "email"]
    }
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

  tags = {
    managed-by  = var.managed_by_tag
    environment = var.environment
    project     = var.project
  }
}

# PostgreSQL Database
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

# Static Web App for Frontend
# Note: Location hardcoded to "West Europe" - Free tier only available in: West US 2, Central US, East US 2, West Europe, East Asia
resource "azurerm_static_web_app" "frontend" {
  name                = var.static_web_app_name
  resource_group_name = azurerm_resource_group.main.name
  location            = "West Europe"
  sku_tier            = "Free"
  sku_size            = "Free"

  tags = {
    managed-by  = var.managed_by_tag
    environment = var.environment
    project     = var.project
  }
}