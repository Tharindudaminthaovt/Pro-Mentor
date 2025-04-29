import { GetEventListResponse } from '../hooks/web/web-events/useGetEventList'

export const getRandomEvents = (events: GetEventListResponse[], count = 3) => {
	const shuffled = [...events].sort(() => 0.5 - Math.random())
	return shuffled.slice(0, count)
}
