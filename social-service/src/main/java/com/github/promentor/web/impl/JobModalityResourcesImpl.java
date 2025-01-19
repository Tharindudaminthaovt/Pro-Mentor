package com.github.promentor.web.impl;

import com.github.promentor.data.repository.JobModalityRepository;
import com.github.promentor.exceptions.ErrorCode;
import com.github.promentor.exceptions.custom.AlreadyAvailableException;
import com.github.promentor.exceptions.custom.NotFoundException;
import com.github.promentor.mappers.JobModalityMapper;
import com.github.promentor.utils.IdConverter;
import com.github.promentor.web.dto.*;
import io.quarkus.logging.Log;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;

import java.util.List;

@ApplicationScoped
public class JobModalityResourcesImpl {

    private final JobModalityRepository jobModalityRepository;
    private final JobModalityMapper jobModalityMapper;

    public JobModalityResourcesImpl(JobModalityRepository jobModalityRepository, JobModalityMapper jobModalityMapper) {
        this.jobModalityRepository = jobModalityRepository;
        this.jobModalityMapper = jobModalityMapper;
    }


    public Uni<JobModalityGetDTO> createJobModality(JobModalityCreateDTO jobModalityCreateDTO) {

        return jobModalityRepository
                .findByKey(jobModalityCreateDTO.key())
                .onItem()
                .transformToUni(jobModalityDAO -> {
                    if (jobModalityDAO.isPresent()) {
                        return Uni.createFrom().failure(new AlreadyAvailableException(ErrorCode.Job_MODALITY_AVAILABLE));
                    }
                   return jobModalityRepository.persist(this.jobModalityMapper.toJobModalityDAO(jobModalityCreateDTO))
                           .onItem().transform(jobModalityMapper::toJobModalityGetDTO);
                });
    }

    public Uni<JobModalityGetDTO> getJobModalityById(String jobModalityId) {
        Log.debug("reserved request to get the job modality by id: " + jobModalityId);

        ObjectId jobModalityObjectId = IdConverter.getObjectId(jobModalityId);

        return jobModalityRepository
                .findById(jobModalityObjectId)
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.Job_MODALITY_NOT_FOUND))
                .onItem().transform(this.jobModalityMapper::toJobModalityGetDTO);

    }

    public Uni<List<JobModalityGetDTO>> getAllJobModalities(int pageIndex, int pageSize) {

        if (pageSize == 0) {
            return jobModalityRepository
                    .findAll()
                    .stream()
                    .onItem().transform(this.jobModalityMapper::toJobModalityGetDTO)
                    .collect().asList();
        }

        return jobModalityRepository
                .findAll()
                .page(pageIndex, pageSize)
                .stream()
                .onItem().transform(this.jobModalityMapper::toJobModalityGetDTO)
                .collect().asList();

    }

    public Uni<JobModalityGetDTO> updateJobModalityById(String jobModalityId, JobModalityUpdateDTO jobModalityUpdateDTO) {
        Log.debug("reserved request to update: " + jobModalityId + " as: " + jobModalityUpdateDTO);

        return this.jobModalityRepository
                .findById(IdConverter.getObjectId(jobModalityId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.Job_MODALITY_NOT_FOUND))
                .onItem()
                .transformToUni(jobModalityDAO -> {
                    Log.debug("available job modality: " + jobModalityDAO);

                    this.jobModalityMapper.merge(jobModalityDAO, jobModalityUpdateDTO);

                    Log.debug("updated job modality: " + jobModalityDAO);
                    return jobModalityRepository.update(jobModalityDAO);
                }).onItem().transform(this.jobModalityMapper::toJobModalityGetDTO);
    }

    public Uni<Void> deleteJobModalityById(String jobModalityId) {
        Log.debug("reserved request to delete: " + jobModalityId );

        return this.jobModalityRepository
                .findById(IdConverter.getObjectId(jobModalityId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.Job_MODALITY_NOT_FOUND))
                .onItem()
                .transformToUni(jobModalityDAO -> {
                    Log.debug("available jobType: " + jobModalityDAO);
                    return jobModalityRepository.delete(jobModalityDAO);
                });
    }

}
