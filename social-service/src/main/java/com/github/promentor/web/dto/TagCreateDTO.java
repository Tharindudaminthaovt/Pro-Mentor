package com.github.promentor.web.dto;

import jakarta.validation.constraints.NotBlank;

public record TagCreateDTO(
        @NotBlank(message = "key required") String key
) {
}
