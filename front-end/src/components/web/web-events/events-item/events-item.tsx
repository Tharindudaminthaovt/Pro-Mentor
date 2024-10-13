import { Card } from 'react-bootstrap'
import { timeAgo } from '../../../../utils/dateTImeHandler'
import Avatar from 'react-avatar'
import './events-item.scss'
import { GetEventListResponse } from '../../../../hooks/web/web-events/useGetEventList'

type Props = {
	item: GetEventListResponse
	setSelectedEvent?: (item: GetEventListResponse) => void
}

function EventsItem({ item, setSelectedEvent }: Props) {
	// console.log(item)

	return (
		<Card
			className="event-item"
			onClick={() => (setSelectedEvent ? setSelectedEvent(item) : undefined)}
		>
			<div className="company-logo">
				<Avatar
					name={item.companyName}
					className="rounded-circle avatar"
					size="40"
				/>
			</div>
			<div className="data">
				<div className="title">{item.title}</div>
				<div className="company-name">{item.companyName}</div>
				<div className="location">{item.location.location}</div>
				<div className="times-ago">{timeAgo(item.updatedAt)}</div>
			</div>
		</Card>
	)
}

export default EventsItem
