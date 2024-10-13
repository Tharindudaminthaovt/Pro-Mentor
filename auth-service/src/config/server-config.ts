import { rabbitMQWrapper, rabbitMQPublihserChannelWrapper, pgConnectionWrapper } from "@promentor-app/shared-lib";
import mongoose from "mongoose";

import UasrTemparyPasswordCreatedListener from "../events/listeners/user-tempary-password-created-listener";

/**
 * this function is used to connect to rabbitMQ
 * @returns {Promise<void>}
 */
const connectToRabbitMQ: () => Promise<void> = async () => {
    return rabbitMQWrapper.connect(process.env.RABBITMQ_CONNECTION as string, process.env.SERVICE_NAME as string);
};

/**
 * this function is used to add listeners to the rabbitMQ
 * @returns {void}
 */
const addListeners = () => {
    // new UasrTemparyPasswordCreatedListener(rabbitMQWrapper.conn).listen();
};

/**
 * this function is used to handle the server close event
 * @returns {void}
 */
const serverCloseHandler = () => {
    rabbitMQWrapper.conn.close();
    rabbitMQPublihserChannelWrapper.publisherChannel.close();
};

/**
 * this function is used to setup the rabbitMQ wrapper
 * @returns {Promise<void>}
 */
const rabbitMQWrapperSetup = async () => {
    // handle the rabbitMQ connection close event
    rabbitMQWrapper.conn.on("close", () => {
        console.info("rabbmitMQ connection closed. exit prom process");
        process.exit();
    });

    // add listeners to the rabbitMQ
    addListeners();

    // connect to the rabbitMQ publisher channel
    try {
        await rabbitMQPublihserChannelWrapper.connect(rabbitMQWrapper.conn);
        console.info("Publisher channel created successfully");
    } catch (error) {
        console.error("Could not create publisher channel: ", error);
        throw error;
    }

    // handle the server close event
    process.on("SIGTERM", serverCloseHandler);
    process.on("SIGINT", serverCloseHandler);
};

/**
 * this function is used to connect to the MongoDB server
 * @returns {Promise<void>}
 */
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB successfully connected");
    } catch (error) {
        console.error("Error occured while connecting to the MongoDB server: ", error);
        throw error;
    }
};

/**
 * this function is used to connect to the PostgreSQL server
 * @returns {Promise<void>}
 * @throws {Error}
 */
const connectToPostgreSQL = async () => {
    try {
        await pgConnectionWrapper.connect(
            process.env.PG_USER as string,
            process.env.PG_HOST as string,
            process.env.PG_DATABASE as string,
            process.env.PG_PASSWORD as string,
            Number(process.env.PG_PORT)
        );
        console.info("Connected to the PostgreSQL database successfully");
    } catch (error) {
        console.error("Error occured while connecting to the PostgreSQL server: ", error);
        throw error;
    }
};

export { connectToRabbitMQ, rabbitMQWrapperSetup, connectToMongoDB, connectToPostgreSQL };
