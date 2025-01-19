package com.github.promentor.web.dto;

import jakarta.validation.constraints.NotBlank;

public record LocationCreateDTO(
        @NotBlank(message = "location required") String location
) {
}
