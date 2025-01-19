package com.github.promentor.web.impl;

import com.github.promentor.data.repository.TagRepository;
import com.github.promentor.exceptions.ErrorCode;
import com.github.promentor.exceptions.custom.AlreadyAvailableException;
import com.github.promentor.exceptions.custom.NotFoundException;
import com.github.promentor.mappers.TagMapper;
import com.github.promentor.utils.IdConverter;
import com.github.promentor.web.dto.*;
import io.quarkus.logging.Log;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;

import java.util.List;

@ApplicationScoped
public class TagResourcesImpl {

    private final TagRepository tagRepository;
    private final TagMapper tagMapper;

    public TagResourcesImpl(TagRepository tagRepository, TagMapper tagMapper) {
        this.tagRepository = tagRepository;
        this.tagMapper = tagMapper;
    }

    public Uni<TagGetDTO> createTags(TagCreateDTO tagCreateDTO) {

        return tagRepository
                .findByKey(tagCreateDTO.key())
                .onItem()
                .transformToUni(tagDAO -> {
                    if (tagDAO.isPresent()) {
                        return Uni.createFrom().failure(new AlreadyAvailableException(ErrorCode.TAG_TYPE_AVAILABLE));
                    }
                   return tagRepository.persist(this.tagMapper.toTagDAO(tagCreateDTO))
                           .onItem().transform(this.tagMapper::toTagGetDTO);
                });
    }

    public Uni<TagGetDTO> getTagById(String tagId) {
        Log.debug("reserved request to get the tag by id: " + tagId);

        ObjectId tagObjectId = IdConverter.getObjectId(tagId);

        return tagRepository
                .findById(tagObjectId)
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.TAG_TYPE_NOT_FOUND))
                .onItem().transform(this.tagMapper::toTagGetDTO);

    }

    public Uni<List<TagGetDTO>> getAllTags(int pageIndex, int pageSize) {

        if (pageSize == 0) {
            return tagRepository
                    .findAll()
                    .stream()
                    .onItem().transform(this.tagMapper::toTagGetDTO)
                    .collect().asList();
        }

        return tagRepository
                .findAll()
                .page(pageIndex, pageSize)
                .stream()
                .onItem().transform(this.tagMapper::toTagGetDTO)
                .collect().asList();

    }

    public Uni<TagGetDTO> updateTageById(String tagId, TagUpdateDTO tagUpdateDTO) {
        Log.debug("reserved request to update: " + tagId + " as: " + tagUpdateDTO);

        return this.tagRepository
                .findById(IdConverter.getObjectId(tagId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.TAG_TYPE_NOT_FOUND))
                .onItem()
                .transformToUni(tagDAO -> {
                    Log.debug("available tag: " + tagDAO);

                    this.tagMapper.merge(tagDAO, tagUpdateDTO);

                    Log.debug("updated tag: " + tagDAO);
                    return tagRepository.update(tagDAO);
                }).onItem().transform(this.tagMapper::toTagGetDTO);
    }

    public Uni<Void> deleteTagById(String tagId) {
        Log.debug("reserved request to delete: " + tagId );

        return this.tagRepository
                .findById(IdConverter.getObjectId(tagId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.TAG_TYPE_NOT_FOUND))
                .onItem()
                .transformToUni(tagDAO -> {
                    Log.debug("available tag: " + tagDAO);
                    return tagRepository.delete(tagDAO);
                });
    }

}
