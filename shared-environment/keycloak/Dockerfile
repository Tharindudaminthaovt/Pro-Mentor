FROM quay.io/keycloak/keycloak:25.0 AS builder

WORKDIR /opt/keycloak

# for demonstration purposes only, please make sure to use proper certificates in production instead
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/

WORKDIR /opt/keycloak

COPY /themes ./themes

# change these values to point to a running postgres instance
# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_DB=postgres
ENV KC_FEATURES=token-exchange
ENV KC_DB_URL=jdbc:postgresql://postgres/promentor-keycloak
ENV KC_DB_USERNAME=""
ENV KC_DB_PASSWORD=""
ENV KC_HOSTNAME=localhost

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--db=postgres", "--metrics-enabled=true", "--health-enabled=true"]

# Production
# ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--optimized", "--db=postgres", "--metrics-enabled=true", "--health-enabled=true"]