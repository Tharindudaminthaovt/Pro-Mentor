package com.github.promentor.web;

import com.github.promentor.exceptions.ErrorMessage;
import com.github.promentor.web.dto.JobTypeCreateDTO;
import com.github.promentor.web.dto.JobTypeGetDTO;
import com.github.promentor.web.dto.JobTypeUpdateDTO;
import com.github.promentor.web.impl.JobTypeResourcesImpl;
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

@Tag(name = "JobType", description = "Describe the functionalities related to JobType")
@Path("/job-type")
@ApplicationScoped
public class JobTypeResources {

    private final JobTypeResourcesImpl jobTypeResources;

    public JobTypeResources(JobTypeResourcesImpl jobTypeResources) {
        this.jobTypeResources = jobTypeResources;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    @Operation(operationId = "createJobType", summary = "create a job type", description = "create a job type")
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
    public Uni<Response> createJobType(@Valid JobTypeCreateDTO jobTypeCreateDTO) {
        Log.info("reserved request to create JobType");
        Log.debug("request reserved: " + jobTypeCreateDTO);

        return this.jobTypeResources
                .createJobType(jobTypeCreateDTO)
                .onItem()
                .transform(jobTypeGetDTO -> Response.ok(jobTypeGetDTO).build());
    }

    @GET
    @Path("/{job-type-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getJobTypeById", summary = "get a Job Type", description = "get a job type by job type id")
    @Parameter(name = "job-type-id", description = "unique id of the job type", required = true)
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
    public Uni<Response> getJobTypeById(@PathParam("job-type-id") String jobTypeId) {
        Log.info("reserved request to get the job type");
        Log.debug("reserved request to get the job type with id: " + jobTypeId);

        return this.jobTypeResources
                .getJobTypeById(jobTypeId)
                .map(jobTypeGetDTO -> Response.ok(jobTypeGetDTO).build());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getJobTypes", summary = "get job Types", description = "get a job types with pagination.")
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
    public Uni<Response> getAllJobTypes(@QueryParam("page") int pageIndex, @QueryParam("size") int pageSize) {
        Log.info("reserved request to get job types");
        Log.debug("reserved request to get the job types with pageIndex: " + pageIndex + ", pageSize: " + pageSize);

        return this.jobTypeResources
                .getAllJobTypes(pageIndex, pageSize)
                .map(jobTypeGetDTOList -> Response.ok(jobTypeGetDTOList).build());
    }

    @PUT
    @Path("/{job-type-id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    @Parameter(name = "job-type-id", description = "unique id of the job type", required = true)
    @Operation(operationId = "updateJobType", summary = "update a job type", description = "update a job type")
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
            @PathParam("job-type-id") String jobTypeId,
            @Valid JobTypeUpdateDTO jobTypeUpdateDTO
    ) {
        Log.info("reserved request to update job type: " + jobTypeId);
        Log.debug("request reserved: " + jobTypeUpdateDTO);

        return this.jobTypeResources
                .updateJobTypeById(jobTypeId, jobTypeUpdateDTO)
                .onItem()
                .transform(jobTypeGetDTO -> {
                    Log.info("updated job type with id: " + jobTypeId);
                    Log.debug("updated job type: " + jobTypeGetDTO);
                    return Response.ok(jobTypeGetDTO).build();
                });

    }

    @DELETE
    @Path("/{job-type-id}")
    @RolesAllowed({"user"})
    @Parameter(name = "job-type-id", description = "unique id of the job type", required = true)
    @Operation(operationId = "deleteJobType", summary = "delete a job type", description = "delete a job type by id")
    public Uni<Response> deleteJobType(
            @PathParam("job-type-id") String jobTypeId
    ) {
        Log.info("reserved request to delete jobType: " + jobTypeId);

        return this.jobTypeResources
                .deleteJobTypeById(jobTypeId)
                .onItem()
                .transform(response -> {
                    Log.info("deleted job type with id: " + jobTypeId);
                    return Response.ok().build();
                });
    }
}
