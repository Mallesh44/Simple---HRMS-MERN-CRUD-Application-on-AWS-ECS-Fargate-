HRMS MERN CRUD Application on AWS ECS (Fargate)
📌 Overview

This project demonstrates a production-ready MERN (MongoDB, Express, React, Node.js) CRUD application deployed on AWS ECS (Fargate) using Terraform.

The application consists of:

React frontend served via Nginx

Node.js & Express backend

MongoDB Atlas as the database

AWS Application Load Balancer

Containerized services using Docker

Infrastructure provisioning using Terraform

🏗️ Architecture
Browser
   |
   v
AWS Application Load Balancer
   |                     |
   v                     v
Frontend Task         Backend Task
(Nginx + React)       (Node.js + Express)
                          |
                          v
                    MongoDB Atlas

🧰 Tech Stack

Frontend: React, Nginx

Backend: Node.js, Express

Database: MongoDB Atlas

Containers: Docker

Orchestration: AWS ECS (Fargate)

Infrastructure as Code: Terraform

🚀 Deployment Flow

Build Docker images for frontend and backend

Push Docker images to Docker Hub

Provision AWS infrastructure using Terraform

Deploy ECS services behind an Application Load Balancer

Access the application via the ALB DNS name

🐳 Docker Images

Frontend: yourdockerhubusername/hrms-frontend

Backend: yourdockerhubusername/hrms-backend

⚙️ Environment Variables
MONGO_URI=<MongoDB Atlas connection string>

📁 Terraform Project Structure
terraform/
├── alb.tf
├── ecs.tf
├── ecs-service.tf
├── iam.tf
├── main.tf
├── outputs.tf
├── providers.tf
├── security-group.tf
├── task-definition.tf
├── variables.tf

🌐 Accessing the Application

After successful deployment, Terraform outputs the Application Load Balancer DNS name.

Example:

http://hrms-alb-xxxx.ap-south-1.elb.amazonaws.com

🛡️ Security Best Practices

Application Load Balancer is publicly accessible

ECS tasks run in private subnets

Security Groups restrict direct access to ECS tasks

Sensitive data and secrets are excluded from version control
