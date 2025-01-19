package com.github.promentor.web.dto;

import com.github.promentor.data.domain.JobCountTracker;
import com.github.promentor.data.domain.PostCountTracker;

import java.util.List;

public record SummeryGetDTO(
        Long eventCount,
        List<EventGetCalendarDTO> events,
        List<JobCountTracker> jobCounts,
        List<PostCountTracker> postCounts
) {
}
