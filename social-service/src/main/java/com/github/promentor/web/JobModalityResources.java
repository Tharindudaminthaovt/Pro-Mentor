package com.github.promentor.web;

import com.github.promentor.exceptions.ErrorMessage;
import com.github.promentor.web.dto.*;
import com.github.promentor.web.impl.JobModalityResourcesImpl;
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

@Tag(name = "JobModality", description = "Describe the functionalities related to JobModality")
@Path("/job-modality")
@ApplicationScoped
public class JobModalityResources {

    private final JobModalityResourcesImpl jobModalityResources;

    public JobModalityResources(JobModalityResourcesImpl jobModalityResources) {
        this.jobModalityResources = jobModalityResources;
    }


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    @Operation(operationId = "createJobModality", summary = "create a job modality", description = "create a job modality")
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
    public Uni<Response> createJobModality(@Valid JobModalityCreateDTO jobModalityCreateDTO) {
        Log.info("reserved request to create JobModality");
        Log.debug("request reserved: " + jobModalityCreateDTO);

        return this.jobModalityResources
                .createJobModality(jobModalityCreateDTO)
                .onItem()
                .transform(jobModalityGetDTO -> Response.ok(jobModalityGetDTO).build());
    }

    @GET
    @Path("/{job-modality-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getJobModalityById", summary = "get a Job Modality", description = "get a job modality by job modality id")
    @Parameter(name = "job-modality-id", description = "unique id of the job modality", required = true)
    @APIResponses( value = {
            @APIResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = JobModalityGetDTO.class))
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
    public Uni<Response> getJobModalityById(@PathParam("job-modality-id") String jobModalityId) {
        Log.info("reserved request to get the job modality");
        Log.debug("reserved request to get the job modality with id: " + jobModalityId);

        return this.jobModalityResources
                .getJobModalityById(jobModalityId)
                .map(jobModalityGetDTO -> Response.ok(jobModalityGetDTO).build());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getJobModalities", summary = "get job Modalities", description = "get a job modalities with pagination.")
    @Parameter(name = "page", description = "page index. this is 0 base index.", required = true)
    @Parameter(name = "size", description = "size of the page. if want all the items set the size to 0", required = true)
    @APIResponses( value = {
            @APIResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = JobModalityGetDTO.class))
            ),
            @APIResponse(
                    responseCode = "400",
                    description = "Invalid Request",
                    content =  @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
            )
    })
    public Uni<Response> getAllJobModalities(@QueryParam("page") int pageIndex, @QueryParam("size") int pageSize) {
        Log.info("reserved request to get job modalities");
        Log.debug("reserved request to get the job modalities with pageIndex: " + pageIndex + ", pageSize: " + pageSize);

        return this.jobModalityResources
                .getAllJobModalities(pageIndex, pageSize)
                .map(jobModalityGetDTOList -> Response.ok(jobModalityGetDTOList).build());
    }

    @PUT
    @Path("/{job-modality-id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    @Parameter(name = "job-modality-id", description = "unique id of the job modality", required = true)
    @Operation(operationId = "updateJobModality", summary = "update a job modality", description = "update a job modality")
    @APIResponses( value = {
            @APIResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = JobModalityGetDTO.class))
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
    public Uni<Response> updateJobModality(
            @PathParam("job-modality-id") String jobModalityId,
            @Valid JobModalityUpdateDTO jobModalityUpdateDTO
    ) {
        Log.info("reserved request to update job modality: " + jobModalityId);
        Log.debug("request reserved: " + jobModalityUpdateDTO);

        return this.jobModalityResources
                .updateJobModalityById(jobModalityId, jobModalityUpdateDTO)
                .onItem()
                .transform(jobModalityGetDTO -> {
                    Log.info("updated job modality with id: " + jobModalityId);
                    Log.debug("updated job modality: " + jobModalityGetDTO);
                    return Response.ok(jobModalityGetDTO).build();
                });

    }

    @DELETE
    @Path("/{job-modality-id}")
    @RolesAllowed({"user"})
    @Parameter(name = "job-modality-id", description = "unique id of the job modality", required = true)
    @Operation(operationId = "deleteModalityType", summary = "delete a job modality", description = "delete a job modality by id")
    public Uni<Response> deleteJobModality(
            @PathParam("job-modality-id") String jobModalityId
    ) {
        Log.info("reserved request to delete jobModality: " + jobModalityId);

        return this.jobModalityResources
                .deleteJobModalityById(jobModalityId)
                .onItem()
                .transform(response -> {
                    Log.info("deleted job modality with id: " + jobModalityId);
                    return Response.ok().build();
                });
    }
}
