import { SocialService } from "../../../services/api/social-service.api.endpoints";
import { useCustomSWR } from "../../../services/useCustomSWR";

const api = new SocialService()

export interface EventsResponse {
    id: string;
    title: string;
    desc: string;
    start: string;
    end: string;
    time: string;
}

export interface JobCountResponse {
    id: string;
    date: string;
    count: number;
}

export interface PostCountRespnse {
    id: string;
    date: string;
    count: number;
}

export interface GetAuthCountResponse {
    eventCount: number;
    events: EventsResponse[];
    jobCounts: JobCountResponse[];
    postCounts: PostCountRespnse[];
}

export const useGetSocialSummery = () => {

    const { data, error, isLoading, isValidating, customMutate} = useCustomSWR<
        unknown,
        GetAuthCountResponse
    >(api.Get_Summery(), 'GET')

    return {
        getSocualSummeryResponse: data,
        error_socialSummery: error,
        isLoading_getSocialSummery: isLoading,
        isValidating_getSocialSummery: isValidating,
        mutate_getSocialSummery: customMutate
    }

}