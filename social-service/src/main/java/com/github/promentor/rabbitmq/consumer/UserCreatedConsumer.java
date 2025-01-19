package com.github.promentor.rabbitmq.consumer;

import com.github.promentor.data.repository.UserRepository;
import com.github.promentor.mappers.UserMapper;
import com.github.promentor.rabbitmq.model.UserCreated;
import com.github.promentor.utils.IncomingMessageConverter;
import io.quarkus.logging.Log;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.JsonObject;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Message;

import java.util.concurrent.CompletionStage;

@ApplicationScoped
public class UserCreatedConsumer {

    private final UserMapper userMapper;

    private final UserRepository userRepository;

    public UserCreatedConsumer(UserMapper userMapper, UserRepository userRepository) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }

    @Incoming("user-created")
    public Uni<CompletionStage<Void>> consume(Message<byte[]> message) {
        Log.info("message reserved in \"user-created\"");

        JsonObject jsonPayload = IncomingMessageConverter.getMessageFromByteStream(message.getPayload());
        Log.debug("Reserved message: " + jsonPayload);

        UserCreated userCreated = jsonPayload.mapTo(UserCreated.class);

        return this.userRepository.persist(this.userMapper.toUserDAO(userCreated))
                .onItem().transform(item -> message.ack());
    }
}
