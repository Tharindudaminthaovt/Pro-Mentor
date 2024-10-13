import TemplateTypes from "../template-types";

/**
 * @description This interface contains the template props for the USER_TEMPARY_PASSWORD template
 * @param templateName name of the template
 * @param params params to be replaced in the template
 * @param params.name name of the user
 * @param params.realm name of the realm
 * @param params.username username of the user
 * @param params.password tempary password of the user
 */
interface UserTemparyPasswordTemplateProps {

    templateName: TemplateTypes.USER_TEMPARY_PASSWORD;
    params: {
        name: string;
        realm: string;
        username: string;
        password: string;
    };
}

export default UserTemparyPasswordTemplateProps;