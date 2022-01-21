resource "aws_internet_gateway" "test-igw" {
  vpc_id = aws_vpc.vpc.id
  tags = {
    Name = "test-igw"
  }
}

resource "aws_route_table" "test-public-crt" {
  vpc_id = aws_vpc.vpc.id

  route {
    //associated subnet can reach everywhere
    cidr_block = "0.0.0.0/0" //CRT uses this IGW to reach internet
    gateway_id = aws_internet_gateway.test-igw.id
  }

  tags = {
    Name = "test-public-crt"
  }
}

resource "aws_route_table_association" "test-crta-public-subnet-front" {
  subnet_id      = aws_subnet.subnet-front.id
  route_table_id = aws_route_table.test-public-crt.id
}

resource "aws_route_table_association" "test-crta-public-subnet-back" {
  subnet_id      = aws_subnet.subnet-back.id
  route_table_id = aws_route_table.test-public-crt.id
}

resource "aws_security_group" "test-sg" {
  name        = "test-sg"
  description = "Allow everything. Only for testing."
  vpc_id      = aws_vpc.vpc.id

  ingress = [
    {
      from_port        = 0
      to_port          = 0
      protocol         = "-1"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
      description      = null
      prefix_list_ids  = null
      security_groups  = null
      self             = null
    }
  ]

  egress = [
    {
      from_port        = 0
      to_port          = 0
      protocol         = "-1"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
      description      = null
      prefix_list_ids  = null
      security_groups  = null
      self             = null
    }
  ]

  tags = {
    Name = "test-sg"
  }
}
