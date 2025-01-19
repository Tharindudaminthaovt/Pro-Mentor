package com.github.promentor.data.repository;

import com.github.promentor.data.domain.JobModalityDAO;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Optional;

@ApplicationScoped
public class JobModalityRepository implements ReactivePanacheMongoRepository<JobModalityDAO> {

    public Uni<Optional<JobModalityDAO>> findByKey(String key) {
        return find("key", key).firstResultOptional();
    }

}
