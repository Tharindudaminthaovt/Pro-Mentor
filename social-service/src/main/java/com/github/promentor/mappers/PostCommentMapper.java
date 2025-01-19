package com.github.promentor.mappers;

import com.github.promentor.data.domain.PostCommentDAO;
import com.github.promentor.web.dto.CommentGetDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "cdi",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface PostCommentMapper {

    @Mapping(target = "id", expression = "java(postCommentDAO.id.toString())")
    @Mapping(target = "postId", expression = "java(postCommentDAO.postId.toString())")
    CommentGetDTO toCommentGetDTO(PostCommentDAO postCommentDAO);

}
