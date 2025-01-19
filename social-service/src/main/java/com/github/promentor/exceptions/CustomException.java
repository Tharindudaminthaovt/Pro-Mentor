package com.github.promentor.exceptions;

import jakarta.ws.rs.core.Response.Status;

import java.io.Serial;

public class CustomException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    private final ErrorCode errorCode;
    private final String reason;
    private final Status httpStatus;

    public CustomException(ErrorCode errorCode, String reason, Status httpStatus, Throwable cause) {
        super(cause);
        this.errorCode = errorCode;
        this.reason = reason;
        this.httpStatus = httpStatus;
    }

    public CustomException(ErrorCode errorCode, String reason, Status httpStatus) {
        this.errorCode = errorCode;
        this.reason = reason;
        this.httpStatus = httpStatus;
    }

    public CustomException(ErrorCode errorCode, String reason) {
        this(errorCode, reason, Status.INTERNAL_SERVER_ERROR, null);
    }

    public Status getHttpStatus() {
        return this.httpStatus;
    }

    public ErrorCode getErrorCode() {
        return this.errorCode;
    }

    public String getReason() {
        return this.reason;
    }
}
