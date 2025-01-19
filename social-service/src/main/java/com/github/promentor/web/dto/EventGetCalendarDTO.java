package com.github.promentor.web.dto;

import java.time.Instant;

public record EventGetCalendarDTO(
        String id,
        String title,
        String desc,
        Instant start,
        Instant end,
        Instant time
) {
}
