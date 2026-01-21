# HRMS — MERN CRUD Application on AWS ECS (Fargate)

A production-ready example MERN (MongoDB, Express, React, Node.js) CRUD application deployed on AWS ECS (Fargate) and provisioned with Terraform. This repo demonstrates building container images for frontend and backend, pushing to a registry, and running services behind an Application Load Balancer.

- Frontend: React served by Nginx
- Backend: Node.js + Express
- Database: MongoDB Atlas (managed)
- Orchestration: AWS ECS (Fargate)
- Infrastructure as Code: Terraform
- Container registry: Docker Hub (or ECR)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Build & Push Docker Images](#build--push-docker-images)
- [Terraform: Provision Infrastructure](#terraform-provision-infrastructure)
- [Environment Variables / Secrets](#environment-variables--secrets)
- [Terraform Project Structure](#terraform-project-structure)
- [Accessing the Application](#accessing-the-application)
- [Security Best Practices](#security-best-practices)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview
This repository provides a full-stack example that can be used to learn and replicate a production-oriented deployment pattern: containerize frontend and backend, push images, provision AWS networking and ECS resources with Terraform, and run services behind an ALB.

## Features
- CRUD operations via REST API
- React single-page application (served by Nginx)
- Stateless backend suitable for horizontal scaling
- Secure database connectivity with MongoDB Atlas
- Terraform-managed AWS resources (VPC, subnets, security groups, ALB, ECS cluster, task definitions, services, IAM roles)

## Architecture
Browser
   |
   v
AWS Application Load Balancer (ALB)
   |                     |
   v                     v
Frontend Task         Backend Task
(Nginx + React)       (Node.js + Express)
                          |
                          v
                    MongoDB Atlas

## Tech Stack
- Frontend: React, Nginx
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Containers: Docker
- Orchestration: AWS ECS (Fargate)
- IaC: Terraform
- CI/CD: (optional) GitHub Actions / other pipelines

## Prerequisites
- Docker (for building images)
- Docker Hub account (or AWS ECR)
- Terraform v1.0+ (or as pinned in repo)
- AWS account + credentials with permissions to create VPCs, ECS, ALB, IAM, etc.
- MongoDB Atlas cluster + connection string
- Node.js (for local dev)

## Local Development
Run backend locally:
1. Install dependencies
   - cd backend
   - npm install
2. Add a `.env` file with required variables (see [Environment Variables](#environment-variables--secrets))
3. Start server
   - npm run dev (or node index.js)

Run frontend locally:
1. cd frontend
2. npm install
3. npm start

Note: Local dev uses your local Node server and React dev server. Containerized production builds are separate and use Nginx to serve static assets.

## Build & Push Docker Images
Replace `yourdockerhubusername` with your Docker Hub username (or use ECR).

Build frontend:
- docker build -t yourdockerhubusername/hrms-frontend:latest ./frontend
- docker push yourdockerhubusername/hrms-frontend:latest

Build backend:
- docker build -t yourdockerhubusername/hrms-backend:latest ./backend
- docker push yourdockerhubusername/hrms-backend:latest

If using AWS ECR, create a repository and push the images following ECR auth instructions.

## Terraform: Provision Infrastructure
1. Set required variables (see `terraform/variables.tf`)
2. Initialize Terraform
   - cd terraform
   - terraform init
3. Plan
   - terraform plan -var-file="terraform.tfvars"
4. Apply
   - terraform apply -var-file="terraform.tfvars" -auto-approve

Terraform will create networking, load balancer, ECS cluster, task definitions, services, and outputs (including the ALB DNS). Ensure your container images are accessible (public or in a registry with proper auth).

## Environment Variables / Secrets
Keep secrets out of version control. Use a secrets manager (AWS Secrets Manager or Parameter Store) or the platform’s secure environment variables.

Example variables:
- MONGO_URI="mongodb+srv://<user>:<password>@cluster0.mongodb.net/hrms?retryWrites=true&w=majority"
- FRONTEND_IMAGE="yourdockerhubusername/hrms-frontend:latest"
- BACKEND_IMAGE="yourdockerhubusername/hrms-backend:latest"
- BACKEND_PORT=4000
- NODE_ENV=production

In Terraform, prefer injecting secrets via ACM/SSM/Secrets Manager and referencing ARNs rather than hard-coding values.

## Terraform Project Structure
terraform/
├── alb.tf                # ALB, listeners, target groups
├── ecs.tf                # ECS cluster and related resources
├── ecs-service.tf        # ECS services and service discovery
├── iam.tf                # IAM roles and policies for tasks
├── main.tf               # Provider and high-level resources
├── outputs.tf            # Terraform outputs (ALB DNS, security group IDs)
├── providers.tf          # Provider configuration (AWS)
├── security-group.tf     # Security Group definitions
├── task-definition.tf    # ECS task definitions and container definitions
├── variables.tf          # Input variables
└── terraform.tfvars      # (Example) variable values — do NOT commit secrets

## Accessing the Application
After Terraform completes, get the ALB DNS name from the output:

Example:
http://hrms-alb-xxxx.ap-south-1.elb.amazonaws.com

The ALB routes traffic to frontend and backend services as configured.

## Security Best Practices
- Do not commit credentials or `.env` files into the repo.
- Use least privilege IAM roles for ECS tasks.
- Run ECS tasks in private subnets with NAT for outbound access when possible.
- Restrict load balancer access with security groups and (optionally) WAF.
- Use HTTPS: terminate TLS at the ALB and configure certificates via ACM.
- Store DB credentials in AWS Secrets Manager or MongoDB Atlas Secrets.
- Regularly rotate credentials and monitor logs.

## Troubleshooting
- Container not starting: check ECS task logs (CloudWatch) and container command/entrypoint.
- 502/5xx from ALB: verify target group health checks and container port mappings.
- Database connectivity errors: confirm MONGO_URI, Atlas IP access list, and network egress from tasks.
- Terraform errors: run `terraform plan` and inspect diffs; ensure providers and credentials are configured.

## CI/CD Suggestions
- Build images in CI, push to a registry, and then run a Terraform apply or an ECS rolling update.
- Use image tags (semver or commit SHA) to track releases.
- Automate secrets injection via the cloud provider’s secret manager.

## Contributing
Contributions welcome. Suggested workflow:
1. Fork repo
2. Create a feature branch
3. Open PR with description and testing notes
4. Keep secrets out of PRs

