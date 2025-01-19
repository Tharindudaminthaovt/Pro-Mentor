package com.github.promentor.configuration;


import io.smallrye.config.ConfigMapping;

@ConfigMapping(prefix = "quarkus.oidc")
public interface OidcConfig {

    String clientId();

    String authServerPort();

}