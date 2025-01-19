package com.github.promentor.data.repository;

import com.github.promentor.data.domain.UserDAO;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Optional;

@ApplicationScoped
public class UserRepository implements ReactivePanacheMongoRepository<UserDAO> {

    public Uni<Optional<UserDAO>> findByUsername(String username) {
        return find("username", username).firstResultOptional();
    }

}
