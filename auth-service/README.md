# auth-service

Handling Users and Authentication

### swagger url

http://sltc.app.promentor.local:8081/api/v1/auth/api-docs

### configure the service

-   create a `.env` file in the root of the derectory
-   replace the required properties of the .env values

```
HOST=sltc.app.promentor.local
PORT=8081
SERVICE_NAME=pro-mentor-auth-service

KEYCLOAK_CLIENT_ID=pro-mentor-auth-service
SLTC_CLIENT_SECRET=r0*********************dv

MONGODB_URI=mongodb://root:root@localhost:27017/auth-service?authSource=admin

RABBITMQ_CONNECTION=amqp://admin:admin@localhost:5672

PG_USER=keycloak
PG_PASSWORD=keycloak
PG_DATABASE=keycloak
PG_HOST=localhost
PG_PORT=5432
```

### run service

```
npm run dev_window
```

### CI/CD

<img src="https://github.com/Pro-Mentor/auth-service/blob/main/assets/Auth_Deployment.drawio.png" alt="CI/CD diagram" title="CI/CD Diagram">
