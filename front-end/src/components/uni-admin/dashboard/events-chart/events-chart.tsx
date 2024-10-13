import React from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Rectangle,
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

const EventsChart = ({chartDate}: Props) => {
	return (
		<div className="chart-container">
			<div className="chart-title">Published Events</div>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
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
					<Bar
						dataKey="job"
						fill="#8884d8"
						activeBar={<Rectangle fill="pink" stroke="blue" />}
					/>
					<Bar
						dataKey="post"
						fill="#82ca9d"
						activeBar={<Rectangle fill="gold" stroke="purple" />}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default EventsChart
