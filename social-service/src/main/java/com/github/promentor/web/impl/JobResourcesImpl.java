package com.github.promentor.web.impl;

import com.github.promentor.data.domain.JobDAO;
import com.github.promentor.data.domain.TagDAO;
import com.github.promentor.data.repository.*;
import com.github.promentor.exceptions.ErrorCode;
import com.github.promentor.exceptions.custom.NotAuthorizeException;
import com.github.promentor.exceptions.custom.NotFoundException;
import com.github.promentor.mappers.TagMapper;
import com.github.promentor.utils.IdConverter;
import com.github.promentor.web.dto.JobCreateDTO;
import io.quarkus.logging.Log;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;

import java.security.Principal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class JobResourcesImpl {

    private final TagRepository tagRepository;
    private final JobTypeRepository jobTypeRepository;
    private final LocationRepository locationRepository;
    private final JobModalityRepository jobModalityRepository;
    private final JobRepository jobRepository;
    private final JobCountTrackerRepository jobCountTrackerRepository;
    private final TagMapper tagMapper;

    public JobResourcesImpl(TagRepository tagRepository, JobTypeRepository jobTypeRepository, LocationRepository locationRepository, JobModalityRepository jobModalityRepository, JobRepository jobRepository, JobCountTrackerRepository jobCountTrackerRepository, TagMapper tagMapper) {
        this.tagRepository = tagRepository;
        this.jobTypeRepository = jobTypeRepository;
        this.locationRepository = locationRepository;
        this.jobModalityRepository = jobModalityRepository;
        this.jobRepository = jobRepository;
        this.jobCountTrackerRepository = jobCountTrackerRepository;
        this.tagMapper = tagMapper;
    }

    public Uni<String> createJob(JobCreateDTO jobCreateDTO, Principal principal) {

        return locationRepository
                .findById(IdConverter.getObjectId(jobCreateDTO.locationId()))
                .onItem()
                .ifNull().failWith(new NotFoundException(ErrorCode.LOCATION_NOT_FOUND))
                .onItem().transformToUni(locationDAO -> {
                    return jobTypeRepository
                            .findById(IdConverter.getObjectId(jobCreateDTO.typeId()))
                            .onItem()
                            .ifNull().failWith(new NotFoundException(ErrorCode.Job_TYPE_NOT_FOUND))
                            .onItem().transformToUni(jobTypeDAO -> {
                                return jobModalityRepository
                                        .findById(IdConverter.getObjectId(jobCreateDTO.modalityId()))
                                        .onItem()
                                        .ifNull().failWith(new NotFoundException(ErrorCode.Job_MODALITY_NOT_FOUND))
                                        .onItem().transformToUni(jobModalityDAO -> {

                                            var a = jobCreateDTO
                                                    .tags().stream().map(tagGetDTO -> {
                                                        return new TagDAO(IdConverter.getObjectId(tagGetDTO.id()), tagGetDTO.key());
                                                    }).collect(Collectors.toList());

                                            return jobRepository.persist(new JobDAO(
                                                    jobCreateDTO.title(),
                                                    jobCreateDTO.description(),
                                                    locationDAO,
                                                    jobTypeDAO,
                                                    jobModalityDAO,
                                                    a, jobCreateDTO.companyName(),
                                                            principal.getName()
                                            ))
                                                    .onItem().transformToUni(jobPersistObject -> {
                                                        return jobCountTrackerRepository.addCount(jobPersistObject.createdAt.truncatedTo(ChronoUnit.DAYS))
                                                                .onItem().transform(jobCountTracker -> {
                                                                    return jobPersistObject.id.toString();
                                                                });

                                                    });

                                        });
                            });
                });
    }

    public Uni<JobDAO> geJobById(String jobId) {
        Log.debug("reserved request to get the job by id: " + jobId);

        ObjectId tagObjectId = IdConverter.getObjectId(jobId);

        return jobRepository
                .findById(tagObjectId)
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.JOB_NOT_FOUND));
//                .onItem().transform(this.tagMapper::toTagGetDTO);

    }

    public Uni<List<JobDAO>> getAllJobs(int pageIndex, int pageSize, List<String> locations, List<String> modalities, List<String> types, List<String> tags, String search) {

        if (pageSize == 0) {
            return jobRepository
                    .findAll()
                    .stream()
                    .filter(jobDAO -> (
                            (locations.size() == 0 || locations.getFirst().isBlank() || locations.contains(jobDAO.location.id.toString())) &&
                            (modalities.size() == 0 || modalities.getFirst().isBlank() || modalities.contains(jobDAO.modality.id.toString())) &&
                            (types.size() == 0 || types.getFirst().isBlank() || types.contains(jobDAO.type.id.toString())) &&
                                    (tags.size() == 0 || tags.getFirst().isBlank() || abc(tags, jobDAO.tags.stream().map(tagDAO -> tagDAO.id.toString()).toList())) &&
                                    (search == null || search.isBlank() || jobDAO.title.toLowerCase().contains(search.toLowerCase()) || jobDAO.description.toLowerCase().contains(search.toLowerCase()) || jobDAO.companyName.toLowerCase().contains(search.toLowerCase()))
                    ))
                    .collect().asList();
        }

        return jobRepository
                .findAll()
                .page(pageIndex, pageSize)
                .stream()
                .filter(jobDAO -> (
                                (locations.size() == 0 || locations.getFirst().isBlank() || locations.contains(jobDAO.location.id.toString())) &&
                                        (modalities.size() == 0 || modalities.getFirst().isBlank() || modalities.contains(jobDAO.modality.id.toString())) &&
                                        (types.size() == 0 || types.getFirst().isBlank() || types.contains(jobDAO.type.id.toString())) &&
                                        (tags.size() == 0 || tags.getFirst().isBlank() || abc(tags, jobDAO.tags.stream().map(tagDAO -> tagDAO.id.toString()).toList())) &&
                                        (search == null || search.isBlank() || jobDAO.title.toLowerCase().contains(search.toLowerCase()) || jobDAO.description.toLowerCase().contains(search.toLowerCase()) || jobDAO.companyName.toLowerCase().contains(search.toLowerCase()))
                        )
                )
                .collect().asList();

    }

    public boolean abc(List<String> check, List<String> source) {

        return check.stream().anyMatch(source::contains);
    }

