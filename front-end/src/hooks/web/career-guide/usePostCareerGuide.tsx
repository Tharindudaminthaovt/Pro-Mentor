import { MlService } from "../../../services/api/ml-service.api.endpoints";
import { useCustomSWR } from "../../../services/useCustomSWR";

const api = new MlService()

interface PostCareerGuideRequest {
    skills: string;
}

export interface CareerGuideResponse {
    id: number;
    value: string;
    needToImprove: boolean;
}

export interface PostCareerGuideResponse {
    job: string;
    guides: CareerGuideResponse[]
}

export const usePostCareerGuide = () => {

    const {
        data,
        error,
        isLoading,
        isValidating,
        mutate,
        setRequest,
        setIsRequestReady,
    } = useCustomSWR<PostCareerGuideRequest, PostCareerGuideResponse>(
        api.Post_CareerPath(),
        'POST'
    )

    return {
        getCareerPathResponse: data,
        setGetCareerPathRequest: setRequest,
        error_getCareerPath: error,
        isLoading_getCareerPath: isLoading,
        isValidating_getCareerPath: isValidating,
        mutate_getCareerPath: mutate,
        setIsReqeustReady_getCareerPath: setIsRequestReady,
    }

}