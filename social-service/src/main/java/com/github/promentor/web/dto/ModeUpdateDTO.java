package com.github.promentor.web.dto;

import jakarta.validation.constraints.NotBlank;

public record ModeUpdateDTO(
        @NotBlank(message = "key required") String key
) {
}
