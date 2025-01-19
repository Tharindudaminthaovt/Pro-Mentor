package com.github.promentor.data.domain;

import io.quarkus.mongodb.panache.common.MongoEntity;
import org.bson.types.ObjectId;

import java.time.Instant;

@MongoEntity(collection="JobCountTracker")
public class JobCountTracker {

    public ObjectId id;
    public Instant date;
    public int count;

    public JobCountTracker() {
    }

    public JobCountTracker(Instant date, int count) {
        this.date = date;
        this.count = count;
    }
}
