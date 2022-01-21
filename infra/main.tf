provider "aws" {
  profile = var.profile
  region  = var.region
}

resource "aws_instance" "frontend" {
  ami           = lookup(var.ami, var.region)
  instance_type = "t3.micro"

  #VPC
  subnet_id = aws_subnet.subnet-front.id

  #Security Group
  vpc_security_group_ids = [aws_security_group.test-sg.id]

  key_name = aws_key_pair.kp.key_name
  tags = {
    Name = "TestFront"
  }
}

resource "aws_instance" "backend" {
  ami           = lookup(var.ami, var.region)
  instance_type = "t3.micro"

  #VPC
  subnet_id = aws_subnet.subnet-back.id

  #Secrity Group
  vpc_security_group_ids = [aws_security_group.test-sg.id]

  key_name = aws_key_pair.kp.key_name
  tags = {
    Name = "TestBack"
  }
}

resource "aws_db_instance" "db" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "mysql"
  engine_version       = "8.0.23"
  instance_class       = "db.t2.micro"
  name                 = "dh"
  username             = "devsclan"
  password             = "devsclanadmin"
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true
  db_subnet_group_name = aws_db_subnet_group.db-subnet.name

  identifier = "test-db"

  vpc_security_group_ids = [aws_security_group.test-sg.id]

  publicly_accessible = "true" # No debería ser público en producción
}

resource "aws_db_subnet_group" "db-subnet" {
  name       = "testdb-subnet"
  subnet_ids = [aws_subnet.subnet-front.id, aws_subnet.subnet-back.id]

  tags = {
    Name = "Test DB subnet group"
  }
}

resource "aws_s3_bucket" "devsclan-test-s3" {
  bucket = "devsclan-test-s3"
  acl    = "private"
}

resource "aws_s3_bucket_object" "object" {
  for_each = fileset("s3/Assets/", "*/*") # filest( el path , los archivos que se guardarán en key = each.value )
  bucket   = aws_s3_bucket.devsclan-test-s3.id
  key      = each.value
  source   = "s3/Assets/${each.value}" # El path de cada archivo que necesita AWS para subirlos
  acl      = "public-read"
}

# create a instance for frontend and backend - docker

data "template_file" "user_data_client" {
  template = file("userdataclient.yml")
}
data "template_file" "user_data_server" {
  template = file("userdataserver.yml")
}

resource "aws_instance" "backend-prod" {
  ami                    = lookup(var.ami, var.region)
  instance_type          = "t3.micro"
  key_name               = aws_key_pair.kp.key_name
  subnet_id              = aws_subnet.subnet-back.id
  user_data              = data.template_file.user_data_server.rendered
  vpc_security_group_ids = [aws_security_group.test-sg.id]
  tags = {
    Name = "devsClan-backend"
  }
}

resource "aws_instance" "frontend-prod" {
  ami                    = lookup(var.ami, var.region)
  instance_type          = "t3.micro"
  key_name               = aws_key_pair.kp.key_name
  subnet_id              = aws_subnet.subnet-front.id
  vpc_security_group_ids = [aws_security_group.test-sg.id]
  user_data              = data.template_file.user_data_client.rendered
  tags = {
    Name = "devsClan-frontend"
  }
}