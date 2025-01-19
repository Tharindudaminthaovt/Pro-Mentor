package com.github.promentor.data.domain;

import io.quarkus.mongodb.panache.common.MongoEntity;
import org.bson.types.ObjectId;

@MongoEntity(collection="post")
public class PostDAO extends AuditableEntityDAO {

    public ObjectId id;
    public String description;
    public String imageUrl;
    public String createdBy;
    public String createdById;
    public UserDAO owner;

    public PostDAO() {
        super();
    }

    public PostDAO(String description, String imageUrl) {
        super();
        this.description = description;
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "PostDAO{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", createdBy='" + createdBy + '\'' +
                ", createdById='" + createdById + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
