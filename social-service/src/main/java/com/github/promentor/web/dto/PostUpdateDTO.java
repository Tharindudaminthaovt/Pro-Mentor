package com.github.promentor.web.dto;

import jakarta.validation.constraints.NotBlank;


public record PostUpdateDTO(
        @NotBlank(message = "description required")
        String description,
        String imageUrl
) {
}
