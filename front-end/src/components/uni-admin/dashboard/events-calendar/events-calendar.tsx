import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './events-calendar.scss'

const localizer = momentLocalizer(moment) // or globalizeLocalizer

export interface EventItem  {
    id: string;
    title: string;
    desc: string;
    start: Date;
    end: Date;
    time: Date;
}

type Props = {
	eventItemList: EventItem[]
}

const EventsCalendar = ({ eventItemList } : Props) => {
	return (
		<div className="calendar-container">
			<div className="calendar-title">Upcoming Events</div>
			<Calendar
				localizer={localizer}
				events={eventItemList}
				startAccessor="start"
				endAccessor="end"
			/>
		</div>
	)
}

export default EventsCalendar
