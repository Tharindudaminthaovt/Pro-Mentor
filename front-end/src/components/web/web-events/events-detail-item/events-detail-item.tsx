import {
	faClock,
	faLocationPin,
	faShare,
	faSuitcase,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { timeAgo } from '../../../../utils/dateTImeHandler'
import './events-detail-item.scss'
import Avatar from 'react-avatar'
import { Card } from 'react-bootstrap'
import { GetEventListResponse } from '../../../../hooks/web/web-events/useGetEventList'

type Props = {
	eventDetails: GetEventListResponse
}

function EventsDetailItem({ eventDetails }: Props) {
	return (
		<Card className="selected-event">
			<div className="selected-top-row">
				<div className="company-logo">
					<Avatar
						name={eventDetails.companyName}
						className="rounded-circle avatar"
						size="40"
					/>
					<div className="title-section">
						<div className="title">{eventDetails.title}</div>
						<div className="company-name">{eventDetails.companyName}</div>
					</div>
				</div>

				<div className="times-ago">{timeAgo(eventDetails.updatedAt)}</div>
				<div className="share-btn">
					<FontAwesomeIcon icon={faShare} />
				</div>
			</div>

			<div className="section-down">
				<div className="details-section">
					<img src={eventDetails.url} alt="banner" className="banner" />
					<div className="detail-item">
						<div className="detail-icon">
							<FontAwesomeIcon icon={faLocationPin} />
						</div>
						<div className="detail-detail">
							{eventDetails.location.location}
						</div>
					</div>
					<div className="detail-item">
						<div className="detail-icon">
							<FontAwesomeIcon icon={faSuitcase} />
						</div>
						<div className="detail-detail">{eventDetails.mode.key}</div>
					</div>
					<div className="detail-item">
						<div className="detail-icon">
							<FontAwesomeIcon icon={faClock} />
						</div>
						<div className="detail-detail">{eventDetails.time}</div>
					</div>
				</div>

				<div className="tags-section">
					{eventDetails.tags &&
						eventDetails.tags.map((tag) => (
							<div key={tag.id} className="badge rounded-pill text-bg-primary">
								{tag.key}
							</div>
						))}
				</div>

				<div className="description-section">{eventDetails.description}</div>
			</div>
		</Card>
	)
}

export default EventsDetailItem
