package com.github.promentor.rabbitmq.model;


import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class UserCreated {

    public String username;
    public String email;
    public String id;
    public String firstName;
    public String lastName;
    public String tenantId;

    public UserCreated() {
    }

    public UserCreated(String username, String email, String id, String firstName, String lastName, String tenantId) {
        this.username = username;
        this.email = email;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.tenantId = tenantId;
    }

    @Override
    public String toString() {
        return "UserCreated{" +
                "username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", id='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", tenantId='" + tenantId + '\'' +
                '}';
    }
}
