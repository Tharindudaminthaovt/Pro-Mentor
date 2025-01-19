package com.github.promentor.mappers;

import com.github.promentor.data.domain.TagDAO;
import com.github.promentor.web.dto.*;
import org.mapstruct.*;

@Mapper(
        componentModel = "cdi",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface TagMapper {

    TagDAO toTagDAO(TagCreateDTO tagCreateDTO);

    @Mapping(target = "id", expression = "java(tagDAO.id.toString())")
    TagGetDTO toTagGetDTO(TagDAO tagDAO);

    @Mapping(target = "id", ignore = true)
    void merge(@MappingTarget TagDAO target, TagUpdateDTO source);

}
