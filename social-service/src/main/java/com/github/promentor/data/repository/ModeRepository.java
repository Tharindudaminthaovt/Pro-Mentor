package com.github.promentor.data.repository;

import com.github.promentor.data.domain.ModeDAO;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Optional;

@ApplicationScoped
public class ModeRepository implements ReactivePanacheMongoRepository<ModeDAO> {

    public Uni<Optional<ModeDAO>> findByKey(String key) {
        return find("key", key).firstResultOptional();
    }

}
