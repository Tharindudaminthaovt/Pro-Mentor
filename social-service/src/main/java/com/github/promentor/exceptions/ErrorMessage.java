package com.github.promentor.exceptions;

public class ErrorMessage {

    private String message;
    private String errorStatus;
    private ErrorCode errorCode;

    public ErrorMessage(String message, ErrorCode errorCode) {
        this.message = message;
        this.errorStatus = errorCode.getValue();
        this.errorCode = errorCode;
    }

    public ErrorMessage() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getErrorStatus() {
        return errorStatus;
    }

    public void setErrorStatus(ErrorCode errorCode) {
        this.errorStatus = errorCode.getValue();
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }

    @Override
    public String toString() {
        return "ErrorMessage1{" +
                "message='" + message + '\'' +
                ", errorStatus='" + errorStatus + '\'' +
                ", errorCode=" + errorCode +
                '}';
    }

}
