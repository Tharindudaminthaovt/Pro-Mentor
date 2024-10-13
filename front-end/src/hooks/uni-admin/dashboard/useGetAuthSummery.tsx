import { AuthService } from "../../../services/api/auth-service.api.endpoints"
import { useCustomSWR } from "../../../services/useCustomSWR";

const api = new AuthService()

export interface GetAuthSummeryResponse  {
    student: number;
    lecture: number;
    admin: number;
    staff: number
}

export const useGetAuthSummery = () => {

    const { data, error, isLoading, isValidating, customMutate} = useCustomSWR<
        unknown,
        GetAuthSummeryResponse
    >(api.Get_Summery(), 'GET')

    return {
        getAuthSummeryResponse: data,
        error_authSummery: error,
        isLoading_getAuthSummery: isLoading,
        isValidating_getAuthSummery: isValidating,
        mutate_getAuthSummery: customMutate
    }

}