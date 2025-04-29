// features/events/eventSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GetEventListResponse } from '../../hooks/web/web-events/useGetEventList'

interface EventState {
	eventList: GetEventListResponse[]
}

const initialState: EventState = {
	eventList: [],
}

export const eventSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		setEventList: (state, action: PayloadAction<GetEventListResponse[]>) => {
			state.eventList = action.payload
		},
		clearEventList: (state) => {
			state.eventList = []
		},
	},
})

export const { setEventList, clearEventList } = eventSlice.actions
export default eventSlice.reducer
