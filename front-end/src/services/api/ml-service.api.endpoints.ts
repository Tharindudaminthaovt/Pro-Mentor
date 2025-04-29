export class MlService {
	gateway: string

	constructor() {
		this.gateway = import.meta.env.VITE_ML_URL
	}

	Get_Skills() {
		return this.gateway + 'categories'
	}

	Post_CareerPath() {
		return this.gateway + 'request-path'
	}
}
