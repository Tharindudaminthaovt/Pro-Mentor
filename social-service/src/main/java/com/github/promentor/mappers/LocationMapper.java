package com.github.promentor.mappers;

import com.github.promentor.data.domain.JobTypeDAO;
import com.github.promentor.data.domain.LocationDAO;
import com.github.promentor.web.dto.*;
import org.mapstruct.*;

@Mapper(
        componentModel = "cdi",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface LocationMapper {

    LocationDAO toLocationDAO(LocationCreateDTO locationCreateDTO);

    @Mapping(target = "id", expression = "java(locationDAO.id.toString())")
    LocationGetDTO toLocationGetDTO(LocationDAO locationDAO);

    @Mapping(target = "id", ignore = true)
    void merge(@MappingTarget LocationDAO target, LocationUpdateDTO source);

}
