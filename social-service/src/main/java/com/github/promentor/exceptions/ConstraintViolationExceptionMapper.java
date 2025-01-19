package com.github.promentor.exceptions;

import io.quarkus.logging.Log;
import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

import java.util.Arrays;

/**
 * This is a Global Exception Mapper to ConstraintViolationException
 * Converts ConstraintViolationException into a structured error response.
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
public class ConstraintViolationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {

    /**
     * Handles the ConstraintViolationException and converts it into a formatted response.
     * Logs the error and debug information.
     *
     * @param exception The ConstraintViolationException caught by the mapper.
     * @return Response containing the formatted error message and status code.
     */
    @Override
    public Response toResponse(ConstraintViolationException exception) {
        Log.error("From Global ConstraintViolationExceptionMapper : " + exception.getConstraintViolations().iterator().next().getMessage());
        Log.debug("From Global ConstraintViolationExceptionMapper : ", exception);
        Log.debug(Arrays.toString(exception.getStackTrace()));

        // Convert the exception to a formatted response
        return mapExceptionToResponse(exception);
    }

    /**
     * Formats the ConstraintViolationException into a structured error response.
     * Logs the error response and its details.
     *
     * @param exception The ConstraintViolationException caught by the mapper.
     * @return Response containing the formatted error message and status code.
     */
    private Response mapExceptionToResponse(ConstraintViolationException exception) {
        Log.info("sending the error response: " + ErrorCode.INPUT_VALIDATION_ERROR);
        Log.debug("error response" + new ErrorMessage(
                exception.getConstraintViolations().iterator().next().getMessage(), ErrorCode.INPUT_VALIDATION_ERROR));

        // Build and return a response with the error entity and HTTP status code
        return Response
                .status(Status.BAD_REQUEST)
                .entity(new ErrorMessage(exception.getConstraintViolations().iterator().next().getMessage(), ErrorCode.INPUT_VALIDATION_ERROR))
                .build();

    }
}