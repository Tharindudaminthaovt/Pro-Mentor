import {
	faClock,
	faLocationPin,
	faShare,
	faSuitcase,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { timeAgo } from '../../../../utils/dateTImeHandler'
import './jobs-detail-item.scss'
import { useEffect } from 'react'
import { GetJobListResponse } from '../../../../hooks/web/jobs/useGetJobList'
import Avatar from 'react-avatar'
import { Card, Container } from 'react-bootstrap'

type Props = {
	jobDetails: GetJobListResponse
}

function JobsDetailItem({ jobDetails }: Props) {
	return (
		<Card className="selected-job">
			<div className="selected-top-row">
				<div className="company-logo">
					<Avatar
						name={jobDetails.companyName}
						className="rounded-circle avatar"
						size="40"
					/>
					<div className="title-section">
						<div className="title">{jobDetails.title}</div>
						<div className="company-name">{jobDetails.companyName}</div>
					</div>
				</div>

				<div className="times-ago">{timeAgo(jobDetails.updatedAt)}</div>
				<div className="share-btn">
					<FontAwesomeIcon icon={faShare} />
				</div>
			</div>

			<div className="details-section">
				<div className="detail-item">
					<div className="detail-icon">
						<FontAwesomeIcon icon={faLocationPin} />
					</div>
					<div className="detail-detail">{jobDetails.location.location}</div>
				</div>
				<div className="detail-item">
					<div className="detail-icon">
						<FontAwesomeIcon icon={faSuitcase} />
					</div>
					<div className="detail-detail">{jobDetails.modality.key}</div>
				</div>
				<div className="detail-item">
					<div className="detail-icon">
						<FontAwesomeIcon icon={faClock} />
					</div>
					<div className="detail-detail">{jobDetails.type.key}</div>
				</div>
			</div>

			<div className="tags-section">
				{jobDetails.tags &&
					jobDetails.tags.map((tag) => (
						<div key={tag.id} className="badge rounded-pill text-bg-primary">
							{tag.key}
						</div>
					))}
			</div>

			{/* <div className="description-section">{jobDetails.description}</div> */}
			<pre>{jobDetails.description}</pre>
		</Card>
	)
}

export default JobsDetailItem
