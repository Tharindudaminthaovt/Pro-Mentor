package com.github.promentor.exceptions;

import io.quarkus.logging.Log;
import io.quarkus.security.ForbiddenException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

import java.util.Arrays;

/**
 * This is a Global Exception Mapper to ForbiddenException
 * Converts ForbiddenException into a structured error response.
 * return error with response with following format
 *  {
 *      "message": "String",
 *      "errorStatus": "String",
 *      "errorCode": "String"
 *  }
 *          errorCode  The application specific {@link ErrorCode}.
 *          message     The reason for the error
 *          errorStatus The {@link ErrorCode} that should be sent.
 */
@Provider
public class ForbiddenExceptionMapper implements ExceptionMapper<ForbiddenException> {

    /**
     * Handles the ForbiddenException and converts it into a formatted response.
     * Logs the error and debug information.
     *
     * @param exception The ForbiddenException caught by the mapper.
     * @return Response containing the formatted error message and status code.
     */
    @Override
    public Response toResponse(ForbiddenException exception) {
        Log.error("From Global ForbiddenExceptionMapper : " + exception.getMessage());
        Log.debug("From Global ForbiddenExceptionMapper : ", exception);
        Log.debug(Arrays.toString(exception.getStackTrace()));

        // Convert the exception to a formatted response
        return mapExceptionToResponse(exception);
    }

    /**
     * Formats the ForbiddenException into a structured error response.
     * Logs the error response and its details.
     *
     * @param exception The ForbiddenException caught by the mapper.
     * @return Response containing the formatted error message and status code.
     */
    private Response mapExceptionToResponse(ForbiddenException exception) {
        Log.info("sending the error response: " + ErrorCode.FORBIDDEN);
        Log.debug("error response" + new ErrorMessage(
                exception.getMessage(), ErrorCode.FORBIDDEN));

        // Build and return a response with the error entity and HTTP status code
        return Response
                .status(Response.Status.FORBIDDEN)
                .entity(new ErrorMessage(exception.getMessage() != null ? exception.getMessage() : ErrorCode.FORBIDDEN.toString(), ErrorCode.AUTHENTICATION_FAILED))
                .build();

    }

}
