package com.github.promentor.web.impl;

import com.github.promentor.data.domain.*;
import com.github.promentor.data.repository.*;
import com.github.promentor.exceptions.ErrorCode;
import com.github.promentor.exceptions.custom.InvalidUUIDException;
import com.github.promentor.exceptions.custom.NotAuthorizeException;
import com.github.promentor.exceptions.custom.NotFoundException;
import com.github.promentor.mappers.PostCommentMapper;
import com.github.promentor.mappers.PostMapper;
import com.github.promentor.utils.IdConverter;
import com.github.promentor.web.dto.*;
import io.quarkus.logging.Log;
import io.quarkus.panache.common.Sort;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;

import java.security.Principal;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class PostResourcesImpl {

    private final PostMapper postMapper;
    private final PostCommentMapper postCommentMapper;

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostLikeRepository postLikeRepository;
    private final PostLikeCountRepository postLikeCountRepository;
    private final PostCommentRepository postCommentRepository;
    private final PostCountTrackerRepository postCountTrackerRepositoryl;

    public PostResourcesImpl(PostMapper postMapper, PostCommentMapper postCommentMapper, PostRepository postRepository, UserRepository userRepository, PostLikeRepository postLikeRepository, PostLikeCountRepository postLikeCountRepository, PostCommentRepository postCommentRepository, PostCountTrackerRepository postCountTrackerRepositoryl) {
        this.postMapper = postMapper;
        this.postCommentMapper = postCommentMapper;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.postLikeRepository = postLikeRepository;
        this.postLikeCountRepository = postLikeCountRepository;
        this.postCommentRepository = postCommentRepository;
        this.postCountTrackerRepositoryl = postCountTrackerRepositoryl;
    }

    /**
     * get the post by the post id
     * @param postId id of the post
     * @return the requested post As Uni
     * @throws NotFoundException if the post not available with given id
     * @throws InvalidUUIDException if the give id is not a valid id
     */
    public Uni<PostGetDTO> getPostById(String postId, Principal principal) {
        Log.debug("reserved request to get the post by id: " + postId);

        ObjectId postObjectId = IdConverter.getObjectId(postId);

        return postRepository
                .findById(postObjectId)
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.POST_NOT_FOUND))
                .onItem().transform(this.postMapper::toPostGetDTO)
                .onItem().transformToUni(postGetDTO -> setLikeCountOfPost(postObjectId, postGetDTO))
                .onItem().transformToUni(postGetDTO -> setLikeByMe(postObjectId, postGetDTO, principal));

    }

    public Uni<CommentGetDTO> getCommentById(String commentId) {
        Log.debug("reserved request to get the comment by id: " + commentId);

        return postCommentRepository
                .findById(IdConverter.getObjectId(commentId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.COMMENT_NOT_FOUND))
                .onItem().transform(this.postCommentMapper::toCommentGetDTO);

    }

    public Uni<List<CommentGetDTO>> getCommentsOfPost(String postId, int pageIndex, int pageSize) {

        ObjectId postObjectId = IdConverter.getObjectId(postId);

        Map<String, Object> params = new HashMap<>();
        params.put("postId", postObjectId);

        return postCommentRepository
                .find("postId = :postId", Sort.by("updatedAt").descending(), params)
                .page(pageIndex, pageSize)
                .stream().onItem().transform(this.postCommentMapper::toCommentGetDTO)
                .collect().asList();

    }

    public Uni<List<PostGetDTO>> getAllPost(int pageIndex, int pageSize, Principal principal) {

        return postRepository
                .findAll(Sort.by("updatedAt").descending())
                .page(pageIndex, pageSize)
                .stream()
                .onItem().transformToUni(post -> {
                    Log.debug("reserved post: " + post);

                    PostGetDTO postGetDTO = this.postMapper.toPostGetDTO(post);
                    Log.debug("converted postGetDTO: " + postGetDTO);

                    return setLikeCountOfPost(post.id, postGetDTO)
                            .onItem().transformToUni(postGetDTO1 -> setLikeByMe(post.id, postGetDTO1, principal));

                })
                .concatenate()
                .collect().asList();

    }

    public Uni<Void> likeChangeOnPost(String postId, Principal principal) {
        Log.debug("reserved like on postId: " + postId);

        ObjectId postObjectId = IdConverter.getObjectId(postId);

        Map<String, Object> params = new HashMap<>();
        params.put("postId", postObjectId);
        params.put("username", principal.getName());

        return this.postLikeRepository
                .findPostByPostIdAndUserId(
                        postObjectId,
                        principal.getName()
                )
                .onItem().transformToUni(postLike -> {
                    if (postLike.isEmpty()) {
                        return persistPostLike(postObjectId, principal.getName())
                                .onItem().transformToUni(unused ->
                                    this.postLikeCountRepository
                                            .findById(postObjectId)
                                            .onItem().transformToUni(postLikeCountDAO -> addPostLikeCount(postLikeCountDAO, postObjectId))
                                ).replaceWithVoid();
                    } else {
                        return postLikeRepository
                                .delete(postLike.get())
                                .onItem().transformToUni(unused ->
                                        this.postLikeCountRepository
                                                .findById(postObjectId)
                                                .onItem().transformToUni(this::removePostLikeCount)
                                ).replaceWithVoid();
                    }
                });

    }

    public Uni<String> updateOnPost(String postId, CreateCommentDTO createCommentDTO, Principal principal) {
        Log.debug("reserved like on postId: " + postId + ", createCommentDTO: " + createCommentDTO);

        return this.postCommentRepository
                .persist(new PostCommentDAO(
                        IdConverter.getObjectId(postId),
                        principal.getName(),
                        createCommentDTO.comment()
                ))
                .onItem().transform(postCommentDAO -> postCommentDAO.id.toString());

    }

    /**
     * create a post
     * @param postCreateDTO details want to create a post
     * @return id of the created object
     */
    public Uni<String> createdPost(PostCreateDTO postCreateDTO, Principal principal) {
        Log.debug("reserved: " + postCreateDTO);

        PostDAO post = this.postMapper.toPostDAO(postCreateDTO);
        post.createdBy = principal.getName();

        return this.userRepository.findByUsername(principal.getName())
                .onItem().transformToUni(userDAO -> {
                    userDAO.ifPresent(dao -> post.owner = dao);

                    return this.postRepository.persist(post)
                            .onItem()
                            .transformToUni(postDAO -> {
                                return postCountTrackerRepositoryl
                                        .addCount(postDAO.createdAt.truncatedTo(ChronoUnit.DAYS))
                                        .onItem().transform(postCountTracker -> {
                                            return postDAO.id.toString();
                                        });
                            });
                });

    }

    /**
     * update the post by id
     * @param postId id of the post
     * @param postUpdateDTO details want to update
     * @return updated post
     */
    public Uni<PostGetDTO> updatePostById(String postId, PostUpdateDTO postUpdateDTO, Principal principal) {
        Log.debug("reserved request to update: " + postId + " as: " + postUpdateDTO);

        return this.postRepository
                .findById(IdConverter.getObjectId(postId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.POST_NOT_FOUND))
                .onItem()
                .transformToUni(postDAO -> {
                    Log.debug("available post: " + postDAO);

                    if (!postDAO.createdBy.equals(principal.getName())) {
                        return Uni.createFrom().failure(new NotAuthorizeException(ErrorCode.NOT_POST_OWNER));
                    }

                    this.postMapper.merge(postDAO, postUpdateDTO);

                    Log.debug("updated post: " + postDAO);
                    return postRepository.update(postDAO);
                }).onItem().transform(this.postMapper::toPostGetDTO);
    }

    public Uni<Void> deletePostById(String postId, Principal principal) {
        Log.debug("reserved request to delete: " + postId );

        return this.postRepository
                .findById(IdConverter.getObjectId(postId))
                .onItem().ifNull().failWith(new NotFoundException(ErrorCode.POST_NOT_FOUND))
                .onItem()
                .transformToUni(postDAO -> {
                    Log.debug("available post: " + postDAO);

                    if (!postDAO.createdBy.equals(principal.getName())) {
                        return Uni.createFrom().failure(new NotAuthorizeException(ErrorCode.NOT_POST_OWNER));
                    }

                    return postRepository.delete(postDAO)
                            .onItem().transformToUni(unused -> {
                                return postCountTrackerRepositoryl
                                        .removeCount(postDAO.createdAt.truncatedTo(ChronoUnit.DAYS))
                                        .onItem().transform(postCountTracker -> unused);
                            });
                });
    }

    /**
     * This is used to set the like count of the given post
     * @param postId ObjectId of the post
     * @param postGetDTO the post object we want to set the like count
     * @return the PostGetDTO that contain the like count of that post
     */
    private Uni<PostGetDTO> setLikeCountOfPost(ObjectId postId, PostGetDTO postGetDTO) {

        return this.postLikeCountRepository.findById(postId)
                .onItem().transform(postLikeCountDAO -> {
                    Log.debug("reserved PostLikeCount: " + postLikeCountDAO);

                    // if there is a postLikeCount for the post return the like count
                    // if not return the 0
                    postGetDTO.setNumberOfLikes(postLikeCountDAO != null ? postLikeCountDAO.count : 0);

                    return postGetDTO;
                });
    }

    private Uni<PostGetDTO> setLikeByMe(ObjectId postId, PostGetDTO postGetDTO, Principal principal) {

        if (principal != null) {

            return this.postLikeRepository
                    .findPostByPostIdAndUserId(
                            postId,
                            principal.getName()
                    ).onItem().transform(postLike -> {
                        postGetDTO.setLikedByMe(postLike.isPresent());
                return postGetDTO;
            });
        }

        postGetDTO.setLikedByMe(false);
        return Uni.createFrom().item(postGetDTO);
    }

    private Uni<PostLikeDAO> persistPostLike(ObjectId postId, String username) {
        return postLikeRepository
                .persist(new PostLikeDAO(postId, username));
    }

    private Uni<PostLikeCountDAO> addPostLikeCount(PostLikeCountDAO postLikeCountDAO, ObjectId postId) {
        if (postLikeCountDAO == null) {
            postLikeCountDAO = new PostLikeCountDAO(postId);
            return this.postLikeCountRepository.persist(postLikeCountDAO);
        }
        postLikeCountDAO.addLike();
        return this.postLikeCountRepository.update(postLikeCountDAO);
    }

    private Uni<PostLikeCountDAO> removePostLikeCount(PostLikeCountDAO postLikeCountDAO) {
        postLikeCountDAO.removeLike();
        return this.postLikeCountRepository.update(postLikeCountDAO);
    }

}
