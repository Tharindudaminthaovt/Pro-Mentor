package com.github.promentor.utils;

import io.vertx.core.json.JsonObject;

public class IncomingMessageConverter {

    /**
     * this convert an incoming bye payload to String and then convert and return as a JsonObject
     * @param payloadBytes bytes want to convert to JsonObject
     * @return JsonObject
     */
    public static JsonObject getMessageFromByteStream(byte[] payloadBytes) {
        return new JsonObject(new String(payloadBytes));
    }

}
