import { Group, UserGroups } from '@promentor-app/shared-lib'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'

const api = new AuthService()

export interface GetGroupListResponse {
	id: string
	name: string
	path: string
	subGroups: Group[]
}

export const useGetSchoolsGroupList = () => {
	const { data, error, isLoading, isValidating, customMutate } = useCustomSWR<
		unknown,
		GetGroupListResponse
	>(api.Get_Groups(UserGroups.SCHOOL), 'GET')

	return {
		getSchoolsGroupsListResponse: data,
		error_getSchoolsGroups: error,
		isLoading_getSchoolsGroups: isLoading,
		isValidating_getSchoolsGroups: isValidating,
		mutate_getSchoolsGroups: customMutate,
	}
}
