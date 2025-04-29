import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import eventReducer from '../features/events/eventSlice'

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		events: eventReducer,
	},
})

// Infer types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
