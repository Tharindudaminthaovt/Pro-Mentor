package com.github.promentor.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.List;

public record EventCreateDTO(
        @NotBlank(message = "title required") String title,
        @NotBlank(message = "description required") String description,
        @NotBlank(message = "company name required") String companyName,
        @NotBlank(message = "location id required") String locationId,
        String url,
        @NotBlank(message = "modality id required") String modeId,
        List<TagGetDTO> tags,
        @NotNull(message = "created time required") Instant time

) {
}
