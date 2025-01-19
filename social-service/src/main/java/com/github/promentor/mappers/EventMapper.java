package com.github.promentor.mappers;

import com.github.promentor.data.domain.EventDAO;
import com.github.promentor.web.dto.EventGetCalendarDTO;
import org.mapstruct.*;

@Mapper(
        componentModel = "cdi",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface EventMapper {

    @Mapping(target = "id", expression = "java(eventDAO.id.toString())")
    @Mapping(target = "desc", source = "description")
    @Mapping(target = "start", expression = "java(eventDAO.createdAt.truncatedTo(java.time.temporal.ChronoUnit.DAYS))")
    @Mapping(target = "end", expression = "java(eventDAO.createdAt.truncatedTo(java.time.temporal.ChronoUnit.DAYS))")
    EventGetCalendarDTO toEventGetCalendarDTO(EventDAO eventDAO);

}
