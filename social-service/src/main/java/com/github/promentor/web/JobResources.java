package com.github.promentor.web;

import com.github.promentor.exceptions.ErrorMessage;
import com.github.promentor.web.dto.JobCreateDTO;
import com.github.promentor.web.dto.JobTypeGetDTO;
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

@Tag(name = "Job", description = "Describe the functionalities related to Jobs")
@Path("/jobs")
@ApplicationScoped
public class JobResources {

    private final JobResourcesImpl jobResources;

    public JobResources(JobResourcesImpl jobResources) {
        this.jobResources = jobResources;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    @Operation(operationId = "createJobs", summary = "create a job", description = "create a job")
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
    public Uni<Response> createJob(@Valid JobCreateDTO jobCreateDTO, @Context SecurityContext sec) {
        Log.info("reserved request to create Job");
        Log.debug("request reserved: " + jobCreateDTO);

        return this.jobResources
                .createJob(jobCreateDTO, sec.getUserPrincipal())
                .onItem()
                .transform(id -> {
                    Log.info("create job with id: " + id);
                    return Response.created(URI.create("/jobs/" + id)).build();
                });
    }

    @GET
    @Path("/{job-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getJobById", summary = "get a Job", description = "get a job by job id")
    @Parameter(name = "job-id", description = "unique id of the job", required = true)
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
    public Uni<Response> getTageById(@PathParam("job-id") String jobId) {
        Log.info("reserved request to get the job");
        Log.debug("reserved request to get the job with id: " + jobId);

        return this.jobResources
                .geJobById(jobId)
                .map(tagGetDTO -> Response.ok(tagGetDTO).build());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getJobs", summary = "get Jobs", description = "get jobs with pagination.")
    @Parameter(name = "page", description = "page index. this is 0 base index.", required = true)
    @Parameter(name = "size", description = "size of the page. if want all the items set the size to 0", required = true)
    @Parameter(name = "location-ids", description = "Locations id list")
    @Parameter(name = "modality-ids", description = "Modality id list")
    @Parameter(name = "type-ids", description = "Job Type Id list")
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
    public Uni<Response> getAllTags(@QueryParam("page") int pageIndex, @QueryParam("size") int pageSize,
                                    @QueryParam("location-ids") @Separator(",") List<String> locations,
                                    @QueryParam("modality-ids") @Separator(",") List<String> modalities,
                                    @QueryParam("type-ids") @Separator(",") List<String> types,
                                    @QueryParam("tag-ids") @Separator(",") List<String> tags,
                                    @QueryParam("search") String search) {
        Log.info("reserved request to get jobs");
        Log.debug("reserved request to get the jobs with pageIndex: " + pageIndex + ", pageSize: " + pageSize);

        return this.jobResources
                .getAllJobs(pageIndex, pageSize, locations, modalities, types, tags, search)
                .map(jobGetDTOList -> Response.ok(jobGetDTOList).build());
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
    @Path("/{job-id}")
    @RolesAllowed({"user"})
    @Parameter(name = "job-id", description = "unique id of the job", required = true)
    @Operation(operationId = "deleteJob", summary = "delete a job", description = "delete a job by id")
    public Uni<Response> deleteTag(
            @PathParam("job-id") String jobId,
            @Context SecurityContext sec
    ) {
        Log.info("reserved request to delete job: " + jobId);

        return this.jobResources
                .deleteJobById(jobId, sec.getUserPrincipal())
                .onItem()
                .transform(response -> {
                    Log.info("deleted job with id: " + jobId);
                    return Response.ok().build();
                });
    }
}
