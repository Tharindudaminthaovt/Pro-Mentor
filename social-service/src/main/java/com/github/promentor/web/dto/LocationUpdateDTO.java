package com.github.promentor.web.dto;

import jakarta.validation.constraints.NotBlank;

public record LocationUpdateDTO(
        @NotBlank(message = "location required") String location
) {
}
