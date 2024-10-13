import { rabbitMQWrapper, rabbitMQPublihserChannelWrapper } from "@promentor-app/shared-lib";

import UasrTemparyPasswordCreatedListener from "../events/listeners/user-tempary-password-created-listener";

/**
 * this function is used to connect to rabbitMQ
 * @returns {Promise<void>}
 */
const connectToRabbitMQ: () => Promise<void> = async () => {
    return rabbitMQWrapper.connect(
        process.env.RABBITMQ_CONNECTION as string,
        process.env.SERVICE_NAME as string
    );
};

/**
 * this function is used to add listeners to the rabbitMQ
 * @returns {void}
 */
const addListeners = () => {
    new UasrTemparyPasswordCreatedListener(rabbitMQWrapper.conn).listen();
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

    // handle the server close event
    process.on("SIGTERM", serverCloseHandler);
    process.on("SIGINT", serverCloseHandler);
};

export { connectToRabbitMQ, rabbitMQWrapperSetup };
