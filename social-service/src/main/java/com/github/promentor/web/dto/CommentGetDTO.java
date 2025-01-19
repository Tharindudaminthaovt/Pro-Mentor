package com.github.promentor.web.dto;

import java.time.Instant;

public record CommentGetDTO(
        String id,
        String comment,
        Instant createdAt,
        Instant updatedAt,
        String postId,
        String username
) {
}
