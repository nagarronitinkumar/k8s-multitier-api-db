# Multi-tier Kubernetes Architecture: Node.js API + PostgreSQL on GKE

This assignment demonstrates the deployment of a multi-tier application on Google Cloud using:

- A Node.js-based **Service API Tier** (Service Tier)
- A PostgreSQL **Database Tier** (Data Tier)

---

## Repository Link
[GitHub Repository](https://github.com/nagarronitinkumar/k8s-multitier-api-db)

This repository includes:
- Node.js API source code
- Dockerfiles for API & PostgreSQL
- Kubernetes manifests (`Deployment`, `Service`, `Ingress`, `PVC`, `Secrets`, `ConfigMap`)
- Sample test data and scripts

## Docker Images
- [API Service Image](https://hub.docker.com/repository/docker/nagarronitinkumar/api-service/) 
- [PostgreSQL DB Image](https://hub.docker.com/repository/docker/nagarronitinkumar/database/)

## API Endpoint
Once deployed:
```
http://<YOUR_INGRESS_EXTERNAL_IP>/users
```
Replace `<YOUR_INGRESS_EXTERNAL_IP>` with the actual IP assigned by Ingress:
```bash
kubectl get ingress api-ingress
```

## Quick Start

### Prerequisites

- [Install Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
- Initialize and authenticate your GCP CLI:
  ```bash
  gcloud init
  gcloud auth login
  ```
- Set your default project and compute zone:
  ```bash
  gcloud config set project <your-project-id>
  gcloud config set compute/zone asia-south1-a
  ```
- Install necessary CLI components:
  ```bash
  gcloud components install kubectl
  ```

---

### Cluster Setup

```bash
# Create a GKE cluster with 3 nodes
gcloud container clusters create multi-tier-cluster --zone asia-south1-a --num-nodes=3
```

---

### Deploy Application

```bash
# Clone the repository
git clone https://github.com/nagarronitinkumar/k8s-multitier-api-db.git
cd k8s-multitier-api-db

# Step 1: Create Persistent Volume for PostgreSQL
kubectl apply -f k8s/db-pvc.yaml
kubectl get pvc

# Step 2: Create Kubernetes Secret for PostgreSQL credentials
kubectl apply -f k8s/postgres-secret.yaml
kubectl get secrets

# Step 3: Deploy PostgreSQL DB and Service
kubectl apply -f k8s/database-deployment.yaml
kubectl apply -f k8s/database-service.yaml
kubectl get deployments
kubectl get svc



# Step 4: Apply API ConfigMap
kubectl apply -f k8s/api-config.yaml
kubectl get configmap
kubectl describe configmap api-config

# Step 5: Deploy API Deployment and Service
kubectl apply -f k8s/api-service-deployment.yaml
kubectl apply -f k8s/api-service-service.yaml
kubectl get deployments
kubectl get svc

# Step 6: Deploy Ingress to expose the API
kubectl apply -f k8s/api-ingress.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml # Install NGINX Ingress Controller for External IP

# Step 7: Verify that all pods are running
kubectl get pods

# Step 8: Access the API via Ingress
kubectl get ingress api-ingress
kubectl get pods -n ingress-nginx
kubectl get svc -n ingress-nginx
```

---

## Features Implemented

- **Ingress** for external API access
- **Kubernetes Secret** for secure DB credentials
- **PersistentVolumeClaim** for DB storage
- **Rolling updates** enabled for API deployment
- **ConfigMap** for environment configuration
- **4 API replicas** for high availability
- **PostgreSQL** accessible only inside the cluster
- **Service-to-Service communication**, not Pod IPs

---

