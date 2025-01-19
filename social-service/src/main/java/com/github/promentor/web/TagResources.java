package com.github.promentor.web;

import com.github.promentor.exceptions.ErrorMessage;
import com.github.promentor.web.dto.*;
import com.github.promentor.web.impl.TagResourcesImpl;
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

import java.net.URI;

@Tag(name = "Tag", description = "Describe the functionalities related to Tags")
@Path("/tags")
@ApplicationScoped
public class TagResources {

    private final TagResourcesImpl tagResources;

    public TagResources(TagResourcesImpl tagResources) {
        this.tagResources = tagResources;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    @Operation(operationId = "createTag", summary = "create a tag", description = "create a tag")
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
    public Uni<Response> createTag(@Valid TagCreateDTO tagCreateDTO) {
        Log.info("reserved request to create Tag");
        Log.debug("request reserved: " + tagCreateDTO);

        return this.tagResources
                .createTags(tagCreateDTO)
                .onItem()
                .transform(tagGetDTO -> Response.ok(tagGetDTO).build());
    }

    @GET
    @Path("/{tag-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getTagById", summary = "get a Tag", description = "get a tag by tag id")
    @Parameter(name = "tag-id", description = "unique id of the tag", required = true)
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
    public Uni<Response> getTageById(@PathParam("tag-id") String tagId) {
        Log.info("reserved request to get the tag");
        Log.debug("reserved request to get the tag with id: " + tagId);

        return this.tagResources
                .getTagById(tagId)
                .map(tagGetDTO -> Response.ok(tagGetDTO).build());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getTags", summary = "get Tags", description = "get tags with pagination.")
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
    public Uni<Response> getAllTags(@QueryParam("page") int pageIndex, @QueryParam("size") int pageSize) {
        Log.info("reserved request to get tags");
        Log.debug("reserved request to get the tags with pageIndex: " + pageIndex + ", pageSize: " + pageSize);

        return this.tagResources
                .getAllTags(pageIndex, pageSize)
                .map(tagGetDTOList -> Response.ok(tagGetDTOList).build());
    }

    @PUT
    @Path("/{tag-id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    @Parameter(name = "tag-id", description = "unique id of the tag", required = true)
    @Operation(operationId = "updateTag", summary = "update a tag", description = "update a tag")
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
            @PathParam("tag-id") String tagId,
            @Valid TagUpdateDTO tagUpdateDTO
    ) {
        Log.info("reserved request to update tag: " + tagId);
        Log.debug("request reserved: " + tagUpdateDTO);

        return this.tagResources
                .updateTageById(tagId, tagUpdateDTO)
                .onItem()
                .transform(tagGetDTO -> {
                    Log.info("updated tag with id: " + tagId);
                    Log.debug("updated tag: " + tagGetDTO);
                    return Response.ok(tagGetDTO).build();
                });

    }

    @DELETE
    @Path("/{tag-id}")
    @RolesAllowed({"user"})
    @Parameter(name = "tag-id", description = "unique id of the tag", required = true)
    @Operation(operationId = "deleteTag", summary = "delete a tag", description = "delete a tag by id")
    public Uni<Response> deleteTag(
            @PathParam("tag-id") String tagId
    ) {
        Log.info("reserved request to delete tagType: " + tagId);

        return this.tagResources
                .deleteTagById(tagId)
                .onItem()
                .transform(response -> {
                    Log.info("deleted tag with id: " + tagId);
                    return Response.ok().build();
                });
    }
}
