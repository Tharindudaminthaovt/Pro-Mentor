import React from 'react'
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

export interface JobPostChatDate {
	date: string;
	job: number;
	post: number;
}

type Props = {
	chartDate: JobPostChatDate[]
}

const JobPostsChart = ({chartDate}: Props) => {
	return (
		<div className="chart-container">
			<div className="chart-title">Published Job Posts</div>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					width={500}
					height={300}
					data={chartDate}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey="job"
						stroke="#8884d8"
						activeDot={{ r: 8 }}
					/>
					<Line type="monotone" dataKey="post" stroke="#82ca9d" />
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

export default JobPostsChart
