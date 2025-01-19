package com.github.promentor.data.domain;

import io.quarkus.mongodb.panache.common.MongoEntity;
import org.bson.types.ObjectId;

@MongoEntity(collection="Tag")
public class TagDAO {

    public ObjectId id;
    public String key;

    public TagDAO() {
    }

    public TagDAO(ObjectId objectId, String key) {
        this.id = objectId;
        this.key = key;
    }
}
