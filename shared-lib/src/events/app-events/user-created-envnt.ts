import { Subjects } from "../Subjects";

/**
 * this event is published when a user is created with a tempary password
 * @property email the email of the user
 * @property id of the user
 * @property username the username of the user
 * @property firstName the first name of the user
 * @property lastName the last name of the user
 * @property subject the subject of the event that is used to publish and subscribe to events
 * @property data the data of the event
 */
interface UserCreatedEvent {
    subject: Subjects.USER_CREATED,
    data: {
        id: string;
        email: string;
        tenantId: string;
        username: string;
        firstName: string;
        lastName: string;
    }
}

export { UserCreatedEvent };
