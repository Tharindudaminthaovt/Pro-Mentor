import { QueryParamsSetter } from '../../utils/query-params-setter'

export class CDNService {
	gateway: string
	qs: QueryParamsSetter = new QueryParamsSetter()

	constructor() {
		this.gateway = import.meta.env.VITE_CDN_URL
	}

	Post_UploadPost() {
		return this.gateway + 'post'
	}
}
