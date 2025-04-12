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
          image = "gcr.io/${var.project_id}/${var.image_name}"
          ports {
            container_port = 3000
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