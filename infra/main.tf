provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_cloud_run_service" "backend" {
    name = "kratos-backend"
    location = var.region  

    template {
      spec {
        containers {
          image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repo_name}/${var.image_name}:latest"
          ports {
            container_port = 3000
          }

          env {
            name = "MONGODB_URI"
            value = var.mongodb_uri
          }
          env {
            name = "FIREBASE_SERVICE_ACCOUNT"
            value = var.firebase_service_account
          }
          env {
            name = "FIREBASE_API_KEY"
            value = var.firebase_api_key
          }
          env {
            name = "FIREBASE_AUTH_DOMAIN"
            value = var.firebase_auth_domain
          }
          env {
            name = "FIREBASE_PROJECT_ID"
            value = var.firebase_project_id
          }
          env {
            name = "FIREBASE_STORAGE_BUCKET"
            value = var.firebase_storage_bucket
          }
          env {
            name = "FIREBASE_MESSAGING_SENDER_ID"
            value = var.firebase_messaging_sender_id
          }
          env {
            name = "FIREBASE_APP_ID"
            value = var.firebase_app_id
          }
        }
      }
    }

    traffic {
      percent = 100
      latest_revision = true
    }
}

resource "google_cloud_run_service_iam_member" "all_users" {
    service = google_cloud_run_service.backend.name
    location = var.region
    role = "roles/run.invoker"
    member = "allUsers"
}