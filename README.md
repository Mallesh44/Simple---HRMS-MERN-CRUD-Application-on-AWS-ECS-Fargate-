**Project Title :**
# HRMS MERN CRUD Application on AWS ECS (Fargate)

**Overview :**
This project demonstrates a production-ready MERN (MongoDB, Express, React, Node.js)
CRUD application deployed on AWS ECS Fargate using Terraform.
The application uses:
- React + Nginx (Frontend)
- Node.js + Express (Backend)
- MongoDB Atlas (Database)
- AWS Application Load Balancer
- Docker & Terraform

**Architecture:**

Browser
  |
  v
AWS Application Load Balancer
  |             |
  v             v
Frontend Task   Backend Task
(Nginx)         (Node.js)
                   |
                   v
              MongoDB Atlas

**Tech Stack**
- Frontend: React, Nginx
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Containers: Docker
- Orchestration: AWS ECS (Fargate)
- IaC: Terraform

**🚀 Deployment Flow**
1. Build Docker images for frontend and backend
2. Push images to Docker Hub
3. Provision AWS infrastructure using Terraform
4. Deploy ECS services behind an ALB
5. Access app via ALB DNS name

**Docker Images**
- Frontend: yourdockerhubusername/hrms-frontend
- Backend: yourdockerhubusername/hrms-backend

**⚙️ Environment Variables**
MONGO_URI = MongoDB Atlas connection string

**📁 Terraform Structure**
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


**Accessing the Application**
After deployment, Terraform outputs the ALB DNS name.
Example:
http://hrms-alb-xxxx.ap-south-1.elb.amazonaws.com

**🛡️ Security Best Practices**
- ALB is public, ECS tasks are private
- Security Groups restrict direct access to tasks
- Secrets are excluded from version control

