FROM openjdk:11-jre-slim
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
EXPOSE 8080

# docker build -t backendbookingdh .

# docker login luischdu/backendbookingdh
# docker tag 323dbba169e0 luischdu/backendbookingdh:1.1
# docker push luischdu/backendbookingdh:1.1

