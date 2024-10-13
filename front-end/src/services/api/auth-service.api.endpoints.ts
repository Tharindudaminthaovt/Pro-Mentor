import { UserGroups } from '@promentor-app/shared-lib'
import { QueryParamsSetter } from '../../utils/query-params-setter'

export class AuthService {
	gateway: string
	qs: QueryParamsSetter = new QueryParamsSetter()

	constructor() {
		this.gateway = import.meta.env.VITE_AUTH_URL
	}

	Get_GroupsClass() {
		return this.gateway + 'groups/class'
	}

	Get_Staff(params: Record<string, string> = {}) {
		return (
			this.gateway + 'resource-managers' + '?' + this.qs.setQueryParams(params)
		)
	}

	Get_StaffById(id: string) {
		return this.gateway + 'resource-managers' + '/' + id
	}

	Post_Staff() {
		return this.gateway + 'resource-managers'
	}

	Patch_Staff(id: string) {
		return this.gateway + 'resource-managers/' + id
	}

	Post_Lecturer() {
		return this.gateway + 'lecturers'
	}

	Get_Lecturers(params: Record<string, string> = {}) {
		return this.gateway + 'lecturers' + '?' + this.qs.setQueryParams(params)
	}

	Patch_Lecturers(id: string) {
		return this.gateway + 'lecturers/' + id
	}

	Get_Groups(
		group: UserGroups.CLASS | UserGroups.DEGREE_PROGRAM | UserGroups.SCHOOL
	) {
		return this.gateway + 'groups/' + group
	}

	Post_Login() {
		return this.gateway + 'test/get-access-token'
	}

	Post_Student() {
		return this.gateway + 'students'
	}

	Get_Students(params: Record<string, string> = {}) {
		return this.gateway + 'students' + '?' + this.qs.setQueryParams(params)
	}

	Patch_Students(id: string) {
		return this.gateway + 'students/' + id
	}

	Get_StudentById(id: string) {
		return this.gateway + 'students' + '/' + id
	}

	Get_Summery() {
		return this.gateway + 'summery/count'
	}
}
