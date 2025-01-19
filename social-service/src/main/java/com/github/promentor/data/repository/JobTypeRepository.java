package com.github.promentor.data.repository;

import com.github.promentor.data.domain.JobTypeDAO;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Optional;

@ApplicationScoped
public class JobTypeRepository implements ReactivePanacheMongoRepository<JobTypeDAO> {

    public Uni<Optional<JobTypeDAO>> findByKey(String key) {
        return find("key", key).firstResultOptional();
    }

}
