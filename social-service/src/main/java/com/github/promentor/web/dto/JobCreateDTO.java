package com.github.promentor.web.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record JobCreateDTO(
        @NotBlank(message = "title required") String title,
        @NotBlank(message = "description required") String description,
        @NotBlank(message = "company name required") String companyName,
        @NotBlank(message = "location id required") String locationId,
        @NotBlank(message = "type id required") String typeId,
        @NotBlank(message = "modality id required") String modalityId,
        List<TagGetDTO> tags

) {
}
