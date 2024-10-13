import { Channel } from "amqplib";

import { BaseEvent } from "./base-event";

/**
 * this is the base publisher class that all publishers should extend
 * @property subject the subject of the event that is used to publish and subscribe to events
 * @property channel the channel that is used to publish events
 * @method publish this method is used to publish events
 */
abstract class Publisher<T extends BaseEvent> {
    abstract subject: T["subject"];

    constructor(protected readonly channel: Channel) { }

    /**
     * this method is used to publish events
     * @param data the data of the event
     * @param maxRetries the maximum number of retries to publish the event
     * @param retryDelay the delay between retries
     * @returns the promise of void
     */
    publish(data: T["data"], maxRetries: number = 3, retryDelay: number = 1000): Promise<void> {

        return new Promise((resolve, reject) => {
            let currentRetry = 0;

            const publishAttempt = () => {
                this.channel
                .assertExchange(this.subject, "topic", { durable: true, autoDelete: false })
                .then(() => {
                    console.debug("Queue available to publish: ", this.subject);

                    this.channel.publish(this.subject, "", Buffer.from(JSON.stringify(data)), { persistent: true });

                    console.info("Event published to queue: ", this.subject);
                    console.debug("Event data: ", data);

                    resolve();
                })
                .catch((err) => {
                    if (currentRetry < maxRetries) {
                        console.error(`Failed to publish event to ${this.subject}. Retrying in ${retryDelay / 1000} seconds...`);
                        currentRetry += 1;
                        setTimeout(publishAttempt, retryDelay);
                    } else {
                        console.error(`Failed to publish event to ${this.subject} after ${maxRetries} retries.`);
                        reject(err);
                    }
                });
            }

            publishAttempt();
            
        });
    }
}

export { Publisher };
