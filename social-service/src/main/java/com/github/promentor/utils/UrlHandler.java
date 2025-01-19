package com.github.promentor.utils;

import java.net.MalformedURLException;
import java.net.URL;

public class UrlHandler {

    // get host from url
    public static String getHostFromGivenUrl(String urlString) throws MalformedURLException {
        URL url = new URL(urlString);
        return url.getHost();
    }

    // get protocol from url (http, https)
    public static String getProtocolFromGivenUrl(String urlString) throws MalformedURLException {
        URL url = new URL(urlString);
        return url.getProtocol();
    }
}
