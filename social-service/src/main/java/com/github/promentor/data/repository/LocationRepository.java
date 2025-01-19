package com.github.promentor.data.repository;

import com.github.promentor.data.domain.LocationDAO;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Optional;

@ApplicationScoped
public class LocationRepository implements ReactivePanacheMongoRepository<LocationDAO> {

    public Uni<Optional<LocationDAO>> findByLocation(String location) {
        return find("location", location).firstResultOptional();
    }

}
