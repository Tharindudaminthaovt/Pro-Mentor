import { UserGroups } from '@promentor-app/shared-lib'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { GetGroupListResponse } from './useGetSchoolsGroupList'

const api = new AuthService()

export const useGetDegreesGroupList = () => {
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetGroupListResponse
	>(api.Get_Groups(UserGroups.DEGREE_PROGRAM), 'GET')

	return {
		getDegreesGroupsListResponse: data,
		error_getDegreesGroups: error,
		isLoading_getDegreesGroups: isLoading,
		isValidating_getDegreesGroups: isValidating,
		mutate_getDegreesGroups: customMutate,
	}
}
