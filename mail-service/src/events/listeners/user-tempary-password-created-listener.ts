import { Listener, Subjects, UserTemaparyPasswordCreatedEvent } from "@promentor-app/shared-lib";
import { ConsumeMessage } from "amqplib";
import sendEmail from "../../nodemailer/send-email";

class UasrTemparyPasswordCreatedListener extends Listener<UserTemaparyPasswordCreatedEvent> {
    subject: Subjects.USER_TEMPARY_PASSWORD_CREATED = Subjects.USER_TEMPARY_PASSWORD_CREATED;

    async onMessage(data: UserTemaparyPasswordCreatedEvent["data"], msg: ConsumeMessage) {
        const { username, email, temparyPassword, firstName, lastName, tenantId } = data;

        const name = `${firstName} ${lastName}` || username;

        await sendEmail(
            email,
            'Pro Mentor App - Tempary Password',
            `<h4>Hi ${name},</h4><br>
            <p>Someone just created a account using your email in the ${tenantId} for Pro Mentor App.</p>
            <p>Use this one time password to login to your account.</p>
            <p>username: ${username}</p>
            <p>Your tempary password is: ${temparyPassword}</p>
            <p>If have any concerns, please contact your organization IT department</p>
            <p>Thank you.</p>`,
            `Hi ${name}, \n 
            Someone just created a account using your email in the ${tenantId} for Pro Mentor App. \n 
            Use this one time tempary password to login to your account. \n username: ${username} \n 
            Your tempary password is: ${temparyPassword} \n 
            If have any concerns, please contact your organization IT department \n 
            Thank you.`
        )

        return this._channel?.ack(msg);
    }
}

export default UasrTemparyPasswordCreatedListener;
