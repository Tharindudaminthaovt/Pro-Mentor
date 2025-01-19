package com.github.promentor.web.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateCommentDTO(
        @NotBlank(message = "comment required and should not be blank")
        String comment
) {
}
