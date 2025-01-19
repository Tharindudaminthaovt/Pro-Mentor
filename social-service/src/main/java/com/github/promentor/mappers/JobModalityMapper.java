package com.github.promentor.mappers;

import com.github.promentor.data.domain.JobModalityDAO;
import com.github.promentor.web.dto.*;
import org.mapstruct.*;

@Mapper(
        componentModel = "cdi",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface JobModalityMapper {

    JobModalityDAO toJobModalityDAO(JobModalityCreateDTO jobModalityCreateDTO);

    @Mapping(target = "id", expression = "java(jobModalityDAO.id.toString())")
    JobModalityGetDTO toJobModalityGetDTO(JobModalityDAO jobModalityDAO);

    @Mapping(target = "id", ignore = true)
    void merge(@MappingTarget JobModalityDAO target, JobModalityUpdateDTO source);

}
