import TemplateTypes from "../template-types";

/**
 * @description This interface contains the template props for the USER_TEMPARY_PASSWORD template
 * @param templateName name of the template
 * @param params params to be replaced in the template
 */
interface BaseTemplateProps {
    templateName: TemplateTypes;
    params: unknown;
}

export default BaseTemplateProps;