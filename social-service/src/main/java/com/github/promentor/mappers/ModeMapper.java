package com.github.promentor.mappers;

import com.github.promentor.data.domain.ModeDAO;
import com.github.promentor.data.domain.TagDAO;
import com.github.promentor.web.dto.*;
import org.mapstruct.*;

@Mapper(
        componentModel = "cdi",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ModeMapper {

    ModeDAO toModeDAO(ModeCreateDTO modeCreateDTO);

    @Mapping(target = "id", expression = "java(modeDAO.id.toString())")
    ModeGetDTO toModeGetDTO(ModeDAO modeDAO);

    @Mapping(target = "id", ignore = true)
    void merge(@MappingTarget ModeDAO target, ModeUpdateDTO source);

}
