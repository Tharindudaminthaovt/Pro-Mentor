package com.github.promentor.configuration;

import io.smallrye.config.ConfigMapping;

@ConfigMapping(prefix = "quarkus.http")
public interface ApplicationHttpConfig {

    String host();
    int port();

}