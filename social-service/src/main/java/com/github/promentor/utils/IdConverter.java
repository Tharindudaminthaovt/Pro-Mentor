package com.github.promentor.utils;

import com.github.promentor.exceptions.custom.InvalidUUIDException;
import io.quarkus.logging.Log;
import org.bson.types.ObjectId;

public class IdConverter {

    /**
     * convert a string to Object ID and
     * if it cannot convert, throw and InvalidUUID error
     * @param id ID want to convert to ObjectId
     * @return converted ObjectId
     */
    public static ObjectId getObjectId(String id) {

        try {
            return new ObjectId(id);
        } catch (IllegalArgumentException e) {
            Log.error("Failed to transform to object id: " + e.getMessage());
            throw new InvalidUUIDException();
        }

    }

}
