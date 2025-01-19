package com.github.promentor.mappers;

import com.github.promentor.data.domain.JobTypeDAO;
import com.github.promentor.data.domain.PostDAO;
import com.github.promentor.web.dto.JobTypeCreateDTO;
import com.github.promentor.web.dto.JobTypeGetDTO;
import com.github.promentor.web.dto.JobTypeUpdateDTO;
import com.github.promentor.web.dto.PostUpdateDTO;
import org.mapstruct.*;

@Mapper(
        componentModel = "cdi",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface JobTypeMapper {

    JobTypeDAO toJobTypeDAO(JobTypeCreateDTO jobTypeCreateDTO);

    @Mapping(target = "id", expression = "java(jobTypeDAO.id.toString())")
    JobTypeGetDTO toJobTypeGetDTO(JobTypeDAO jobTypeDAO);

    @Mapping(target = "id", ignore = true)
    void merge(@MappingTarget JobTypeDAO target, JobTypeUpdateDTO source);

}
