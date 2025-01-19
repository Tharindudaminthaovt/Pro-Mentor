package com.github.promentor.data.repository;

import com.github.promentor.data.domain.PostCommentDAO;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PostCommentRepository implements ReactivePanacheMongoRepository <PostCommentDAO> {



}
