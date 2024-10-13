/**
 * this is the base event interface that all events should implement
 * @property subject the subject of the event that is used to publish and subscribe to events
 * @property data the data of the event
 */

interface BaseEvent {
    subject: string;

    data: unknown;
}

export { BaseEvent };
