// // import 'react-big-calendar/lib/css/react-big-calendar.css'
// // import { Calendar, momentLocalizer } from 'react-big-calendar'
// // import moment from 'moment'
// // import './events-calendar.scss'

// // const localizer = momentLocalizer(moment) // or globalizeLocalizer

// // export interface EventItem {
// // 	id: string
// // 	title: string
// // 	desc: string
// // 	start: Date
// // 	end: Date
// // 	time: Date
// // }

// // type Props = {
// // 	eventItemList: EventItem[]
// // }

// // const EventsCalendar = ({ eventItemList }: Props) => {
// // 	return (
// // 		<div className="calendar-container">
// // 			<div className="calendar-title">Upcoming Events</div>
// // 			<Calendar
// // 				localizer={localizer}
// // 				events={eventItemList}
// // 				startAccessor="start"
// // 				endAccessor="end"
// // 			/>
// // 		</div>
// // 	)
// // }

// // export default EventsCalendar

// import React from 'react'
// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
// import { FiCalendar as CalendarIcon } from 'react-icons/fi'
// import 'react-big-calendar/lib/css/react-big-calendar.css'

// const localizer = momentLocalizer(moment)

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
// 	// Custom event style
// 	const eventStyleGetter = () => {
// 		return {
// 			style: {
// 				backgroundColor: '#6366f1',
// 				borderRadius: '4px',
// 				border: 'none',
// 				color: 'white',
// 				padding: '2px 4px',
// 				fontSize: '12px',
// 			},
// 		}
// 	}

// 	return (
// 		<div
// 			style={{
// 				background: 'white',
// 				borderRadius: '12px',
// 				padding: '20px',
// 				boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
// 				height: '100%',
// 				display: 'flex',
// 				flexDirection: 'column',
// 			}}
// 		>
// 			<div
// 				style={{
// 					marginBottom: '16px',
// 					display: 'flex',
// 					alignItems: 'center',
// 					gap: '12px',
// 				}}
// 			>
// 				<CalendarIcon
// 					style={{
// 						fontSize: '20px',
// 						color: '#6366f1',
// 					}}
// 				/>
// 				<h3
// 					style={{
// 						fontSize: '18px',
// 						fontWeight: 600,
// 						color: '#111827',
// 						margin: 0,
// 					}}
// 				>
// 					Upcoming Events
// 				</h3>
// 			</div>

// 			<div
// 				style={{
// 					flex: 1,
// 					// minHeight: '500px',
// 					minHeight: '400px',
// 					'& .rbc-calendar': {
// 						height: '100%',
// 					},
// 				}}
// 			>
// 				<Calendar
// 					localizer={localizer}
// 					events={eventItemList}
// 					startAccessor="start"
// 					endAccessor="end"
// 					style={{ height: '100%' }}
// 					eventPropGetter={eventStyleGetter}
// 					views={['month', 'week', 'day']}
// 					defaultView="month"
// 					toolbarStyle={{
// 						backgroundColor: '#f9fafb',
// 						padding: '10px',
// 						borderRadius: '8px',
// 						marginBottom: '10px',
// 					}}
// 					headerStyle={{
// 						backgroundColor: 'white',
// 						color: '#111827',
// 						fontWeight: 600,
// 						border: 'none',
// 					}}
// 					dayHeaderStyle={{
// 						backgroundColor: 'white',
// 						color: '#6b7280',
// 						fontWeight: 500,
// 						borderBottom: '1px solid #e5e7eb',
// 					}}
// 					dayStyle={() => ({
// 						borderLeft: '1px solid #e5e7eb',
// 						borderRight: '1px solid #e5e7eb',
// 					})}
// 				/>
// 			</div>
// 		</div>
// 	)
// }

// export default EventsCalendar

import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { FiCalendar as CalendarIcon, FiClock, FiMapPin } from 'react-icons/fi'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export interface EventItem {
	id: string
	title: string
	desc: string
	start: Date
	end: Date
	time: Date
	location?: string
}

type Props = {
	eventItemList: EventItem[]
}

const EventsCalendar = ({ eventItemList }: Props) => {
	// Custom event component
	const Event = ({ event }: { event: EventItem }) => (
		<div style={{ padding: '4px' }}>
			<strong style={{ display: 'block', marginBottom: '4px' }}>
				{event.title}
			</strong>
			{event.time && (
				<div
					style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}
				>
					<FiClock size={12} style={{ marginRight: '4px' }} />
					{moment(event.time).format('h:mm A')}
				</div>
			)}
			{event.location && (
				<div
					style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}
				>
					<FiMapPin size={12} style={{ marginRight: '4px' }} />
					{event.location}
				</div>
			)}
		</div>
	)

	// Custom event style
	const eventStyleGetter = () => {
		return {
			style: {
				backgroundColor: '#6366f1',
				borderRadius: '6px',
				border: 'none',
				color: 'white',
				padding: '2px',
				fontSize: '12px',
				boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
			},
		}
	}

	return (
		<div
			style={{
				background: 'white',
				borderRadius: '12px',
				padding: '24px',
				boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				border: '1px solid #F3F4F6',
			}}
		>
			<div
				style={{
					marginBottom: '20px',
					display: 'flex',
					alignItems: 'center',
					gap: '12px',
				}}
			>
				<div
					style={{
						background: '#6366F1',
						width: '40px',
						height: '40px',
						borderRadius: '8px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: 'white',
					}}
				>
					<CalendarIcon size={20} />
				</div>
				<div>
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
					<p
						style={{
							fontSize: '14px',
							color: '#6B7280',
							margin: 0,
						}}
					>
						{eventItemList.length} events scheduled
					</p>
				</div>
			</div>

			<div
				style={{
					flex: 1,
					minHeight: '500px',
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
					components={{
						event: Event,
					}}
					eventPropGetter={eventStyleGetter}
					views={['month', 'week', 'day', 'agenda']}
					defaultView="month"
					toolbarStyle={{
						backgroundColor: '#F9FAFB',
						padding: '12px',
						borderRadius: '8px',
						marginBottom: '12px',
						border: 'none',
					}}
					headerStyle={{
						backgroundColor: 'white',
						color: '#111827',
						fontWeight: 600,
						border: 'none',
						padding: '8px 0',
					}}
					dayHeaderStyle={{
						backgroundColor: 'white',
						color: '#6B7280',
						fontWeight: 500,
						borderBottom: '1px solid #E5E7EB',
						padding: '8px 0',
					}}
					dayStyle={() => ({
						borderLeft: '1px solid #E5E7EB',
						borderRight: '1px solid #E5E7EB',
					})}
					eventContainerStyle={{
						cursor: 'pointer',
					}}
					dayPropGetter={() => ({
						style: {
							borderBottom: '1px solid #E5E7EB',
						},
					})}
				/>
			</div>
		</div>
	)
}

export default EventsCalendar
