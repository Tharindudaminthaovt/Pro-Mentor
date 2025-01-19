package com.github.promentor.data.domain;

import io.quarkus.mongodb.panache.common.MongoEntity;
import org.bson.types.ObjectId;

@MongoEntity(collection="Location")
public class LocationDAO {

    public ObjectId id;
    public String location;

}
