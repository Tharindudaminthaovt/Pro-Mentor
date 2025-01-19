package com.github.promentor.web.dto;

public record UserGetDTO (
        String id,
        String username,
        String email,
        String firstName,
        String lastName,
        String tenantId
) {
}
