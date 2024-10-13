/* eslint-disable import/first */
import dotenv from "dotenv";
import { AddressInfo } from "net";

dotenv.config();

import app from "./app";
import { setLocals } from "./property";

import { connectToMongoDB, connectToPostgreSQL, connectToRabbitMQ, rabbitMQWrapperSetup } from "./config/server-config";

setLocals(app);

const port: number = (process.env.PORT || app.locals.port) as number;
const host: string = (process.env.HOST || app.locals.host) as string;

// validate the environment variables
const envValidation = () => {
    if (!port) {
        throw new Error("The port must be defined");
    }

    if (!host) {
        throw new Error("The host must be defined");
    }

    if (!process.env.SERVICE_NAME) {
        throw new Error("The service name must be defined");
    }

    if (!process.env.KEYCLOAK_CLIENT_ID) {
        throw new Error("The keycloak client id must be defined");
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("The mongodb uri must be defined");
    }

    if (!process.env.RABBITMQ_CONNECTION) {
        throw new Error("RabbmitMQ connection string is required");
    }

    if (!process.env.PG_USER) {
        throw new Error("The postgresql user must be defined");
    }

    if (!process.env.PG_HOST) {
        throw new Error("The postgresql host must be defined");
    }

    if (!process.env.PG_DATABASE) {
        throw new Error("The postgresql database must be defined");
    }

    if (!process.env.PG_PASSWORD) {
        throw new Error("The postgresql password must be defined");
    }

    if (!process.env.PG_PORT) {
        throw new Error("The postgresql port must be defined");
    }
};

const startTheServer = async () => {
    const server = app.listen(port, host, () => {
        const address = server.address() as AddressInfo;
        console.log(`Auth service is running on address: ${address.address} and port: ${address.port}`);
    });
};

// start the server
const start = () => {
    envValidation();

    // connect to the rabbitMQ server
    connectToRabbitMQ()
        .then(async () => {
            try {
                await rabbitMQWrapperSetup();

                await connectToMongoDB();

                await connectToPostgreSQL();

                startTheServer();
            } catch (error) {
                console.error("Error occured while starting the server: ", error);
            }
        })
        .catch((err) => {
            console.error("Could not connect to the RabbmitMQ server: ", err);
        });
};

start();
