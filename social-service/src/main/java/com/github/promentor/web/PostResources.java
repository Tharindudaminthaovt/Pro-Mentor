package com.github.promentor.web;

import com.github.promentor.exceptions.ErrorMessage;
import com.github.promentor.web.dto.CreateCommentDTO;
import com.github.promentor.web.dto.PostCreateDTO;
import com.github.promentor.web.dto.PostGetDTO;
import com.github.promentor.web.dto.PostUpdateDTO;
import com.github.promentor.web.impl.PostResourcesImpl;
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

import java.net.URI;

@Tag(name = "Post", description = "Describe the functionalities related to Post")
@Path("/posts")
@ApplicationScoped
public class PostResources {

    private final PostResourcesImpl postResources;

    public PostResources(PostResourcesImpl postResources) {
        this.postResources = postResources;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getPosts", summary = "get posts", description = "get a post with pagination")
    @Parameter(name = "page", description = "page index", required = true)
    @Parameter(name = "size", description = "size of the page", required = true)
    @APIResponses( value = {
            @APIResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = PostGetDTO.class))
            ),
            @APIResponse(
                    responseCode = "400",
                    description = "Invalid Request",
                    content =  @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = ErrorMessage.class))
            )
    })
    public Uni<Response> getAllPost(@QueryParam("page") int pageIndex, @QueryParam("size") int pageSize, @Context SecurityContext sec) {
        Log.info("reserved request to get posts");
        Log.debug("reserved request to get the post with pageIndex: " + pageIndex + ", pageSize: " + pageSize);

        return this.postResources
                .getAllPost(pageIndex, pageSize, sec.getUserPrincipal())
                .map(postGetDTOList -> Response.ok(postGetDTOList).build());
    }

    @GET
    @Path("/{post-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getPostById", summary = "get a post", description = "get a post by post id")
    @Parameter(name = "post-id", description = "unique id of the post", required = true)
    @APIResponses( value = {
            @APIResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = PostGetDTO.class))
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
    public Uni<Response> getPostById(@PathParam("post-id") String postId, @Context SecurityContext sec) {
        Log.info("reserved request to get the post");
        Log.debug("reserved request to get the post with id: " + postId);

        return this.postResources
                .getPostById(postId, sec.getUserPrincipal())
                .map(postGetDTO -> Response.ok(postGetDTO).build());
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    @Operation(operationId = "createPost", summary = "create a post", description = "create a post")
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
    public Uni<Response> createdPost(@Valid PostCreateDTO postCreateDTO, @Context SecurityContext sec) {
        Log.info("reserved request to create post");
        Log.debug("request reserved: " + postCreateDTO);

        return this.postResources
                .createdPost(postCreateDTO, sec.getUserPrincipal())
                .onItem()
                .transform(id -> {
                    Log.info("create post with id: " + id);
                    return Response.created(URI.create("/posts/" + id)).build();
                });
    }

    @PUT
    @Path("/{post-id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    @Parameter(name = "post-id", description = "unique id of the post", required = true)
    @Operation(operationId = "updatePost", summary = "update a post", description = "update a post")
    @APIResponses( value = {
            @APIResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = PostGetDTO.class))
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
    public Uni<Response> updatePost(
            @PathParam("post-id") String postId,
            @Valid PostUpdateDTO postUpdateDTO,
            @Context SecurityContext sec
    ) {
        Log.info("reserved request to update post: " + postId);
        Log.debug("request reserved: " + postUpdateDTO);

        return this.postResources
                .updatePostById(postId, postUpdateDTO, sec.getUserPrincipal())
                .onItem()
                .transform(post -> {
                    Log.info("updated post with id: " + postId);
                    Log.debug("updated post: " + post);
                    return Response.ok(post).build();
                });

    }

    @PUT
    @Path("/{post-id}/like")
    @RolesAllowed({"user"})
    public Uni<Response> likeChangeOnPost(@PathParam("post-id") String postId, @Context SecurityContext sec) {
        Log.info("reserved a request to like a post: " + postId);

        return this.postResources
                .likeChangeOnPost(postId, sec.getUserPrincipal())
                .onItem()
                .transform(response -> {
                    Log.info("change the like of the post: " + postId);
                    return Response.ok().build();
                });
    }

    @GET
    @Path("/{post-id}/comments")
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<Response> getCommentByOfPost(@PathParam("post-id") String postId, @QueryParam("page") int pageIndex, @QueryParam("size") int pageSize) {

        return this.postResources
                .getCommentsOfPost(postId, pageIndex, pageSize)
                .map(commentGetDTOS -> Response.ok(commentGetDTOS).build());
    }

    @GET
    @Path("/comments/{comment-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getCommentById", summary = "get a comment", description = "get a comment by comment id")
    @Parameter(name = "comment-id", description = "unique id of the comment", required = true)
    public Uni<Response> getCommentById(@PathParam("comment-id") String commentId) {
        Log.info("reserved request to get the comment");
        Log.debug("reserved request to get the comment with id: " + commentId);

        return this.postResources
                .getCommentById(commentId)
                .map(commentGetDTO -> Response.ok(commentGetDTO).build());
    }

    @POST
    @Path("/{post-id}/comments")
    @RolesAllowed({"user"})
    public Uni<Response> commentOnPost(
            @PathParam("post-id") String postId,
            @Valid CreateCommentDTO createCommentDTO,
            @Context SecurityContext sec) {
        Log.info("reserved a request to like a post: " + postId);

        return this.postResources
                .updateOnPost(postId, createCommentDTO, sec.getUserPrincipal())
                .onItem()
                .transform(id -> {
                    return Response.created(URI.create("/posts/comments/" + id)).build();
                });
    }

    @DELETE
    @Path("/{post-id}")
    @RolesAllowed({"user"})
    @Parameter(name = "post-id", description = "unique id of the post", required = true)
    @Operation(operationId = "deletePost", summary = "delete a post", description = "delete a post")
    public Uni<Response> deletePost(
            @PathParam("post-id") String postId,
            @Context SecurityContext sec
    ) {
        Log.info("reserved request to delete post: " + postId);

        return this.postResources
                .deletePostById(postId, sec.getUserPrincipal())
                .onItem()
                .transform(response -> {
                    Log.info("deleted post with id: " + postId);
                    return Response.ok().build();
                });
    }


}
