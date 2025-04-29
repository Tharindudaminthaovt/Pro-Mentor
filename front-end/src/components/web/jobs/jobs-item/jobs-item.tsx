import { Card } from 'react-bootstrap'
import { timeAgo } from '../../../../utils/dateTImeHandler'
import { GetJobListResponse } from '../../../../hooks/web/jobs/useGetJobList'
import Avatar from 'react-avatar'
import './job-item.scss'

type Props = {
	item: GetJobListResponse
	setSelectedJob?: (item: GetJobListResponse) => void
}

function JobsItem({ item, setSelectedJob }: Props) {

	return (
		<Card
			className="job-item mb-2"
			onClick={() => (setSelectedJob ? setSelectedJob(item) : undefined)}
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

export default JobsItem
