package com.github.promentor.web.dto;

import jakarta.validation.constraints.NotBlank;

public record TagUpdateDTO(
        @NotBlank(message = "key required") String key
) {
}
