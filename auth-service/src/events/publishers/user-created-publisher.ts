import { Publisher, Subjects, UserCreatedEvent } from "@promentor-app/shared-lib";

class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
    subject: Subjects.USER_CREATED = Subjects.USER_CREATED;
}

export default UserCreatedPublisher;
