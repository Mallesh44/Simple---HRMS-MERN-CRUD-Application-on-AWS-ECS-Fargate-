variable "project_name" {
  default = "hrms"
}

variable "region" {
  default = "ap-south-1"
}
variable "aws_account_id" {
  description = "AWS Account ID"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "mongo_uri" {
  description = "MongoDB Atlas URI"
  type        = string
}
