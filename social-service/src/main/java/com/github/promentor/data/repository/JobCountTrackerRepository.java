package com.github.promentor.data.repository;

import com.github.promentor.data.domain.JobCountTracker;
import com.github.promentor.data.domain.JobDAO;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class JobCountTrackerRepository implements ReactivePanacheMongoRepository<JobCountTracker> {

    public Uni<JobCountTracker> addCount(Instant date) {
        return findCountTrackerByDate(date)
                .onItem().transformToUni(jobCountTracker -> {
                    if (jobCountTracker.isPresent()) {
                        int count = jobCountTracker.get().count;
                        jobCountTracker.get().count = count + 1;
                        return persistOrUpdate(jobCountTracker.get());
                    }
                    return  persist(new JobCountTracker(date, 1));
                });
    }

    public Uni<JobCountTracker> removeCount(Instant date) {
        return findCountTrackerByDate(date)
                .onItem().transformToUni(jobCountTracker -> {
                    if (jobCountTracker.isPresent()) {
                        int count = jobCountTracker.get().count;
                        jobCountTracker.get().count = count - 1;
                        return persistOrUpdate(jobCountTracker.get());
                    }
                    return  persist(new JobCountTracker(date, 1));
                });
    }

    public Uni<Optional<JobCountTracker>> findCountTrackerByDate(Instant date) {
        return find("date", date).firstResultOptional();

    }

    public Uni<List<JobCountTracker>> findAllRecordsGreaterThanDate(Instant date) {
        return find("date > ?1", date).stream().collect().asList();
    }

}
