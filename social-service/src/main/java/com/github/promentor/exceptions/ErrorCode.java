package com.github.promentor.exceptions;

/**
 * Contains all application specific error codes.
 */
public enum ErrorCode {

    /**
     * This code is used for unknown errors.
     */
    UNKNOWN("E-0000") {
        @Override
        public String toString() {
            return "Unknown Error";
        }
    },

    /**
     * This code indicates the given input not valid.
     */
    INPUT_VALIDATION_ERROR("E-0001") {
        @Override
        public String toString() { return "The given input is not valid"; }
    },

    /**
     * This code indicates the given id is not a valid ID
     */
    INVALID_OBJECT("E-0002") {
        @Override
        public String toString() { return "Given ID is not valid"; }
    },

    /**
     * This code indicates the authorization issue.
     */
    AUTHENTICATION_FAILED("E-0003") {
        @Override
        public String toString() { return "Authorization Failed"; }
    },

    /**
     * This code indicates the forbidden issue.
     */
    FORBIDDEN("E-0004") {
        @Override
        public String toString() { return "Forbidden. Don't have access"; }
    },

    /**
     * This code indicates that the requested post not found
     */
    POST_NOT_FOUND("E-0010") {
        @Override
        public String toString() { return "Post Not Found"; }
    },

    /**
     * This code indicates that the requested post is not a requested user post
     */
    NOT_POST_OWNER("E-0011") {
        @Override
        public String toString() { return "Don't have access to modify the post."; }
    },

    /**
     * This code indicates that the requested comment not found
     */
    COMMENT_NOT_FOUND("E-0020") {
        @Override
        public String toString() { return "Comment Not Found"; }
    },

    /**
     *  This code indicates that the requested job type already available
     */
    Job_TYPE_AVAILABLE("E-0030") {
        @Override
        public String toString() { return "Job Type available with same name"; }
    },

    /**
     * This code indicates that the requested job type not found
     */
    Job_TYPE_NOT_FOUND("E-0031") {
        @Override
        public String toString() { return "Job Type Not Found"; }
    },

    /**
     *  This code indicates that the requested job modality already available
     */
    Job_MODALITY_AVAILABLE("E-0040") {
        @Override
        public String toString() { return "Job Modality available with same name"; }
    },

    /**
     * This code indicates that the requested job modality not found
     */
    Job_MODALITY_NOT_FOUND("E-0041") {
        @Override
        public String toString() { return "Job Modality Not Found"; }
    },

    /**
     *  This code indicates that the requested location already available
     */
    LOCATION_AVAILABLE("E-0050") {
        @Override
        public String toString() { return "Location available with same name"; }
    },

    /**
     * This code indicates that the requested location not found
     */
    LOCATION_NOT_FOUND("E-0051") {
        @Override
        public String toString() { return "Location Not Found"; }
    },

    /**
     *  This code indicates that the requested tag type already available
     */
    TAG_TYPE_AVAILABLE("E-0060") {
        @Override
        public String toString() { return "Tag Type available with same name"; }
    },

    /**
     * This code indicates that the requested tag type not found
     */
    TAG_TYPE_NOT_FOUND("E-0061") {
        @Override
        public String toString() { return "Tag Type Not Found"; }
    },

    /**
     * This code indicates that the requested job not found
     */
    JOB_NOT_FOUND("E-0070") {
        @Override
        public String toString() { return "Job Not Found"; }
    },
    /**
     * This code indicates that the requested post is not a requested user post
     */
    NOT_JOB_OWNER("E-0071") {
        @Override
        public String toString() { return "Don't have access to modify the job."; }
    },
    ;

    private final String errorCode;

    /**
     * Creates a new instance of ErrorCode enum.
     *
     * @param errorCode A string containing the error code.
     */
    ErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    /**
     * Gets the error code.
     *
     * @return A string containing the error code.
     */
    public String getValue() {
        return this.errorCode;
    }

}
