/* eslint-disable import/first */
import dotenv from "dotenv";
import { AddressInfo } from "net";

dotenv.config();

import app from "./app";
import { setLocals } from "./property";

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

};

const startTheServer = async () => {
    const server = app.listen(port, host, () => {
        const address = server.address() as AddressInfo;
        console.log(`CDN service is running on address: ${address.address} and port: ${address.port}`);
    });
};

// start the server
const start = () => {
    envValidation();
    
    try {
        startTheServer();
    } catch (error) {
        console.error("Error occured while starting the server: ", error);
    }

};

start();
