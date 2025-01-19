package com.github.promentor.web.impl;

import com.github.promentor.data.repository.ModeRepository;
import com.github.promentor.exceptions.ErrorCode;
import com.github.promentor.exceptions.custom.AlreadyAvailableException;
import com.github.promentor.exceptions.custom.NotFoundException;
import com.github.promentor.mappers.ModeMapper;
import com.github.promentor.utils.IdConverter;
import com.github.promentor.web.dto.*;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;

import java.util.List;

@ApplicationScoped
public class ModeResourcesImpl {

    private final ModeRepository modeRepository;
    private final ModeMapper modeMapper;

    public ModeResourcesImpl(ModeRepository modeRepository, ModeMapper modeMapper) {
        this.modeRepository = modeRepository;
        this.modeMapper = modeMapper;
    }


    public Uni<ModeGetDTO> createModes(ModeCreateDTO modeCreateDTO) {

        return modeRepository
                .findByKey(modeCreateDTO.key())
                .onItem()
                .transformToUni(modeDAO -> {
                    if (modeDAO.isPresent()) {
                        return Uni.createFrom().failure(new AlreadyAvailableException(ErrorCode.TAG_TYPE_AVAILABLE));
                    }
                   return modeRepository.persist(this.modeMapper.toModeDAO(modeCreateDTO))
                           .onItem().transform(this.modeMapper::toModeGetDTO);
                });
    }

    public Uni<ModeGetDTO> getModeById(String modeId) {

        ObjectId tagObjectId = IdConverter.getObjectId(modeId);

        return modeRepository
                .findById(tagObjectId)
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.TAG_TYPE_NOT_FOUND))
                .onItem().transform(this.modeMapper::toModeGetDTO);

    }

    public Uni<List<ModeGetDTO>> getAllModes(int pageIndex, int pageSize) {

        if (pageSize == 0) {
            return modeRepository
                    .findAll()
                    .stream()
                    .onItem().transform(this.modeMapper::toModeGetDTO)
                    .collect().asList();
        }

        return modeRepository
                .findAll()
                .page(pageIndex, pageSize)
                .stream()
                .onItem().transform(this.modeMapper::toModeGetDTO)
                .collect().asList();

    }

    public Uni<ModeGetDTO> updateModeById(String modeId, ModeUpdateDTO modeUpdateDTO) {

        return this.modeRepository
                .findById(IdConverter.getObjectId(modeId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.TAG_TYPE_NOT_FOUND))
                .onItem()
                .transformToUni(modeDAO -> {
                    this.modeMapper.merge(modeDAO, modeUpdateDTO);

                    return modeRepository.update(modeDAO);
                }).onItem().transform(this.modeMapper::toModeGetDTO);
    }

    public Uni<Void> deleteModeById(String modeId) {

        return this.modeRepository
                .findById(IdConverter.getObjectId(modeId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.TAG_TYPE_NOT_FOUND))
                .onItem()
                .transformToUni(modeDAO -> {
                    return modeRepository.delete(modeDAO);
                });
    }

}
