package com.github.promentor.web;

import com.github.promentor.exceptions.ErrorMessage;
import com.github.promentor.web.dto.LocationCreateDTO;
import com.github.promentor.web.dto.LocationGetDTO;
import com.github.promentor.web.dto.LocationUpdateDTO;
import com.github.promentor.web.impl.LocationResourcesImpl;
import io.quarkus.logging.Log;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Tag(name = "Location", description = "Describe the functionalities related to location")
@Path("/locations")
@ApplicationScoped
public class LocationResources {

    private final LocationResourcesImpl locationResources;

    public LocationResources(LocationResourcesImpl locationResources) {
        this.locationResources = locationResources;
    }


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    @Operation(operationId = "createLocation", summary = "create a location", description = "create a location")
    @APIResponses( value = {
            @APIResponse(
                    responseCode = "201",
                    description = "Created",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = String.class))
            ),
            @APIResponse(
                    responseCode = "400",
                    description = "Invalid Request",
                    content =  @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
            ),
            @APIResponse(
                    responseCode = "403",
                    description = "Forbidden",
                    content =  @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
            ),

    })
    public Uni<Response> createLocation(@Valid LocationCreateDTO locationCreateDTO) {
        Log.info("reserved request to create location");
        Log.debug("request reserved: " + locationCreateDTO);

        return this.locationResources
                .createLocation(locationCreateDTO)
                .onItem()
                .transform(locationGetDTO -> Response.ok(locationGetDTO).build());
    }

    @GET
    @Path("/{location-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getLocationById", summary = "get a Location", description = "get a location by location id")
    @Parameter(name = "location-id", description = "location id of the location", required = true)
    @APIResponses( value = {
            @APIResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = LocationGetDTO.class))
            ),
            @APIResponse(
                    responseCode = "404",
                    description = "Not Found",
                    content =  @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
            ),
            @APIResponse(
                    responseCode = "400",
                    description = "Invalid Request",
                    content =  @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
            )
    })
    public Uni<Response> getLocationById(@PathParam("location-id") String locationId) {
        Log.info("reserved request to get the location");
        Log.debug("reserved request to get the location with id: " + locationId);

        return this.locationResources
                .getLocationById(locationId)
                .map(locationGetDTO -> Response.ok(locationGetDTO).build());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getLocations", summary = "get Locations", description = "get a locations with pagination.")
    @Parameter(name = "page", description = "page index. this is 0 base index.", required = true)
    @Parameter(name = "size", description = "size of the page. if want all the items set the size to 0", required = true)
    @APIResponses( value = {
            @APIResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = LocationGetDTO.class))
            ),
            @APIResponse(
                    responseCode = "400",
                    description = "Invalid Request",
                    content =  @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
            )
    })
    public Uni<Response> getAllLocations(@QueryParam("page") int pageIndex, @QueryParam("size") int pageSize) {
        Log.info("reserved request to get locations");
        Log.debug("reserved request to get the locations with pageIndex: " + pageIndex + ", pageSize: " + pageSize);

        return this.locationResources
                .getAllLocations(pageIndex, pageSize)
                .map(locationGetDTOS -> Response.ok(locationGetDTOS).build());
    }

    @PUT
    @Path("/{location-id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    @Parameter(name = "location-id", description = "unique id of the location type", required = true)
    @Operation(operationId = "updateLocation", summary = "update a location", description = "update a location")
    @APIResponses( value = {
            @APIResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = LocationGetDTO.class))
            ),
            @APIResponse(
                    responseCode = "404",
                    description = "Not Found",
                    content =  @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
            ),
            @APIResponse(
                    responseCode = "400",
                    description = "Invalid Request",
                    content =  @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
            ),
            @APIResponse(
                    responseCode = "403",
                    description = "Forbidden",
                    content =  @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
            ),
    })
    public Uni<Response> updateJobType(
            @PathParam("location-id") String locationId,
            @Valid LocationUpdateDTO locationUpdateDTO
    ) {
        Log.info("reserved request to update location: " + locationId);
        Log.debug("request reserved: " + locationUpdateDTO);

        return this.locationResources
                .updateLocationById(locationId, locationUpdateDTO)
                .onItem()
                .transform(locationGetDTO -> {
                    Log.info("updated location with id: " + locationId);
                    Log.debug("updated location: " + locationGetDTO);
                    return Response.ok(locationGetDTO).build();
                });

    }

    @DELETE
    @Path("/{location-id}")
    @RolesAllowed({"user"})
    @Parameter(name = "location-id", description = "unique id of the location", required = true)
    @Operation(operationId = "deleteLocation", summary = "delete a location", description = "delete a location by id")
    public Uni<Response> deleteLocation(
            @PathParam("location-id") String locationId
    ) {
        Log.info("reserved request to delete location: " + locationId);

        return this.locationResources
                .deleteLocationById(locationId)
                .onItem()
                .transform(response -> {
                    Log.info("deleted location with id: " + locationId);
                    return Response.ok().build();
                });
    }
}
