package com.github.promentor.web.impl;

import com.github.promentor.data.repository.JobTypeRepository;
import com.github.promentor.exceptions.ErrorCode;
import com.github.promentor.exceptions.custom.AlreadyAvailableException;
import com.github.promentor.exceptions.custom.NotFoundException;
import com.github.promentor.mappers.JobTypeMapper;
import com.github.promentor.utils.IdConverter;
import com.github.promentor.web.dto.JobTypeCreateDTO;
import com.github.promentor.web.dto.JobTypeGetDTO;
import com.github.promentor.web.dto.JobTypeUpdateDTO;
import io.quarkus.logging.Log;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;

import java.util.List;

@ApplicationScoped
public class JobTypeResourcesImpl {

    private final JobTypeRepository jobTypeRepository;
    private final JobTypeMapper jobTypeMapper;

    public JobTypeResourcesImpl(JobTypeRepository jobTypeRepository, JobTypeMapper jobTypeMapper) {
        this.jobTypeRepository = jobTypeRepository;
        this.jobTypeMapper = jobTypeMapper;
    }

    public Uni<JobTypeGetDTO> createJobType(JobTypeCreateDTO jobTypeCreateDTO) {

        return jobTypeRepository
                .findByKey(jobTypeCreateDTO.key())
                .onItem()
                .transformToUni(jobTypeDAO -> {
                    if (jobTypeDAO.isPresent()) {
                        return Uni.createFrom().failure(new AlreadyAvailableException(ErrorCode.Job_TYPE_AVAILABLE));
                    }
                   return jobTypeRepository.persist(this.jobTypeMapper.toJobTypeDAO(jobTypeCreateDTO))
                           .onItem().transform(jobTypeMapper::toJobTypeGetDTO);
                });
    }

    public Uni<JobTypeGetDTO> getJobTypeById(String jobTypeId) {
        Log.debug("reserved request to get the job type by id: " + jobTypeId);

        ObjectId jobTypeObjectId = IdConverter.getObjectId(jobTypeId);

        return jobTypeRepository
                .findById(jobTypeObjectId)
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.Job_TYPE_NOT_FOUND))
                .onItem().transform(this.jobTypeMapper::toJobTypeGetDTO);

    }

    public Uni<List<JobTypeGetDTO>> getAllJobTypes(int pageIndex, int pageSize) {

        if (pageSize == 0) {
            return jobTypeRepository
                    .findAll()
                    .stream()
                    .onItem().transform(this.jobTypeMapper::toJobTypeGetDTO)
                    .collect().asList();
        }

        return jobTypeRepository
                .findAll()
                .page(pageIndex, pageSize)
                .stream()
                .onItem().transform(this.jobTypeMapper::toJobTypeGetDTO)
                .collect().asList();

    }

    public Uni<JobTypeGetDTO> updateJobTypeById(String jobTypeId, JobTypeUpdateDTO jobTypeUpdateDTO) {
        Log.debug("reserved request to update: " + jobTypeId + " as: " + jobTypeUpdateDTO);

        return this.jobTypeRepository
                .findById(IdConverter.getObjectId(jobTypeId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.Job_TYPE_NOT_FOUND))
                .onItem()
                .transformToUni(jobTypeDAO -> {
                    Log.debug("available job type: " + jobTypeDAO);

                    this.jobTypeMapper.merge(jobTypeDAO, jobTypeUpdateDTO);

                    Log.debug("updated job type: " + jobTypeDAO);
                    return jobTypeRepository.update(jobTypeDAO);
                }).onItem().transform(this.jobTypeMapper::toJobTypeGetDTO);
    }

    public Uni<Void> deleteJobTypeById(String jobTypeId) {
        Log.debug("reserved request to delete: " + jobTypeId );

        return this.jobTypeRepository
                .findById(IdConverter.getObjectId(jobTypeId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.Job_TYPE_NOT_FOUND))
                .onItem()
                .transformToUni(jobTypeDAO -> {
                    Log.debug("available jobType: " + jobTypeDAO);
                    return jobTypeRepository.delete(jobTypeDAO);
                });
    }

}
