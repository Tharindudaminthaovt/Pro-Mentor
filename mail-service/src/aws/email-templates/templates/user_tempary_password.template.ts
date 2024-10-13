import TemplateTypes from "../template-types";
import BaseTemplate from "./base-template";
import UserTemparyPasswordTemplateProps from "../template-props/user-tempary-password-props";

/**
 * @description This class contains the template for the USER_TEMPARY_PASSWORD template
 */
class UserTemparyPasswordTemplate extends BaseTemplate<UserTemparyPasswordTemplateProps> { 

    templateName: TemplateTypes.USER_TEMPARY_PASSWORD = TemplateTypes.USER_TEMPARY_PASSWORD;

    htmlContent = 'Pro Mentor App - Tempary Password';

    subject = `<h4>Hi {{name}},</h4><br>
        <p>Someone just created a account using your email in the {{realm}} for Pro Mentor App.</p>
        <p>Use this one time password to login to your account.</p>
        <p>username: {{username}}</p>
        <p>Your tempary password is: {{password}}</p>
        <p>If have any concerns, please contact your organization IT department</p>
        <p>Thank you.</p>`;

    textContent = `Hi {{name}}, \n 
        Someone just created a account using your email in the {{realm}} for Pro Mentor App. \n 
        Use this one time tempary password to login to your account. \n username: {{username}} \n 
        Your tempary password is: {{password}} \n 
        If have any concerns, please contact your organization IT department \n 
        Thank you.`;

    

}

export {
    // eslint-disable-next-line import/prefer-default-export
    UserTemparyPasswordTemplate as Template
};