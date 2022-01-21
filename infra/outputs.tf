output "public_ip_backend" {
  value = aws_instance.backend-prod.public_ip
}
output "public_ip_frontend" {
  value = aws_instance.frontend-prod.public_ip
}