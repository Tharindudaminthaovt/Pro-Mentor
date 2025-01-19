package com.github.promentor.data.domain;

import io.quarkus.mongodb.panache.common.MongoEntity;
import org.bson.types.ObjectId;

@MongoEntity(collection="PostComment")
public class PostCommentDAO extends AuditableEntityDAO {

    public ObjectId id;
    public ObjectId postId;
    public String username;
    public String comment;

    public PostCommentDAO() {
    }

    public PostCommentDAO(ObjectId postId, String username, String comment) {
        this.postId = postId;
        this.username = username;
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "PostComment{" +
                "id=" + id +
                ", postId=" + postId +
                ", username='" + username + '\'' +
                ", comment='" + comment + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
