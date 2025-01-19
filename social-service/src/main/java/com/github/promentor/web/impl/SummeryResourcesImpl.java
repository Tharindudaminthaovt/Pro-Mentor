package com.github.promentor.web.impl;

import com.github.promentor.data.repository.EventRepository;
import com.github.promentor.data.repository.JobCountTrackerRepository;
import com.github.promentor.data.repository.PostCountTrackerRepository;
import com.github.promentor.mappers.EventMapper;
import com.github.promentor.web.dto.SummeryGetDTO;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@ApplicationScoped
public class SummeryResourcesImpl {

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final JobCountTrackerRepository jobCountTrackerRepository;
    private final PostCountTrackerRepository postCountTrackerRepository;

    public SummeryResourcesImpl(EventRepository eventRepository, EventMapper eventMapper, JobCountTrackerRepository jobCountTrackerRepository, PostCountTrackerRepository postCountTrackerRepository) {
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
        this.jobCountTrackerRepository = jobCountTrackerRepository;
        this.postCountTrackerRepository = postCountTrackerRepository;
    }

    public Uni<SummeryGetDTO> getSummery() {

        return eventRepository.count()
                .onItem().transformToUni(eventCount -> {
                    return eventRepository.findAll()
                            .stream()
                            .onItem()
                            .transform(this.eventMapper::toEventGetCalendarDTO)
                            .collect().asList()
                            .onItem().transformToUni(eventGetCalendarDTOS -> {
                                Instant sevenDaysAgo = Instant.now().truncatedTo(ChronoUnit.DAYS).minus(7, ChronoUnit.DAYS);
                                return jobCountTrackerRepository.findAllRecordsGreaterThanDate(sevenDaysAgo)
                                        .onItem().transformToUni(jobCountTracker -> {
                                            return postCountTrackerRepository.findAllRecordsGreaterThanDate(sevenDaysAgo)
                                                    .onItem().transform(postCountTrackers -> {
                                                        return new SummeryGetDTO(eventCount, eventGetCalendarDTOS, jobCountTracker, postCountTrackers);
                                                    });
                                        });

                            });
                });
    }
}
