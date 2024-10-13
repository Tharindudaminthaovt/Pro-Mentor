import TemplateTypes from "./template-types";

/**
 * this function will generate the template based on the template name provided
 * for that it will import the template class from the templates folder
 * and then it will create the template in the AWS SES account
 * for that there should be a template with the same name in the templates folder
 * if the template_name is USER_TEMPARY_PASSWORD then the file name should be user_tempary_password.template.ts
 * it should extends the BaseTemplate class
 * @param templateName name of the template to be generated
 */
const runSESEmailTemplateGenerator = async (templateName: TemplateTypes) => {

    try {
        // get the template location
        const templateLocation = `./templates/${templateName.toLocaleLowerCase()}.template`;
    
        // import the template class
        const { Template } = await  import(templateLocation);

        const templateInstance = new Template();

        await templateInstance.createTemplate();
    } catch (error) {
        console.error((error as Error).message);
        throw error;
    }


};

export default runSESEmailTemplateGenerator;