package com.github.promentor.data.domain;

import io.quarkus.mongodb.panache.common.MongoEntity;
import org.bson.codecs.pojo.annotations.BsonId;

@MongoEntity(collection="User")
public class UserDAO {

    @BsonId
    public String id;
    public String username;
    public String email;
    public String firstName;
    public String lastName;
    public String tenantId;

    public UserDAO() {
    }

    public UserDAO(String id, String username, String email, String firstName, String lastName, String tenantId) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.tenantId = tenantId;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", tenantId='" + tenantId + '\'' +
                '}';
    }
}
