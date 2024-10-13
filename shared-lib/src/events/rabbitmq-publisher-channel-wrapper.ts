import { Channel, Connection } from "amqplib";

/**
 * this class is a wrapper for the rabbitmq channel
 * it is used to publish messages to rabbitmq
 * it is used to connect to rabbitmq and store the channel
 * so that it can be used later
 * it is a singleton class so that it can be used in different files
 * it is used in the publisher
 */
class RabbitMQPublihserChannelWrapper {
    private _publisherChannel?: Channel;

    /**
     * this function is used to get the rabbitmq channel for publishing
     * it is used in the publisher to publish messages to rabbitmq server
     * @returns the rabbitmq channel for publishing
     * @throws Error if there is no channel yet
     * this means that the channel is not created yet
     */
    get publisherChannel() {
        if (!this._publisherChannel) {
            throw new Error("Cannot Access RabbitMQ Channel before connection");
        }

        return this._publisherChannel;
    }

    /**
     * this function is used to create the rabbitmq channel for publishing messages
     * it stores the channel in the _publisherChannel variable
     * so that it can be used later
     * it is used in the publisher to publish messages to rabbitmq server
     * @param connection the rabbitmq connection
     * @returns the promise of the channel used for publishing messages
     * @throws Error if there is an error in creating the channel
     */
    connect(connection: Connection) {
        return new Promise<void>((resolve, reject) => {
            connection
                .createChannel()
                .then((channel) => {
                    this._publisherChannel = channel;
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export const rabbitMQPublihserChannelWrapper = new RabbitMQPublihserChannelWrapper();
