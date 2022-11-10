# Repos Api

# Table of content:

- [How To Run The Api](#How-To-Run-The-Api)
- [Swagger](#Swagger)
- [Integration Tests](#Integration-Tests)
- [Unit Tests](#unit-Tests)

# How To Run The Api

1- rename **.env.sample** to **.env** using

    cp .env.sample .env

### _Note that for this task only i provided an accessToken to avoid github rate limit which will expire i will revoke it after the task_

2- run docker-compose command to start the api using:

    docker-compose up

- which will run the application in development mode with a watcher for file changes

---

# Swagger

1- to access swagger go to [swagger-url](http:localhost:8080/api)

2- press try it out to try the repos endpoint

3- fill needed data and press execute

---

# Integration Tests

1- to run integration Tests:

    docker exec github-repos-api npm run test:e2e

### **Note that for first test it may fail as i'm expecting my personal current repos**

---

# Unit Tests

1- the main functionality was covered in unit tests
2- to run tests:

    docker exec github-repos-api npm run test

3- to check the coverage report run:

    docker exec github-repos-api npm run test:cov
