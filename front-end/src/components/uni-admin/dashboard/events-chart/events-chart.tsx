// import React from 'react'
// import {
// 	Bar,
// 	BarChart,
// 	CartesianGrid,
// 	Legend,
// 	Rectangle,
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

// const EventsChart = ({chartDate}: Props) => {
// 	return (
// 		<div className="chart-container">
// 			<div className="chart-title">Published Events</div>
// 			<ResponsiveContainer width="100%" height="100%">
// 				<BarChart
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
// 					<Bar
// 						dataKey="job"
// 						fill="#8884d8"
// 						activeBar={<Rectangle fill="pink" stroke="blue" />}
// 					/>
// 					<Bar
// 						dataKey="post"
// 						fill="#82ca9d"
// 						activeBar={<Rectangle fill="gold" stroke="purple" />}
// 					/>
// 				</BarChart>
// 			</ResponsiveContainer>
// 		</div>
// 	)
// }

// export default EventsChart

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
import { FiCalendar, FiTrendingUp } from 'react-icons/fi'

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
					borderRadius: '8px',
					padding: '12px',
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
					fontSize: '14px',
				}}
			>
				<p
					style={{
						fontWeight: 600,
						margin: '0 0 8px 0',
						color: '#111827',
						borderBottom: '1px solid #f3f4f6',
						paddingBottom: '6px',
					}}
				>
					{label}
				</p>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						marginBottom: '6px',
						color: '#6b7280',
					}}
				>
					<span
						style={{
							display: 'inline-block',
							width: '10px',
							height: '10px',
							borderRadius: '2px',
							background: '#6366f1',
							marginRight: '8px',
						}}
					/>
					<span>
						Events:{' '}
						<strong style={{ color: '#111827' }}>{payload[0].value}</strong>
					</span>
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						color: '#6b7280',
					}}
				>
					<span
						style={{
							display: 'inline-block',
							width: '10px',
							height: '10px',
							borderRadius: '2px',
							background: '#10b981',
							marginRight: '8px',
						}}
					/>
					<span>
						Posts:{' '}
						<strong style={{ color: '#111827' }}>{payload[1].value}</strong>
					</span>
				</div>
			</div>
		)
	}
	return null
}

const EventsChart = ({ chartDate }: Props) => {
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
			<div style={{ marginBottom: '16px' }}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '12px',
						marginBottom: '8px',
					}}
				>
					<FiCalendar
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
						Events Overview
					</h3>
				</div>
				<p
					style={{
						fontSize: '14px',
						color: '#6b7280',
						margin: 0,
						paddingLeft: '32px',
					}}
				>
					Monthly event and post statistics
				</p>
			</div>

			<div style={{ flex: 1, minHeight: '250px' }}>
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={chartDate}
						margin={{
							top: 20,
							right: 30,
							left: 20,
							bottom: 20,
						}}
					>
						<CartesianGrid
							strokeDasharray="3 3"
							vertical={false}
							stroke="#f3f4f6"
						/>
						<XAxis
							dataKey="date"
							tick={{ fill: '#6b7280', fontSize: '12px' }}
							axisLine={{ stroke: '#e5e7eb' }}
							tickLine={{ stroke: '#e5e7eb' }}
						/>
						<YAxis
							tick={{ fill: '#6b7280', fontSize: '12px' }}
							axisLine={{ stroke: '#e5e7eb' }}
							tickLine={{ stroke: '#e5e7eb' }}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend
							iconType="square"
							formatter={(value) => (
								<span
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										fontSize: '12px',
										color: '#6b7280',
										marginLeft: '6px',
									}}
								>
									{value === 'job' ? (
										<>
											<FiCalendar
												style={{
													marginRight: '6px',
													fontSize: '14px',
													color: '#6366f1',
												}}
											/>{' '}
											Events
										</>
									) : (
										<>
											<FiTrendingUp
												style={{
													marginRight: '6px',
													fontSize: '14px',
													color: '#10b981',
												}}
											/>{' '}
											Posts
										</>
									)}
								</span>
							)}
						/>
						<Bar
							dataKey="job"
							fill="#6366f1"
							radius={[4, 4, 0, 0]}
							activeBar={{
								fill: '#818cf8',
								stroke: '#4f46e5',
								strokeWidth: 1,
							}}
						/>
						<Bar
							dataKey="post"
							fill="#10b981"
							radius={[4, 4, 0, 0]}
							activeBar={{
								fill: '#34d399',
								stroke: '#059669',
								strokeWidth: 1,
							}}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>

			<div
				style={{
					display: 'flex',
					gap: '16px',
					marginTop: '16px',
					justifyContent: 'center',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						fontSize: '12px',
						color: '#6b7280',
						background: '#f9fafb',
						padding: '6px 12px',
						borderRadius: '20px',
					}}
				>
					<span
						style={{
							display: 'inline-block',
							width: '10px',
							height: '10px',
							borderRadius: '2px',
							background: '#6366f1',
							marginRight: '8px',
						}}
					/>
					<span>Events</span>
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						fontSize: '12px',
						color: '#6b7280',
						background: '#f9fafb',
						padding: '6px 12px',
						borderRadius: '20px',
					}}
				>
					<span
						style={{
							display: 'inline-block',
							width: '10px',
							height: '10px',
							borderRadius: '2px',
							background: '#10b981',
							marginRight: '8px',
						}}
					/>
					<span>Posts</span>
				</div>
			</div>
		</div>
	)
}

export default EventsChart
