FROM openjdk:8-jdk-alpine

VOLUME /tmp

EXPOSE 8080

ARG JAR_FILE=test.jar

ADD ${JAR_FILE} clickping-api.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/clickping-api.jar"]

