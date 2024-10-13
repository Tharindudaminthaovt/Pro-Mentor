export class SessionHandler {
	saveSession(key: string, value: string) {
		sessionStorage.setItem(key, JSON.stringify(value))
	}

	getSession(key: string) {
		if (sessionStorage.getItem(key)) {
			return JSON.parse(sessionStorage.getItem(key) || '')
			// Add type assertion to ensure value is always a string
		} else {
			return null
		}
	}

	destroySession(key: string) {
		sessionStorage.removeItem(key)
	}
}
