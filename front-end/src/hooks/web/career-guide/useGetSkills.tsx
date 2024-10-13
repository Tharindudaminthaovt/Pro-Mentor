import { useCustomSWR } from "../../../services/useCustomSWR";
import { MlService } from "../../../services/api/ml-service.api.endpoints";


const api = new MlService()

export interface Skills {
	id: number
	value: string
	category_id: number
}

export interface GetSkillListResponse {
    id: number
    value: string
    category: Skills[]
}

export const useGetSkills = () => {

    const { data, error, isLoading, isValidating, customMutate} = useCustomSWR<
        unknown,
        GetSkillListResponse[]
    >(api.Get_Skills(), 'GET')


    return {
        getSkillsResponse: data,
        error_getSkills: error,
        isLoading_getSkills: isLoading,
        isValidating_getSkills: isValidating,
        mutate_getSkills: customMutate,
    }

}