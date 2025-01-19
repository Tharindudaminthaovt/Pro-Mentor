package com.github.promentor.data.domain;

import io.quarkus.mongodb.panache.common.MongoEntity;
import org.bson.types.ObjectId;

import java.time.Instant;
import java.util.List;

@MongoEntity(collection="Event")
public class EventDAO extends AuditableEntityDAO{

    public ObjectId id;
    public String title;
    public String companyName;
    public String description;
    public String url;
    public LocationDAO location;
    public ModeDAO mode;
    public String createdBy;
    public List<TagDAO> tags;
    public Instant time;

    public EventDAO() {
        super();
    }

    public EventDAO(String title, String companyName, String description, String url, LocationDAO location, ModeDAO mode, String createdBy, List<TagDAO> tags, Instant time) {
        super();
        this.title = title;
        this.companyName = companyName;
        this.description = description;
        this.url = url;
        this.location = location;
        this.mode = mode;
        this.createdBy = createdBy;
        this.time = time;
    }
}
