import { QueryParamsSetter } from '../../utils/query-params-setter'

export class SocialService {
	gateway: string
	qs: QueryParamsSetter = new QueryParamsSetter()

	constructor() {
		this.gateway = import.meta.env.VITE_SOCIAL_URL
	}

	Post_CreatePost() {
		return this.gateway + 'posts'
	}

	Get_Posts(params: Record<string, string> = {}) {
		return this.gateway + 'posts' + '?' + this.qs.setQueryParams(params)
	}

	Get_Post(postId: string) {
		return this.gateway + 'posts' + '/' + postId
	}

	Post_AddComment(postId: string) {
		return this.gateway + 'posts' + '/' + postId + '/comments'
	}

	Get_Comments(postId: string, params: Record<string, string> = {}) {
		return (
			this.gateway +
			'posts' +
			'/' +
			postId +
			'/comments' +
			'?' +
			this.qs.setQueryParams(params)
		)
	}

	Put_PostLike(postId: string) {
		return this.gateway + 'posts' + '/' + postId + '/like'
	}

	Put_EditPost(postId: string) {
		return this.gateway + 'posts' + '/' + postId
	}

	Delete_deletePost(postId: string) {
		return this.gateway + 'posts' + '/' + postId
	}

	Get_Locations(params: Record<string, string> = {}) {
		return this.gateway + 'locations' + '?' + this.qs.setQueryParams(params)
	}

	Get_ModalityList(params: Record<string, string> = {}) {
		return this.gateway + 'job-modality' + '?' + this.qs.setQueryParams(params)
	}

	Get_JobTypes(params: Record<string, string> = {}) {
		return this.gateway + 'job-type' + '?' + this.qs.setQueryParams(params)
	}

	Get_Tags(params: Record<string, string> = {}) {
		return this.gateway + 'tags' + '?' + this.qs.setQueryParams(params)
	}

	Post_Location() {
		return this.gateway + 'locations'
	}

	Post_Modality() {
		return this.gateway + 'job-modality'
	}

	Post_JobType() {
		return this.gateway + 'job-type'
	}

	Post_CreateJob() {
		return this.gateway + 'jobs'
	}

	Get_Jobs(params: Record<string, string> = {}) {
		// console.log(params)
		return this.gateway + 'jobs' + '?' + this.qs.setQueryParams(params)
	}

	Get_Job(jobId: string) {
		return this.gateway + 'jobs' + '/' + jobId
	}

	Get_ModeList(params: Record<string, string> = {}) {
		return this.gateway + 'modes' + '?' + this.qs.setQueryParams(params)
	}

	Post_CreateEvent() {
		return this.gateway + 'events'
	}

	Post_Tag() {
		return this.gateway + 'tags'
	}

	Post_Mode() {
		return this.gateway + 'modes'
	}

	Get_Events(params: Record<string, string> = {}) {
		// console.log(params)
		return this.gateway + 'events' + '?' + this.qs.setQueryParams(params)
	}

	Get_Event(id: string) {
		return this.gateway + 'events' + '/' + id
	}

	Get_Summery() {
		return this.gateway + 'summery'
	}
}
