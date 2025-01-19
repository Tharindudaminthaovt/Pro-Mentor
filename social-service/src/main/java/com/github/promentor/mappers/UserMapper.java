package com.github.promentor.mappers;

import com.github.promentor.data.domain.UserDAO;
import com.github.promentor.rabbitmq.model.UserCreated;
import com.github.promentor.web.dto.UserGetDTO;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "cdi",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface UserMapper {

    UserDAO toUserDAO(UserCreated userCreated);

    UserGetDTO toUserDTO(UserDAO userDAO);

}
