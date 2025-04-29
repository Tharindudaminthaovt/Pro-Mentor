// import 'react-big-calendar/lib/css/react-big-calendar.css'
// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
// import './events-calendar.scss'

// const localizer = momentLocalizer(moment) // or globalizeLocalizer

// export interface EventItem {
// 	id: string
// 	title: string
// 	desc: string
// 	start: Date
// 	end: Date
// 	time: Date
// }

// type Props = {
// 	eventItemList: EventItem[]
// }

// const EventsCalendar = ({ eventItemList }: Props) => {
// 	return (
// 		<div className="calendar-container">
// 			<div className="calendar-title">Upcoming Events</div>
// 			<Calendar
// 				localizer={localizer}
// 				events={eventItemList}
// 				startAccessor="start"
// 				endAccessor="end"
// 			/>
// 		</div>
// 	)
// }

// export default EventsCalendar

import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { FiCalendar as CalendarIcon } from 'react-icons/fi'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export interface EventItem {
	id: string
	title: string
	desc: string
	start: Date
	end: Date
	time: Date
}

type Props = {
	eventItemList: EventItem[]
}

const EventsCalendar = ({ eventItemList }: Props) => {
	// Custom event style
	const eventStyleGetter = () => {
		return {
			style: {
				backgroundColor: '#6366f1',
				borderRadius: '4px',
				border: 'none',
				color: 'white',
				padding: '2px 4px',
				fontSize: '12px',
			},
		}
	}

	return (
		<div
			style={{
				background: 'white',
				borderRadius: '12px',
				padding: '20px',
				boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div
				style={{
					marginBottom: '16px',
					display: 'flex',
					alignItems: 'center',
					gap: '12px',
				}}
			>
				<CalendarIcon
					style={{
						fontSize: '20px',
						color: '#6366f1',
					}}
				/>
				<h3
					style={{
						fontSize: '18px',
						fontWeight: 600,
						color: '#111827',
						margin: 0,
					}}
				>
					Upcoming Events
				</h3>
			</div>

			<div
				style={{
					flex: 1,
					// minHeight: '500px',
					minHeight: '400px',
					'& .rbc-calendar': {
						height: '100%',
					},
				}}
			>
				<Calendar
					localizer={localizer}
					events={eventItemList}
					startAccessor="start"
					endAccessor="end"
					style={{ height: '100%' }}
					eventPropGetter={eventStyleGetter}
					views={['month', 'week', 'day']}
					defaultView="month"
					toolbarStyle={{
						backgroundColor: '#f9fafb',
						padding: '10px',
						borderRadius: '8px',
						marginBottom: '10px',
					}}
					headerStyle={{
						backgroundColor: 'white',
						color: '#111827',
						fontWeight: 600,
						border: 'none',
					}}
					dayHeaderStyle={{
						backgroundColor: 'white',
						color: '#6b7280',
						fontWeight: 500,
						borderBottom: '1px solid #e5e7eb',
					}}
					dayStyle={() => ({
						borderLeft: '1px solid #e5e7eb',
						borderRight: '1px solid #e5e7eb',
					})}
				/>
			</div>
		</div>
	)
}

export default EventsCalendar
