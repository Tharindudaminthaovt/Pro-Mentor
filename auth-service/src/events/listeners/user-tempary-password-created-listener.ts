import { Listener, Subjects, UserTemaparyPasswordCreatedEvent } from "@promentor-app/shared-lib";
import { ConsumeMessage } from "amqplib";

class UasrTemparyPasswordCreatedListener extends Listener<UserTemaparyPasswordCreatedEvent> {
    subject: Subjects.USER_TEMPARY_PASSWORD_CREATED = Subjects.USER_TEMPARY_PASSWORD_CREATED;

    onMessage(data: UserTemaparyPasswordCreatedEvent["data"], msg: ConsumeMessage): void {
        const { username, email, temparyPassword, firstName, lastName } = data;

        console.log(username, email, temparyPassword, firstName, lastName);
        // this._channel?.reject(msg);

        this._channel?.ack(msg);
        console.log(msg);
    }
}

export default UasrTemparyPasswordCreatedListener;
