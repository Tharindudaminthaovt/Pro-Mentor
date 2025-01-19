package com.github.promentor.web.dto;

import java.time.Instant;

public class PostGetDTO {
        private String id;
        private String description;
        private String imageUrl;
        private Instant createdAt;
        private Instant updatedAt;
        private String createdBy;
        private String createdById;
        private UserGetDTO owner;
        private boolean likedByMe;
        private int numberOfLikes;

    public PostGetDTO() {
    }

    public PostGetDTO(String id, String description, String imageUrl, Instant createdAt, Instant updatedAt, String createdBy, String createdById, UserGetDTO owner, boolean likedByMe, int numberOfLikes) {
        this.id = id;
        this.description = description;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdBy = createdBy;
        this.createdById = createdById;
        this.owner = owner;
        this.likedByMe = likedByMe;
        this.numberOfLikes = numberOfLikes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getCreatedById() {
        return createdById;
    }

    public void setCreatedById(String createdById) {
        this.createdById = createdById;
    }

    public UserGetDTO getOwner() {
        return owner;
    }

    public void setOwner(UserGetDTO owner) {
        this.owner = owner;
    }

    public boolean isLikedByMe() {
        return likedByMe;
    }

    public void setLikedByMe(boolean likedByMe) {
        this.likedByMe = likedByMe;
    }

    public int getNumberOfLikes() {
        return numberOfLikes;
    }

    public void setNumberOfLikes(int numberOfLikes) {
        this.numberOfLikes = numberOfLikes;
    }

    @Override
    public String toString() {
        return "PostGetDTO{" +
                "id='" + id + '\'' +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", createdBy='" + createdBy + '\'' +
                ", createdById='" + createdById + '\'' +
                ", owner=" + owner +
                ", likedByMe=" + likedByMe +
                ", numberOfLikes=" + numberOfLikes +
                '}';
    }
}
