import amqplib, { Connection } from "amqplib";

/**
 * this class is a wrapper for the rabbitmq connection
 * it is used to connect to rabbitmq and store the connection
 * so that it can be used later
 * it is a singleton class so that it can be used in different files
 */
class RabbitMQConnectorWrapper {
    private _rabbitMQconn?: Connection;

    /**
     * this function is used to get the rabbitmq connection
     * @returns the rabbitmq connection
     * @throws Error if the connection is not established yet
     */
    get conn() {
        if (!this._rabbitMQconn) {
            throw new Error("Cannot Access RabbitMQ Connection before connection");
        }

        return this._rabbitMQconn;
    }

    /**
     * this function is used to connect to rabbitmq server
     * it stores the connection in the _rabbitMQconn variable
     * so that it can be used later
     * @param url the url of the rabbitmq server
     * @returns the promise of the connection
     * @throws Error if the there is an error in connecting to rabbitmq
     */
    connect(url: string, connecionName: string) {
        return new Promise<void>((resolve, reject) => {
            amqplib
                .connect(url,{ clientProperties: { connection_name: connecionName}})
                .then((conn) => {
                    this._rabbitMQconn = conn;
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export const rabbitMQWrapper = new RabbitMQConnectorWrapper();
