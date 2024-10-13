import { Publisher, Subjects, UserTemaparyPasswordCreatedEvent } from "@promentor-app/shared-lib";

class UserTemparyPasswordCreatedPublisher extends Publisher<UserTemaparyPasswordCreatedEvent> {
    subject: Subjects.USER_TEMPARY_PASSWORD_CREATED = Subjects.USER_TEMPARY_PASSWORD_CREATED;
}

export default UserTemparyPasswordCreatedPublisher;
