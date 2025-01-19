package com.github.promentor.web.dto;

import jakarta.validation.constraints.NotBlank;

public record JobModalityCreateDTO(
        @NotBlank(message = "key required") String key
) {
}
