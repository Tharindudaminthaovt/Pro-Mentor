import axios from "axios";

import { ErrorCode } from "../errors/error-codes";
import { RequestBodyFormat } from "./request_formats/request-format";
import { HttpRequestHeaders } from "./request_formats/http-headers";
import { ResponseBodyFormat } from "./request_formats/response-format";
import { AxiosException } from "../errors/custom_exceptions/axios-exception";
import { HttpMethod } from "./request_formats/http-methods";

/**
 * this function is used to invoke rest endpoint with axios
 * @param T the type of the response body format that is expected from the rest endpoint
 * this type should implement the ResponseBodyFormat interface
 * @param url the url of the rest endpoint
 * @param method the http method of the rest endpoint
 * @param requestBody the request body of the rest endpoint
 * @param headers the headers of the rest endpoint
 * @returns the response body of the rest endpoint
 * @throws AxiosException if the rest endpoint returns an error if the error is an AxiosError
 * @throws Error if the rest endpoint returns an error if the error is not an AxiosError
 */
const invokeRestEndpoint = async <T extends ResponseBodyFormat>(
    url: string,
    method: HttpMethod,
    requestBody: RequestBodyFormat | undefined = undefined,
    headers: HttpRequestHeaders | undefined = undefined
): Promise<T | undefined> => {
    let response;

    try {
        const { data } = await axios<T>({
            method,
            url,
            headers,
            data: requestBody,
        });
        response = data;
    } catch (error) {
        console.debug("error ", error);
        if (axios.isAxiosError(error)) {
            throw new AxiosException(
                error.response?.data.errorMessage || error.response?.data.error,
                ErrorCode[error.code as keyof typeof ErrorCode],
                error.response?.status || 500
            );
        }
    }

    return response;
};

export {
    invokeRestEndpoint
};
