package com.github.promentor.mappers;

import com.github.promentor.data.domain.PostDAO;
import com.github.promentor.web.dto.PostCreateDTO;
import com.github.promentor.web.dto.PostGetDTO;
import com.github.promentor.web.dto.PostUpdateDTO;
import org.mapstruct.*;

@Mapper(
        componentModel = "cdi",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface PostMapper {

    PostDAO toPostDAO(PostCreateDTO postCreateDTO);

    @Mapping(target = "id", expression = "java(postDAO.id.toString())")
    PostGetDTO toPostGetDTO(PostDAO postDAO);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "updatedAt", expression = "java(java.time.Instant.now())")
    void merge(@MappingTarget PostDAO target, PostUpdateDTO source);

}
