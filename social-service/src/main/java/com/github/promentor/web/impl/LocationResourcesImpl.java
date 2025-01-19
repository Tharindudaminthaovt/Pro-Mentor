package com.github.promentor.web.impl;

import com.github.promentor.data.repository.LocationRepository;
import com.github.promentor.exceptions.ErrorCode;
import com.github.promentor.exceptions.custom.AlreadyAvailableException;
import com.github.promentor.exceptions.custom.NotFoundException;
import com.github.promentor.mappers.LocationMapper;
import com.github.promentor.utils.IdConverter;
import com.github.promentor.web.dto.*;
import io.quarkus.logging.Log;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;

import java.util.List;

@ApplicationScoped
public class LocationResourcesImpl {

    private final LocationRepository locationRepository;
    private final LocationMapper locationMapper;

    public LocationResourcesImpl(LocationRepository locationRepository, LocationMapper locationMapper) {
        this.locationRepository = locationRepository;
        this.locationMapper = locationMapper;
    }


    public Uni<LocationGetDTO> createLocation(LocationCreateDTO locationCreateDTO) {

        return locationRepository
                .findByLocation(locationCreateDTO.location())
                .onItem()
                .transformToUni(locationDAO -> {
                    if (locationDAO.isPresent()) {
                        return Uni.createFrom().failure(new AlreadyAvailableException(ErrorCode.LOCATION_AVAILABLE));
                    }
                   return locationRepository.persist(this.locationMapper.toLocationDAO(locationCreateDTO))
                           .onItem().transform(locationMapper::toLocationGetDTO);
                });
    }

    public Uni<LocationGetDTO> getLocationById(String locationId) {
        Log.debug("reserved request to get the location by id: " + locationId);

        ObjectId locationObjectId = IdConverter.getObjectId(locationId);

        return locationRepository
                .findById(locationObjectId)
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.LOCATION_NOT_FOUND))
                .onItem().transform(this.locationMapper::toLocationGetDTO);

    }

    public Uni<List<LocationGetDTO>> getAllLocations(int pageIndex, int pageSize) {

        if (pageSize == 0) {
            return locationRepository
                    .findAll()
                    .stream()
                    .onItem().transform(this.locationMapper::toLocationGetDTO)
                    .collect().asList();
        }

        return locationRepository
                .findAll()
                .page(pageIndex, pageSize)
                .stream()
                .onItem().transform(this.locationMapper::toLocationGetDTO)
                .collect().asList();

    }

    public Uni<LocationGetDTO> updateLocationById(String locationId, LocationUpdateDTO locationUpdateDTO) {
        Log.debug("reserved request to update: " + locationId + " as: " + locationUpdateDTO);

        return this.locationRepository
                .findById(IdConverter.getObjectId(locationId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.LOCATION_NOT_FOUND))
                .onItem()
                .transformToUni(locationDAO -> {
                    Log.debug("available location: " + locationDAO);

                    this.locationMapper.merge(locationDAO, locationUpdateDTO);

                    Log.debug("updated location: " + locationDAO);
                    return locationRepository.update(locationDAO);
                }).onItem().transform(this.locationMapper::toLocationGetDTO);
    }

    public Uni<Void> deleteLocationById(String locationId) {
        Log.debug("reserved request to delete: " + locationId );

        return this.locationRepository
                .findById(IdConverter.getObjectId(locationId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.LOCATION_NOT_FOUND))
                .onItem()
                .transformToUni(locationDAO -> {
                    Log.debug("available location: " + locationDAO);
                    return locationRepository.delete(locationDAO);
                });
    }

}
