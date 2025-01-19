package com.github.promentor.web;

import com.github.promentor.exceptions.ErrorMessage;
import com.github.promentor.web.dto.EventCreateDTO;
import com.github.promentor.web.dto.JobCreateDTO;
import com.github.promentor.web.dto.JobTypeGetDTO;
import com.github.promentor.web.impl.EventResourcesImpl;
import com.github.promentor.web.impl.JobResourcesImpl;
import io.quarkus.logging.Log;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.jboss.resteasy.reactive.Separator;

import java.net.URI;
import java.util.List;

@Tag(name = "Event", description = "Describe the functionalities related to events")
@Path("/events")
@ApplicationScoped
public class EventResources {

    private final EventResourcesImpl eventResources;

    public EventResources(EventResourcesImpl eventResources) {
        this.eventResources = eventResources;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    @Operation(operationId = "createEvents", summary = "create a event", description = "create a event")
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
    public Uni<Response> createEvent(@Valid EventCreateDTO eventCreateDTO, @Context SecurityContext sec) {

        return this.eventResources
                .createEvent(eventCreateDTO, sec.getUserPrincipal())
                .onItem()
                .transform(id -> {
                    Log.info("create event with id: " + id);
                    return Response.created(URI.create("/events/" + id)).build();
                });
    }

    @GET
    @Path("/{event-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getEventById", summary = "get a Event", description = "get a event by event id")
    @Parameter(name = "event-id", description = "unique id of the event", required = true)
    @APIResponses( value = {
            @APIResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = JobTypeGetDTO.class))
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
    public Uni<Response> getEventById(@PathParam("event-id") String eventId) {
        Log.info("reserved request to get the event");
        Log.debug("reserved request to get the event with id: " + eventId);

        return this.eventResources
                .geEventById(eventId)
                .map(eventDAO -> Response.ok(eventDAO).build());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getEvents", summary = "get Events", description = "get events with pagination.")
    @Parameter(name = "page", description = "page index. this is 0 base index.", required = true)
    @Parameter(name = "size", description = "size of the page. if want all the items set the size to 0", required = true)
    @Parameter(name = "location-ids", description = "Locations id list")
    @Parameter(name = "mode-ids", description = "Mode id list")
    @Parameter(name = "tag-ids", description = "Tag Id list")
    @Parameter(name = "search", description = "Search")
    @APIResponses( value = {
            @APIResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = JobTypeGetDTO.class))
            ),
            @APIResponse(
                    responseCode = "400",
                    description = "Invalid Request",
                    content =  @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
            )
    })
    public Uni<Response> getAllEvents(@QueryParam("page") int pageIndex, @QueryParam("size") int pageSize,
                                    @QueryParam("location-ids") @Separator(",") List<String> locations,
                                    @QueryParam("mode-ids") @Separator(",") List<String> modes,
                                    @QueryParam("tag-ids") @Separator(",") List<String> tags,
                                    @QueryParam("search") String search) {
        Log.info("reserved request to get modes");
        Log.debug("reserved request to get the modes with pageIndex: " + pageIndex + ", pageSize: " + pageSize);

        return this.eventResources
                .getAllEvents(pageIndex, pageSize, locations, modes, tags, search)
                .map(eventDAOList -> Response.ok(eventDAOList).build());
    }
//
//    @PUT
//    @Path("/{tag-id}")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    @RolesAllowed({"user"})
//    @Parameter(name = "tag-id", description = "unique id of the tag", required = true)
//    @Operation(operationId = "updateTag", summary = "update a tag", description = "update a tag")
//    @APIResponses( value = {
//            @APIResponse(
//                    responseCode = "200",
//                    description = "Success",
//                    content = @Content(
//                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = JobTypeGetDTO.class))
//            ),
//            @APIResponse(
//                    responseCode = "404",
//                    description = "Not Found",
//                    content =  @Content(
//                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
//            ),
//            @APIResponse(
//                    responseCode = "400",
//                    description = "Invalid Request",
//                    content =  @Content(
//                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
//            ),
//            @APIResponse(
//                    responseCode = "403",
//                    description = "Forbidden",
//                    content =  @Content(
//                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
//            ),
//    })
//    public Uni<Response> updateJobType(
//            @PathParam("tag-id") String tagId,
//            @Valid TagUpdateDTO tagUpdateDTO
//    ) {
//        Log.info("reserved request to update tag: " + tagId);
//        Log.debug("request reserved: " + tagUpdateDTO);
//
//        return this.tagResources
//                .updateTageById(tagId, tagUpdateDTO)
//                .onItem()
//                .transform(tagGetDTO -> {
//                    Log.info("updated tag with id: " + tagId);
//                    Log.debug("updated tag: " + tagGetDTO);
//                    return Response.ok(tagGetDTO).build();
//                });
//
//    }
//
    @DELETE
    @Path("/{event-id}")
    @RolesAllowed({"user"})
    @Parameter(name = "event-id", description = "unique id of the event", required = true)
    @Operation(operationId = "deleteEvent", summary = "delete a event", description = "delete a event by id")
    public Uni<Response> deleteEvent(
            @PathParam("event-id") String eventId,
            @Context SecurityContext sec
    ) {
        Log.info("reserved request to delete job: " + eventId);

        return this.eventResources
                .deleteEventById(eventId, sec.getUserPrincipal())
                .onItem()
                .transform(response -> {
                    Log.info("deleted event with id: " + eventId);
                    return Response.ok().build();
                });
    }
}
