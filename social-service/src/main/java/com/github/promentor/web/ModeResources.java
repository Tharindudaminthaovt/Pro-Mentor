package com.github.promentor.web;

import com.github.promentor.exceptions.ErrorMessage;
import com.github.promentor.web.dto.*;
import com.github.promentor.web.impl.ModeResourcesImpl;
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

@Tag(name = "Mode", description = "Describe the functionalities related to Modes")
@Path("/modes")
@ApplicationScoped
public class ModeResources {

    private final ModeResourcesImpl modeResources;

    public ModeResources(ModeResourcesImpl modeResources) {
        this.modeResources = modeResources;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    @Operation(operationId = "createMode", summary = "create a mode", description = "create a mode")
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
    public Uni<Response> createMode(@Valid ModeCreateDTO modeCreateDTO) {
        Log.info("reserved request to create Mode");

        return this.modeResources
                .createModes(modeCreateDTO)
                .onItem()
                .transform(modeGetDTO -> Response.ok(modeGetDTO).build());
    }

    @GET
    @Path("/{mode-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getModeById", summary = "get a Mode", description = "get a mode by mode id")
    @Parameter(name = "mode-id", description = "unique id of the mode", required = true)
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
    public Uni<Response> getTageById(@PathParam("mode-id") String modeId) {

        return this.modeResources
                .getModeById(modeId)
                .map(tagGetDTO -> Response.ok(tagGetDTO).build());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getModes", summary = "get Modes", description = "get modes with pagination.")
    @Parameter(name = "page", description = "page index. this is 0 base index.", required = true)
    @Parameter(name = "size", description = "size of the page. if want all the items set the size to 0", required = true)
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
    public Uni<Response> getAllModes(@QueryParam("page") int pageIndex, @QueryParam("size") int pageSize) {
        return this.modeResources
                .getAllModes(pageIndex, pageSize)
                .map(tagGetDTOList -> Response.ok(tagGetDTOList).build());
    }

    @PUT
    @Path("/{mode-id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    @Parameter(name = "mode-id", description = "unique id of the mode", required = true)
    @Operation(operationId = "updateMode", summary = "update a mode", description = "update a mode")
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
            ),
            @APIResponse(
                    responseCode = "403",
                    description = "Forbidden",
                    content =  @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
            ),
    })
    public Uni<Response> updateJobType(
            @PathParam("mode-id") String modeId,
            @Valid ModeUpdateDTO modeUpdateDTO
            ) {

        return this.modeResources
                .updateModeById(modeId, modeUpdateDTO)
                .onItem()
                .transform(tagGetDTO -> Response.ok(tagGetDTO).build());

    }

    @DELETE
    @Path("/{mode-id}")
    @RolesAllowed({"user"})
    @Parameter(name = "mode-id", description = "unique id of the mode", required = true)
    @Operation(operationId = "deleteMode", summary = "delete a mode", description = "delete a mode by id")
    public Uni<Response> deleteTag(
            @PathParam("mode-id") String modeId
    ) {

        return this.modeResources
                .deleteModeById(modeId)
                .onItem()
                .transform(response -> Response.ok().build());
    }
}
