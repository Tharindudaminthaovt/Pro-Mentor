export class QueryParamsSetter {
	setQueryParams(params: Record<string, string>): string {
		return new URLSearchParams(params).toString()
	}
}

export class ParamsType {
	key: string = ''
	value: string = ''
}
