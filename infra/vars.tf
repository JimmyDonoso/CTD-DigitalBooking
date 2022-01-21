variable "region" {
  default = "sa-east-1"
}

variable "profile" {
  description = "AWS credentials profile you want to use"
  default     = "default"
}

variable "ami" {
  type = map(any)

  default = {
    "sa-east-1" = "ami-0e66f5495b4efdd0f"
  }
}
