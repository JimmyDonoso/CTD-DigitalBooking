resource "aws_vpc" "vpc" {
  cidr_block       = "10.0.0.0/24"
  instance_tenancy = "default"

  enable_dns_hostnames = "true" # Agregado para que la BD pueda setearse en pública

  tags = {
    Name = "testvpc"
  }
}


resource "aws_subnet" "subnet-front" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = "10.0.0.0/26"
  availability_zone       = "sa-east-1a"
  map_public_ip_on_launch = "true"

  tags = {
    Name = "testsubnet-front"
  }

}

resource "aws_subnet" "subnet-back" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = "10.0.0.64/26"
  availability_zone       = "sa-east-1c"
  map_public_ip_on_launch = "true" ##Esto no debería estar en la subnet del back en producción

  tags = {
    Name = "testsubnet-back"
  }

}

