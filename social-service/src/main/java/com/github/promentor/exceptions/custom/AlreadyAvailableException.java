package com.github.promentor.exceptions.custom;

import com.github.promentor.exceptions.CustomException;
import com.github.promentor.exceptions.ErrorCode;
import jakarta.ws.rs.core.Response.Status;

public class AlreadyAvailableException  extends CustomException {

    public AlreadyAvailableException(ErrorCode errorCode) {
        super(errorCode, errorCode.toString(), Status.CONFLICT);
    }

}
