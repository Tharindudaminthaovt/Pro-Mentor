package com.github.promentor.web.dto;

import jakarta.validation.constraints.NotBlank;

public record PostCreateDTO (
        @NotBlank(message = "description required")

        String description,
        String imageUrl
) {
}
