import BaseTemplateProps from "../template-props/template-props";
import generateSESEmailTemplate from "../email-template-handler";

/**
 * @description This class is the base class for all the email templates
 * @param T template props
 * @abstract templateName name of the template
 * @abstract htmlContent html content of the template
 * @abstract subject subject of the template
 * @abstract textContent text content of the template
 * @method createTemplate creates the template in SES
 * @example
 * class UserTemparyPasswordTemplate extends BaseTemplate<UserTemparyPasswordTemplateProps> {
 *   templateName: TemplateTypes.USER_TEMPARY_PASSWORD = TemplateTypes.USER_TEMPARY_PASSWORD;
 *   subject = 'Pro Mentor App - Tempary Password';
 *   htmlContent = `<h1>Hi {{name}},</h1><br>`;
 *   textContent = `Hi {{name}}, \n`;
 * }
 */
abstract class BaseTemplate<T extends BaseTemplateProps> {

    abstract templateName: T["templateName"];

    abstract htmlContent: string;

    abstract subject: string;

    abstract textContent: string;

    async createTemplate(): Promise<void> {

        await generateSESEmailTemplate(
            this.templateName,
            this.htmlContent,
            this.subject,
            this.textContent,
        );
    }
}

export default BaseTemplate;