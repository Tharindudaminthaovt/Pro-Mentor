package com.github.promentor.data.repository;

import com.github.promentor.data.domain.PostCountTracker;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class PostCountTrackerRepository implements ReactivePanacheMongoRepository<PostCountTracker> {

    public Uni<PostCountTracker> addCount(Instant date) {
        return findCountTrackerByDate(date)
                .onItem().transformToUni(postCountTracker -> {
                    if (postCountTracker.isPresent()) {
                        int count = postCountTracker.get().count;
                        postCountTracker.get().count = count + 1;
                        return persistOrUpdate(postCountTracker.get());
                    }
                    return  persist(new PostCountTracker(date, 1));
                });
    }

    public Uni<PostCountTracker> removeCount(Instant date) {
        return findCountTrackerByDate(date)
                .onItem().transformToUni(postCountTracker -> {
                    if (postCountTracker.isPresent()) {
                        int count = postCountTracker.get().count;
                        postCountTracker.get().count = count - 1;
                        return persistOrUpdate(postCountTracker.get());
                    }
                    return  persist(new PostCountTracker(date, 1));
                });
    }

    public Uni<Optional<PostCountTracker>> findCountTrackerByDate(Instant date) {
        return find("date", date).firstResultOptional();

    }

    public Uni<List<PostCountTracker>> findAllRecordsGreaterThanDate(Instant date) {
        return find("date > ?1", date).stream().collect().asList();
    }

}
