import { CustomException, ErrorCode } from "@promentor-app/shared-lib";
import { SESV2 } from "aws-sdk";

/**
 * @description This function creates an email template in SES.
 * @param templateName The name of the template to be created.
 * @param htmlContent The HTML content of the email template.
 * @param subject The subject of the email template.
 * @param textContent The text content of the email template.
 * @returns Promise<void>
 * @example
 * generateSESEmailTemplate(
 *    "USER_TEMPARY_PASSWORD",
 *    "<h1>Test</h1>",
 *    "Test",
 *    "Test content",
 * );
 * {@link https://docs.aws.amazon.com/ses/latest/APIReference-V2/API_CreateEmailTemplate.html}
 */

// set the configuration
const SES_CONFIG: SESV2.ClientConfiguration | undefined = {
    accessKeyId: process.env.SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
    region: process.env.SES_REGION,
}

const sesClient = new SESV2(SES_CONFIG);

const generateSESEmailTemplate = (
    templateName: string, 
    htmlContent: string, 
    subject: string,
    textContent: string,
) : Promise<void> => {

    return new Promise((resolve, reject) => {

        sesClient.createEmailTemplate({
            TemplateName: templateName,
            TemplateContent: {
                Html: htmlContent,
                Subject: subject,
                Text: textContent,
            },
        }, (err, data) => {
            if (err) {
                console.debug("Error while creating template: ", err.stack);
                console.error("Error while creating template: ", err.message);
                reject(new CustomException(err.message, ErrorCode.AWS_SES_ERROR, 400));
            } 
            else {
                console.info(data)
                resolve();
            };
        });

    });
};

export default generateSESEmailTemplate;