package com.github.promentor.web;

import com.github.promentor.configuration.ApplicationHttpConfig;
import com.github.promentor.configuration.OidcConfig;
import com.github.promentor.utils.UrlHandler;
import io.quarkus.logging.Log;
import io.quarkus.oidc.OidcRequestContext;
import io.quarkus.oidc.OidcTenantConfig;
import io.quarkus.oidc.TenantConfigResolver;
import io.smallrye.mutiny.Uni;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;

import java.net.MalformedURLException;
import java.util.Arrays;

@ApplicationScoped
public class CustomTenantResolver implements TenantConfigResolver {

    OidcConfig oidcConfig;
    ApplicationHttpConfig applicationHttpConfig;

    private static final String ORIGIN = "origin";
    private static final String REFER_URL = "referer";
    private static final String SEC_FETCH_SITE = "sec-Fetch-Site";

    public CustomTenantResolver(ApplicationHttpConfig applicationHttpConfig, OidcConfig oidcConfig) {
        super();
        this.applicationHttpConfig = applicationHttpConfig;
        this.oidcConfig = oidcConfig;
    }

    @Override
    public Uni<OidcTenantConfig> resolve(RoutingContext context, OidcRequestContext<OidcTenantConfig> requestContext) {
        // get the path and the host
        String origin = context.request().getHeader(ORIGIN);
        String referUrl = context.request().getHeader(REFER_URL);
        String secFetchSite = context.request().getHeader(SEC_FETCH_SITE);
        Log.info("reserved origin: " + origin  + ", referUrl: " + referUrl + ", sec-fetch-site: " + secFetchSite);

        /*
         * this is the client id for this service
         * this client should create in the relevant keycloak realms and should available appropriate permissions
         */
        String clientId = oidcConfig.clientId();
        Log.debug("clientId: " + clientId);

        if (origin == null && referUrl == null) {
            Log.error("Origin and referUrl not available, cannot map to tenant");
            return Uni.createFrom().nullItem();
        }

        String host;
        String protocol;

        try {
            if (origin != null) {
                host = UrlHandler.getHostFromGivenUrl(origin);
                protocol = UrlHandler.getProtocolFromGivenUrl(origin);
            } else {
                host = UrlHandler.getHostFromGivenUrl(referUrl);
                protocol = UrlHandler.getProtocolFromGivenUrl(referUrl);

                if (!isInSameOrigin(secFetchSite, host)) {
                    Log.error("origin not available in the url and also not in the same origin, cannot map to tenant");
                    return Uni.createFrom().nullItem();
                }
            }
        } catch (MalformedURLException e) {
            Log.error("failed to decode the url");
            Log.debug(e);
            return Uni.createFrom().nullItem();
        }

        Log.debug("host: " + host + ", protocol: " + protocol);

        String[] urlContent = host.split("\\.", 3);

        Log.debug("urlParams: " + Arrays.toString(urlContent));

        return getTheOidcTenantConfigUniBasedOnURLContent(urlContent, clientId, protocol);

    }

    private boolean isInSameOrigin(String secFetchSite, String host) {
        return (secFetchSite != null && secFetchSite.compareTo("same-origin") == 0) || host.compareTo(applicationHttpConfig.host()) == 0;
    }

    private Uni<OidcTenantConfig> getTheOidcTenantConfigUniBasedOnURLContent(String[] urlContent, String clientId, String protocol) {

        if (urlContent.length == 3) {
            String keycloakUrl = getKeycloakUrl(protocol, urlContent[2]);
            Log.debug("keycloak URL: " + keycloakUrl);
            Log.info("found the matching tenant");

            return getOidcTenantConfigUni(keycloakUrl, urlContent[0], clientId);

        } else {
            Log.info("url don't have required content to decide the realm, " +
                    "cannot match with given url patterns, cannot map to tenant");
            return Uni.createFrom().nullItem();
        }

    }

    private String getKeycloakUrl(String protocol, String host) {
        return protocol + "://idp." + host + (oidcConfig.authServerPort().isBlank() ? "" : ":" + oidcConfig.authServerPort());
    }

    private Uni<OidcTenantConfig> getOidcTenantConfigUni(String keycloakUrl, String tenantId, String clientId) {
        OidcTenantConfig config = new OidcTenantConfig();
        config.setTenantId(tenantId);
        String authServerUrl = keycloakUrl + "/realms/" + tenantId;
        config.setAuthServerUrl(authServerUrl);
        Log.info("redirected to: " + authServerUrl);
        config.setClientId(clientId);
        config.setApplicationType(OidcTenantConfig.ApplicationType.SERVICE);
        return Uni.createFrom().item(config);
    }

}
