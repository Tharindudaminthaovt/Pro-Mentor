import { InvalidURLException } from "../errors/custom_exceptions/invalid-url-exception";

/**
 * this is a get the tenant id from the url
 * current url format: https://<tenant-id>.<domain-name>
 * @param url url
 * @returns tenant id as string
 * @throws InvalidURLException if the url is not in the correct format
 * @example
 * const tenantId = getTenantIdFromURL("https://tenant-1.app.promentor.com");
 * console.log(tenantId); // tenant-1
 * @example
 * const tenantId = getTenantIdFromURL("http://tenant2.app.promentor.local:3000");
 * console.log(tenantId); // tenant2
 */
const getTenantIdFromURL = (url: string): string => {
    console.debug("reserved url: ", url);

    if (url && (url.includes("pro-mentor.live") || url.includes("sltc-promentor"))) {
        return "sltc";
    }

    try {
        /*
         * separate the protocol and domain name from the url
         * 
         * const url = "https://tenant-1.app.promentor.com";
         * const [protocol, domainName] = ["https", "tenant-1.app.promentor.com"] = url.split("://");
         * then separate the tenant id from the domain name by splitting the domain name by "."
         * tenant id is the first part of the domain name
         * 
         * const domainName = "tenant-1.app.promentor.com";
         * const tenantId = "tenant-1" = domainName.split(".")[0];
         * console.log(tenantId); // tenant-1
         */
        return url.split("://")[1].split(".")[0];
    } catch (error) {
        throw new InvalidURLException();
    }
};

/**
 * this is a get the keycloak idp url from the url
 * current url format: https://<tenant-id>.<domain-name>
 * if the url is local (contains "local") the idp server port number is included in idp url
 * @param url url
 * @returns keycloak idp url as string
 * @throws InvalidURLException if the url is not in the correct format
 * @example
 * const keycloakIdpUrl = getKeycloakIdpUrl("https://tenant-1.app.promentor.com");
 * console.log(keycloakIdpUrl); // https://idp.promentor.com
 * @example
 * const keycloakIdpUrl = getKeycloakIdpUrl("http://tenant2.app.promentor.local:3000");
 * console.log(keycloakIdpUrl); // http://idp.promentor.local
 */
const getKeycloakIdpUrl = (url: string): string => {
    console.debug("reserved url: ", url);

    if (url && (url.includes("pro-mentor.live") || url.includes("sltc-promentor"))) {
        return "http://keycloak-service:443";
    }

    try {
        /*
         * separate the protocol and domain name from the url
         * const url = "https://tenant-1.app.promentor.com";
         * const [protocol, domainUrl] = ["https", "tenant-1.app.promentor.com"] = url.split("://");
         */
        const [protocol, domainUrl] = url.split("://");
        let domain = domainUrl.split(".");

        // if the domain name includes "local", it means that it is a local environment
        // so we need to remove the port number from the domain name
        if (domainUrl.includes("local")) {
            domain = domainUrl.split(":")[0].split(".");
        }

        // remove the tenant id from the domain name and second "app" from the domain name
        domain.splice(0, 2);

        /*
         * first get the protocol from the url
         * then add "idp" to the domain name
         * instend of the first two part of the domain (seperate by ".") applend all the rest of the domain name
         * const keycloakIdpUrl = "https://idp.promentor.com" = `${protocol}://idp.${domain.join(".")}`;
         * if the url is local (contains "local") the idp server port number is included in idp url
         * const keycloakIdpUrl = "http://idp.promentor.local:8080" = `${protocol}://idp.${domain.join(".")}:8080`;
        */
       if (domainUrl.includes("local")) {
            return `${protocol}://idp.${domain.join(".")}:8080`;
       }
        return `${protocol}://idp.${domain.join(".")}`;
    } catch (error) {
        throw new InvalidURLException();
    }
};

/**
 * this is a check the request is in the same origin or not
 * @param host host url of the request
 * @param secFetchSite sec-fetch-site header of the request
 * @param applicationHost application host url
 * @returns the request is in the same origin or not
 */
const isInSameOrigin = (host: string, secFetchSite: string, applicationHost: string): boolean => {
    const [, domainUrl] = host.split("://");
    return (secFetchSite != null && secFetchSite !== "same-origin") || (domainUrl === applicationHost);
}

export { getTenantIdFromURL, getKeycloakIdpUrl, isInSameOrigin };
