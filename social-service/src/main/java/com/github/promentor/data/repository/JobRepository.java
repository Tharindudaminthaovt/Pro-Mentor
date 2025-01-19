package com.github.promentor.data.repository;

import com.github.promentor.data.domain.JobDAO;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class JobRepository implements ReactivePanacheMongoRepository<JobDAO> {

}
