resource "aws_ecs_task_definition" "this" {
  family                   = "${var.project_name}-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "1024"
  memory                   = "2048"

  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn      = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name      = "backend"
      image = "mallesh44/hrms-backend:latest"
      essential = true

      portMappings = [
        {
          containerPort = 5000
        }
      ]

      environment = [
        {
          name  = "MONGO_URI"
          value = var.mongo_uri
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/ecs/hrms"
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "backend"
        }
      }
    },

    {
      name      = "frontend"
      image = "mallesh44/hrms-frontend:latest"

      essential = false

      portMappings = [
        {
          containerPort = 80
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/ecs/hrms"
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "frontend"
        }
      }
    }
  ])
}
