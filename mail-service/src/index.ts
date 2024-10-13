/* eslint-disable import/first */

import dotenv from "dotenv";
import { AddressInfo } from "net";

dotenv.config();

import app from "./app";
import { setLocals } from "./property";

import { connectToRabbitMQ, rabbitMQWrapperSetup } from "./config/server-config";

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

    if (!process.env.RABBITMQ_CONNECTION) {
        throw new Error("RabbmitMQ connection string is required");
    }
};

// for the ses service
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const envValidationForSES = () => {
    if (!process.env.SES_REGION) {
        throw new Error("SES_REGION is not defined");
    }

    if (!process.env.SES_ACCESS_KEY_ID) {
        throw new Error("SES_ACCESS_KEY_ID is not defined");
    }

    if (!process.env.SES_SECRET_ACCESS_KEY) {
        throw new Error("SES_SECRET_ACCESS_KEY is not defined");
    }

    if (!process.env.SES_EMAIL_ADDRESS) {
        throw new Error("SES_EMAIL is not defined");
    }
}

// for the nodemailer
const envValidationForNodemailer = () => {
    if (!process.env.NODEMAILER_EMAIL) {
        throw new Error("NODEMAILER_EMAIL is not defined");
    }
    
    if (!process.env.NODEMAILER_PASSWORD) {
        throw new Error("NODEMAILER_PASSWORD is not defined");
    }
}

const startTheServer = async () => {
    const server = app.listen(port, host, () => {
        const address = server.address() as AddressInfo;
        console.log(`Auth service is running on address: ${address.address} and port: ${address.port}`);
    });
};

// start the server
const start = () => {
    envValidation();
    envValidationForNodemailer();

    // connect to the rabbitMQ server
    connectToRabbitMQ()
    .then(async () => {
        try {
            await rabbitMQWrapperSetup();

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