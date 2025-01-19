package com.github.promentor.data.repository;

import com.github.promentor.data.domain.PostLikeDAO;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@ApplicationScoped
public class PostLikeRepository implements ReactivePanacheMongoRepository<PostLikeDAO> {

    /**
     * this is uses to get the PostLike with given postId and username
     * this only return the first result
     * @param postId ObjectId of the post
     * @param username username of the post
     * @return PostLike object as an Optional
     */
    public Uni<Optional<PostLikeDAO>> findPostByPostIdAndUserId(ObjectId postId, String username) {

        Map<String, Object> params = new HashMap<>();
        params.put("postId", postId);
        params.put("username", username);

        return find("postId = :postId and username = :username", params).firstResultOptional();
    }

}
