import { Subjects } from "../Subjects";

/**
 * this event is published when a user is created with a tempary password
 * @property email the email of the user
 * @property temparyPassword the tempary password of the user
 * @property username the username of the user
 * @property firstName the first name of the user
 * @property lastName the last name of the user
 * @property subject the subject of the event that is used to publish and subscribe to events
 * @property data the data of the event
 */
interface UserTemaparyPasswordCreatedEvent {
    subject: Subjects.USER_TEMPARY_PASSWORD_CREATED;
    data: {
        email: string;
        temparyPassword: string;
        tenantId: string;
        username: string;
        firstName?: string;
        lastName?: string;
    };
}

export { UserTemaparyPasswordCreatedEvent };
