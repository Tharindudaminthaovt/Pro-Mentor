// import React from 'react'
// import {
// 	CartesianGrid,
// 	Legend,
// 	Line,
// 	LineChart,
// 	ResponsiveContainer,
// 	Tooltip,
// 	XAxis,
// 	YAxis,
// } from 'recharts'

// export interface JobPostChatDate {
// 	date: string;
// 	job: number;
// 	post: number;
// }

// type Props = {
// 	chartDate: JobPostChatDate[]
// }

// const JobPostsChart = ({chartDate}: Props) => {
// 	return (
// 		<div className="chart-container">
// 			<div className="chart-title">Published Job Posts</div>
// 			<ResponsiveContainer width="100%" height="100%">
// 				<LineChart
// 					width={500}
// 					height={300}
// 					data={chartDate}
// 					margin={{
// 						top: 5,
// 						right: 30,
// 						left: 20,
// 						bottom: 5,
// 					}}
// 				>
// 					<CartesianGrid strokeDasharray="3 3" />
// 					<XAxis dataKey="date" />
// 					<YAxis />
// 					<Tooltip />
// 					<Legend />
// 					<Line
// 						type="monotone"
// 						dataKey="job"
// 						stroke="#8884d8"
// 						activeDot={{ r: 8 }}
// 					/>
// 					<Line type="monotone" dataKey="post" stroke="#82ca9d" />
// 				</LineChart>
// 			</ResponsiveContainer>
// 		</div>
// 	)
// }

// export default JobPostsChart

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
import { FiBriefcase, FiFileText } from 'react-icons/fi'

export interface JobPostChatDate {
	date: string
	job: number
	post: number
}

type Props = {
	chartDate: JobPostChatDate[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div
				style={{
					background: 'white',
					border: '1px solid #e5e7eb',
					borderRadius: '6px',
					padding: '0.75rem',
					boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
				}}
			>
				<p
					style={{
						fontWeight: 600,
						margin: '0 0 0.5rem 0',
						color: '#111827',
					}}
				>
					{label}
				</p>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						marginBottom: '0.25rem',
						fontSize: '0.875rem',
					}}
				>
					<span
						style={{
							display: 'inline-block',
							width: '10px',
							height: '10px',
							borderRadius: '50%',
							background: '#6366f1',
							marginRight: '8px',
						}}
					/>
					<span>Jobs: {payload[0].value}</span>
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						fontSize: '0.875rem',
					}}
				>
					<span
						style={{
							display: 'inline-block',
							width: '10px',
							height: '10px',
							borderRadius: '50%',
							background: '#10b981',
							marginRight: '8px',
						}}
					/>
					<span>Posts: {payload[1].value}</span>
				</div>
			</div>
		)
	}
	return null
}

const JobPostsChart = ({ chartDate }: Props) => {
	console.log('>>>> chartDate >>>', chartDate)
	return (
		<div
			style={{
				background: 'white',
				borderRadius: '12px',
				padding: '1.5rem',
				boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div style={{ marginBottom: '1.5rem' }}>
				<h3
					style={{
						fontSize: '1.25rem',
						fontWeight: 600,
						color: '#111827',
						margin: '0 0 0.25rem 0',
					}}
				>
					Job & Post Activity
				</h3>
				<p
					style={{
						fontSize: '0.875rem',
						color: '#6b7280',
						margin: 0,
					}}
				>
					Recent publishing trends
				</p>
			</div>

			<div style={{ flex: 1, minHeight: '250px' }}>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={chartDate}
						margin={{
							top: 20,
							right: 30,
							left: 20,
							bottom: 20,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
						<XAxis
							dataKey="date"
							tick={{ fill: '#6b7280' }}
							axisLine={{ stroke: '#e5e7eb' }}
						/>
						<YAxis
							tick={{ fill: '#6b7280' }}
							axisLine={{ stroke: '#e5e7eb' }}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend
							iconType="circle"
							formatter={(value) => (
								<span
									style={{
										// display: 'inline-flex',
										display: 'flex',
										alignItems: 'center',
										fontSize: '0.75rem',
										color: '#6b7280',
										marginLeft: '6px',
									}}
								>
									{value === 'job' ? (
										<>
											<FiBriefcase
												style={{
													marginRight: '4px',
													fontSize: '0.875rem',
												}}
											/>{' '}
											Jobs
										</>
									) : (
										<>
											<FiFileText
												style={{
													marginRight: '4px',
													fontSize: '0.875rem',
												}}
											/>{' '}
											Posts
										</>
									)}
								</span>
							)}
						/>
						<Line
							type="monotone"
							dataKey="job"
							stroke="#6366f1"
							strokeWidth={2}
							dot={{ r: 4 }}
							activeDot={{ r: 6, strokeWidth: 0 }}
						/>
						<Line
							type="monotone"
							dataKey="post"
							stroke="#10b981"
							strokeWidth={2}
							dot={{ r: 4 }}
							activeDot={{ r: 6, strokeWidth: 0 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div
				style={{
					display: 'flex',
					gap: '1rem',
					marginTop: '1rem',
					justifyContent: 'center',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						fontSize: '0.75rem',
						color: '#6b7280',
					}}
				>
					<span
						style={{
							display: 'inline-block',
							width: '10px',
							height: '10px',
							borderRadius: '50%',
							background: '#6366f1',
							marginRight: '6px',
						}}
					/>
					<span>Job Posts</span>
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						fontSize: '0.75rem',
						color: '#6b7280',
					}}
				>
					<span
						style={{
							display: 'inline-block',
							width: '10px',
							height: '10px',
							borderRadius: '50%',
							background: '#10b981',
							marginRight: '6px',
						}}
					/>
					<span>Blog Posts</span>
				</div>
			</div>
		</div>
	)
}

export default JobPostsChart
