package com.github.promentor.exceptions.custom;

import com.github.promentor.exceptions.CustomException;
import com.github.promentor.exceptions.ErrorCode;
import jakarta.ws.rs.core.Response;

public class NotFoundException extends CustomException {

    public NotFoundException(ErrorCode errorCode) {
        super(errorCode, errorCode.toString(), Response.Status.NOT_FOUND);
    }

}