//
//    public Uni<TagGetDTO> updateTageById(String tagId, TagUpdateDTO tagUpdateDTO) {
//        Log.debug("reserved request to update: " + tagId + " as: " + tagUpdateDTO);
//
//        return this.tagRepository
//                .findById(IdConverter.getObjectId(tagId))
//                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.TAG_TYPE_NOT_FOUND))
//                .onItem()
//                .transformToUni(tagDAO -> {
//                    Log.debug("available tag: " + tagDAO);
//
//                    this.tagMapper.merge(tagDAO, tagUpdateDTO);
//
//                    Log.debug("updated tag: " + tagDAO);
//                    return tagRepository.update(tagDAO);
//                }).onItem().transform(this.tagMapper::toTagGetDTO);
//    }
//
    public Uni<Void> deleteJobById(String jobId, Principal principal) {
        Log.debug("reserved request to delete: " + jobId );

        return this.jobRepository
                .findById(IdConverter.getObjectId(jobId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.JOB_NOT_FOUND))
                .onItem()
                .transformToUni(jobDAO -> {
                    Log.debug("available tag: " + jobId);
                    if (!jobDAO.createdBy.equals(principal.getName())) {
                        return Uni.createFrom().failure(new NotAuthorizeException(ErrorCode.NOT_JOB_OWNER));
                    }
                    return jobRepository.delete(jobDAO)
                            .onItem().transformToUni(unused -> {
                                return jobCountTrackerRepository
                                        .removeCount(jobDAO.createdAt.truncatedTo(ChronoUnit.DAYS))
                                        .onItem().transform(jobCountTracker -> unused);
                            });
                });
    }

}
