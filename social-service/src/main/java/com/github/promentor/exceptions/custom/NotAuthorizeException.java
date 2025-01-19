package com.github.promentor.exceptions.custom;

import com.github.promentor.exceptions.CustomException;
import com.github.promentor.exceptions.ErrorCode;
import jakarta.ws.rs.core.Response;

public class NotAuthorizeException extends CustomException {

    public NotAuthorizeException(ErrorCode errorCode) {
        super(errorCode, errorCode.toString(), Response.Status.UNAUTHORIZED);
    }

}
