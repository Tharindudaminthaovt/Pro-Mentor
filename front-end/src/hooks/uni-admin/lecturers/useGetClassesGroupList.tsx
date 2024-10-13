import { UserGroups } from '@promentor-app/shared-lib'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { GetGroupListResponse } from './useGetSchoolsGroupList'

const api = new AuthService()

export const useGetClassesGroupList = () => {
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetGroupListResponse
	>(api.Get_Groups(UserGroups.CLASS), 'GET')

	return {
		getClassesGroupsListResponse: data,
		error_getClassesGroups: error,
		isLoading_getClassesGroups: isLoading,
		isValidating_getClassesGroups: isValidating,
		mutate_getClassesGroups: customMutate,
	}
}
