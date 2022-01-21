resource "tls_private_key" "pk" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "kp" {
  key_name   = "testKey" # Create a "testKey" to AWS!!
  public_key = tls_private_key.pk.public_key_openssh

  provisioner "local-exec" { # Create a "testKey.pem" to your computer!!
    command     = "echo '${tls_private_key.pk.private_key_pem}' > ./testKey.pem"
    interpreter = ["bash", "-c"] # Permite que pueda guardarse la testKey.pem ejecutando terraform desde Windows (con GitBash)
  }
}
