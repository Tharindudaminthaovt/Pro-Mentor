package com.github.promentor.web.impl;

import com.github.promentor.data.domain.EventDAO;
import com.github.promentor.data.domain.TagDAO;
import com.github.promentor.data.repository.*;
import com.github.promentor.exceptions.ErrorCode;
import com.github.promentor.exceptions.custom.NotAuthorizeException;
import com.github.promentor.exceptions.custom.NotFoundException;
import com.github.promentor.utils.IdConverter;
import com.github.promentor.web.dto.EventCreateDTO;
import io.quarkus.logging.Log;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class EventResourcesImpl {
    private final LocationRepository locationRepository;
    private final ModeRepository modeRepository;
    private final EventRepository eventRepository;

    public EventResourcesImpl(LocationRepository locationRepository, ModeRepository modeRepository, EventRepository eventRepository) {
        this.locationRepository = locationRepository;
        this.modeRepository = modeRepository;
        this.eventRepository = eventRepository;
    }


    public Uni<String> createEvent(EventCreateDTO eventCreateDTO, Principal principal) {

        return locationRepository
                .findById(IdConverter.getObjectId(eventCreateDTO.locationId()))
                .onItem()
                .ifNull().failWith(new NotFoundException(ErrorCode.LOCATION_NOT_FOUND))
                .onItem().transformToUni(locationDAO -> {
                    return modeRepository
                            .findById(IdConverter.getObjectId(eventCreateDTO.modeId()))
                            .onItem()
                            .ifNull().failWith(new NotFoundException(ErrorCode.Job_TYPE_NOT_FOUND))
                            .onItem().transformToUni(modeDAO -> {

                                var a = eventCreateDTO
                                        .tags().stream().map(tagGetDTO -> {
                                            return new TagDAO(IdConverter.getObjectId(tagGetDTO.id()), tagGetDTO.key());
                                        }).collect(Collectors.toList());

                                return eventRepository.persist(new EventDAO(
                                                    eventCreateDTO.title(),
                                                    eventCreateDTO.companyName(),
                                                    eventCreateDTO.description(),
                                                    eventCreateDTO.url(),
                                                    locationDAO,
                                                    modeDAO,
                                                principal.getName(),
                                                    a,
                                        eventCreateDTO.time()
                                        ))
                                        .onItem().transform(eventPersistObject -> eventPersistObject.id.toString());

                            });
                });
    }

    public Uni<EventDAO> geEventById(String eventId) {
        Log.debug("reserved request to get the event by id: " + eventId);

        ObjectId tagObjectId = IdConverter.getObjectId(eventId);

        return eventRepository
                .findById(tagObjectId)
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.JOB_NOT_FOUND));
//                .onItem().transform(this.tagMapper::toTagGetDTO);

    }

    public Uni<List<EventDAO>> getAllEvents(int pageIndex, int pageSize, List<String> locations, List<String> modes, List<String> tags, String search) {

        if (pageSize == 0) {
            return eventRepository
                    .findAll()
                    .stream()
                    .filter(jobDAO -> (
                            (locations.size() == 0 || locations.getFirst().isBlank() || locations.contains(jobDAO.location.id.toString())) &&
                            (modes.size() == 0 || modes.getFirst().isBlank() || modes.contains(jobDAO.mode.id.toString())) &&
                                    (tags.size() == 0 || tags.getFirst().isBlank() || abc(tags, jobDAO.tags.stream().map(tagDAO -> tagDAO.id.toString()).toList())) &&
                                    (search == null || search.isBlank() || jobDAO.title.toLowerCase().contains(search.toLowerCase()) || jobDAO.description.toLowerCase().contains(search.toLowerCase()) || jobDAO.companyName.toLowerCase().contains(search.toLowerCase()))
                    ))
                    .collect().asList();
        }

        return eventRepository
                .findAll()
                .page(pageIndex, pageSize)
                .stream()
                .filter(jobDAO -> (
                                (locations.size() == 0 || locations.getFirst().isBlank() || locations.contains(jobDAO.location.id.toString())) &&
                                        (modes.size() == 0 || modes.getFirst().isBlank() || modes.contains(jobDAO.mode.id.toString())) &&
                                        (tags.size() == 0  || tags.getFirst().isBlank() || abc(tags, jobDAO.tags.stream().map(tagDAO -> tagDAO.id.toString()).toList())) &&
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
    public Uni<Void> deleteEventById(String eventId, Principal principal) {
        Log.debug("reserved request to delete: " + eventId );

        return this.eventRepository
                .findById(IdConverter.getObjectId(eventId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.JOB_NOT_FOUND))
                .onItem()
                .transformToUni(eventDAO -> {
                    Log.debug("available tag: " + eventId);
                    if (!eventDAO.createdBy.equals(principal.getName())) {
                        return Uni.createFrom().failure(new NotAuthorizeException(ErrorCode.NOT_JOB_OWNER));
                    }
                    return eventRepository.delete(eventDAO);
                });
    }

}
