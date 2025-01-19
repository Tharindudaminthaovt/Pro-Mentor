package com.github.promentor.data.domain;

import io.quarkus.mongodb.panache.common.MongoEntity;
import org.bson.types.ObjectId;

@MongoEntity(collection="JobType")
public class JobTypeDAO {

    public ObjectId id;
    public String key;

}
