export function timeAgo(dateString: string): string {
	const currentDate = new Date()
	const pastDate = new Date(dateString)
	const timeDifference = currentDate.getTime() - pastDate.getTime()
	const seconds = Math.floor(timeDifference / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)

	if (days > 0) {
		return `${days}d ago`
	} else if (hours > 0) {
		return `${hours}h ago`
	} else if (minutes > 0) {
		return `${minutes}min ago`
	} else {
		return `${seconds}s ago`
	}
}

export function FieldValueTypeToDate(seconds: number, nanoseconds: number) : Date {
	return new Date(seconds * 1000 + nanoseconds / 1000000);
}

export function DateTimeToOnlyDateMonth(dateString: string) {
	const date = new Date(dateString);
	const month = date.toLocaleString('default', { month: 'long' });
	const day = date.getDate();
	
	return  `${month} ${day}`;
}
