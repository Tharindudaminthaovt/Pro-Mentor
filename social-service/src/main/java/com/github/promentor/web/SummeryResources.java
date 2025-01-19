package com.github.promentor.web;

import com.github.promentor.web.impl.SummeryResourcesImpl;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Tag(name = "Summery", description = "Describe the functionalities related to summery")
@Path("/summery")
@ApplicationScoped
public class SummeryResources {

    private final SummeryResourcesImpl summeryResources;

    public SummeryResources(SummeryResourcesImpl summeryResources) {
        this.summeryResources = summeryResources;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getSummery", summary = "get Summery", description = "get summery")
    public Uni<Response> getSummery() {

        return this.summeryResources.getSummery()
                .onItem().transform(item -> Response.ok(item).build());
    }


}
