import { Channel, Connection, ConsumeMessage } from "amqplib";

import { BaseEvent } from "./base-event";

/**
 * this is the base listener class that all listeners should extend
 * this enable the manual ack of the message
 * @property subject the subject of the event that is used to publish and subscribe to events
 * @property channel the channel that is used to publish events
 * @method listen this method is used to listen to events
 * @method onMessage this method is called when an event is received
 * @method parseMessage this method is used to parse the message
 */
abstract class Listener<T extends BaseEvent> {
    abstract subject: T["subject"];

    /**
     * this method is called when an event is received
     * it should be implemented by the child class
     * @param data data of the event
     * @param msg message of the event
     */
    abstract onMessage(data: T["data"], msg: ConsumeMessage): void;

    protected _channel: Channel | undefined;

    constructor(protected readonly connection: Connection) { }

    /**
     * this method is used to listen to events
     * @returns the promise of void
     * @throws Error if the error occurs
     */
    async listen(): Promise<void> {
        try {
            // create channel
            this._channel = await this.connection.createChannel();

             // create queue
             const { queue } = await this._channel.assertQueue("", {
                exclusive: false,
                durable: true,
                autoDelete: false
            });

            // create exchange
            await this._channel.assertExchange(this.subject, "topic", { 
                durable: true
            });

            // bind queue to exchange
            await this._channel.bindQueue(queue, this.subject, "");

            console.info("Queue available: ", this.subject);

            // consume messages
            this._channel.consume(
                queue,
                (msg: ConsumeMessage | null) => {
                    console.info("Event received from queue: ", this.subject);
                    console.debug("Event data: ", msg?.content.toString());
                    if (msg !== null) {
                        this.onMessage(Listener.parseMessage(msg), msg);
                    } else {
                        console.error("Message is null");
                    }
                },
                {
                    noAck: false,
                }
            );

            this._channel.on("close", () => {
                console.error("Channel closed. Reconnecting...");
                this.listen();
            });
        } catch (error) {
            console.error("Failed to create queue: ", error);

            setTimeout(() => this.listen(), 5000); // Retry after 5 seconds
        }
    }

    /**
     * this method is used to parse the message
     * @param msg message of the event
     * @returns the parsed message
     */
    static parseMessage(msg: ConsumeMessage) {
        return JSON.parse(msg.content.toString());
    }
}

export { Listener };
