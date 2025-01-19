package com.github.promentor.exceptions;

import io.quarkus.logging.Log;
import io.quarkus.security.AuthenticationFailedException;
import io.quarkus.security.UnauthorizedException;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

import java.util.Arrays;

/**
 * This is a Global Exception Mapper to Centralize error handling
 * Converts Exception into a structured error response.
 * return error with response with following format
 *  {
 *     "message": "String",
 *     "errorStatus": "String",
 *     "errorCode": "String"
 *  }
 *          errorCode  The application specific {@link ErrorCode}.
 *          message     The reason for the error
 *          errorStatus The {@link ErrorCode} that should be sent.
 */
@Provider
public class ErrorPageResponseExceptionMapper implements ExceptionMapper<Exception> {

    /**
     * Handles the Exception and converts it into a formatted response.
     * Logs the error and debug information.
     *
     * @param exception The Exception caught by the mapper.
     * @return Response containing the formatted error message and status code.
     */
    @Override
    public Response toResponse(Exception exception) {
        Log.error("From Global Exception Mapper : " + exception);
        Log.debug(Arrays.toString(exception.getStackTrace()));

        // Convert the exception to a formatted response
        return mapExceptionToResponse(exception);
    }

    /**
     * Formats the Exception into a structured error response.
     * Logs the error response and its details.
     *
     * @param exception The Exception caught by the mapper.
     * @return Response containing the formatted error message and status code.
     */
    private Response mapExceptionToResponse(Exception exception) {
        Log.debug("In the global exception mapper");

        // Use response from ApiException as they are
        if (exception instanceof CustomException originalErrorResponse) {
            Log.debug("match with ApiException");

            // Overwrite error message
            Log.error("sending the error response: " + originalErrorResponse.getErrorCode());
            Log.debug("error response: " + new ErrorMessage(originalErrorResponse.getReason(), originalErrorResponse.getErrorCode()));

            return Response
                    .status(originalErrorResponse.getHttpStatus())
                    .entity(new ErrorMessage(originalErrorResponse.getReason(), originalErrorResponse.getErrorCode()))
                    .build();
        }

        // use fpr WebApplicationExceptions
        if (exception instanceof WebApplicationException webApplicationException) {
            Log.debug("match with WebApplicationException");

            Log.error("sending the error response: " + webApplicationException.getMessage());
            Log.debug("error response: " + new ErrorMessage(webApplicationException.getMessage(), ErrorCode.UNKNOWN));

            return Response
                    .status(webApplicationException.getResponse().getStatus())
                    .entity(new ErrorMessage(webApplicationException.getMessage(), ErrorCode.UNKNOWN))
                    .build();

        }

        Log.info("send the error response " + ErrorCode.UNKNOWN);
        Log.debug("not caught error, error response: " + new ErrorMessage("Internal Server Error", ErrorCode.UNKNOWN));

        // not caught errors
        return Response
                .status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(new ErrorMessage("Internal Server Error", ErrorCode.UNKNOWN))
                .build();

    }

}
