import { expect } from "chai";
import { getKeycloakIdpUrl, getTenantIdFromURL } from "../../src/util/url-handler";

it("retrive the tenant if form valid url", () => {
    const url1 = "http://tenant1.app.promentor.local:3000";
    const tenant = getTenantIdFromURL(url1);
    expect(tenant).to.equal("tenant1");

    const url2 = "http://tenant2.app.promentor.com";
    const tenant2 = getTenantIdFromURL(url2);
    expect(tenant2).to.equal("tenant2");

    const url3 = "https://tenant3.app.promentor.com";
    const tenant3 = getTenantIdFromURL(url3);
    expect(tenant3).to.equal("tenant3");
});

it("retrive the tentant when have '-' in the name", () => {
    const url = "https://tenant-3.app.promentor.com";
    const tenant = getTenantIdFromURL(url);
    expect(tenant).to.equal("tenant-3");
});

it("throw error if url is not valid", () => {
    expect(() => getTenantIdFromURL("")).to.throw("Bad Request: Invalid URL");
    expect(() => getTenantIdFromURL("http")).to.throw("Bad Request: Invalid URL");
});

it("retrive the idp url form valid url", () => {
    const url1 = "http://tenant1.app.promentor.local:3000";
    const idpUrl1 = getKeycloakIdpUrl(url1);
    expect(idpUrl1).to.equal("http://idp.promentor.local:8080");

    const url2 = "http://tenant2.app.promentor.com";
    const idpUrl2 = getKeycloakIdpUrl(url2);
    expect(idpUrl2).to.equal("http://idp.promentor.com");

    const url3 = "https://tenant3.app.promentor.com";
    const idpUrl3 = getKeycloakIdpUrl(url3);
    expect(idpUrl3).to.equal("https://idp.promentor.com");

    const url4 = "https://tenant-3.app.promentor.com";
    const idpUrl4 = getKeycloakIdpUrl(url4);
    expect(idpUrl4).to.equal("https://idp.promentor.com");
});

it("throw error if url is not valid when retrive key cloak idp url", () => {
    expect(() => getKeycloakIdpUrl("")).to.throw("Bad Request: Invalid URL");
    expect(() => getKeycloakIdpUrl("http")).to.throw("Bad Request: Invalid URL");
});