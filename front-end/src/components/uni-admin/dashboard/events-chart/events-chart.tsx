// // import React from 'react'
// // import {
// // 	Bar,
// // 	BarChart,
// // 	CartesianGrid,
// // 	Legend,
// // 	Rectangle,
// // 	ResponsiveContainer,
// // 	Tooltip,
// // 	XAxis,
// // 	YAxis,
// // } from 'recharts'

// // export interface JobPostChatDate {
// // 	date: string;
// // 	job: number;
// // 	post: number;
// // }

// // type Props = {
// // 	chartDate: JobPostChatDate[]
// // }

// // const EventsChart = ({chartDate}: Props) => {
// // 	return (
// // 		<div className="chart-container">
// // 			<div className="chart-title">Published Events</div>
// // 			<ResponsiveContainer width="100%" height="100%">
// // 				<BarChart
// // 					width={500}
// // 					height={300}
// // 					data={chartDate}
// // 					margin={{
// // 						top: 5,
// // 						right: 30,
// // 						left: 20,
// // 						bottom: 5,
// // 					}}
// // 				>
// // 					<CartesianGrid strokeDasharray="3 3" />
// // 					<XAxis dataKey="date" />
// // 					<YAxis />
// // 					<Tooltip />
// // 					<Legend />
// // 					<Bar
// // 						dataKey="job"
// // 						fill="#8884d8"
// // 						activeBar={<Rectangle fill="pink" stroke="blue" />}
// // 					/>
// // 					<Bar
// // 						dataKey="post"
// // 						fill="#82ca9d"
// // 						activeBar={<Rectangle fill="gold" stroke="purple" />}
// // 					/>
// // 				</BarChart>
// // 			</ResponsiveContainer>
// // 		</div>
// // 	)
// // }

// // export default EventsChart

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
// import { FiCalendar, FiTrendingUp } from 'react-icons/fi'

// export interface JobPostChatDate {
// 	date: string
// 	job: number
// 	post: number
// }

// type Props = {
// 	chartDate: JobPostChatDate[]
// }

// const CustomTooltip = ({ active, payload, label }: any) => {
// 	if (active && payload && payload.length) {
// 		return (
// 			<div
// 				style={{
// 					background: 'white',
// 					border: '1px solid #e5e7eb',
// 					borderRadius: '8px',
// 					padding: '12px',
// 					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
// 					fontSize: '14px',
// 				}}
// 			>
// 				<p
// 					style={{
// 						fontWeight: 600,
// 						margin: '0 0 8px 0',
// 						color: '#111827',
// 						borderBottom: '1px solid #f3f4f6',
// 						paddingBottom: '6px',
// 					}}
// 				>
// 					{label}
// 				</p>
// 				<div
// 					style={{
// 						display: 'flex',
// 						alignItems: 'center',
// 						marginBottom: '6px',
// 						color: '#6b7280',
// 					}}
// 				>
// 					<span
// 						style={{
// 							display: 'inline-block',
// 							width: '10px',
// 							height: '10px',
// 							borderRadius: '2px',
// 							background: '#6366f1',
// 							marginRight: '8px',
// 						}}
// 					/>
// 					<span>
// 						Events:{' '}
// 						<strong style={{ color: '#111827' }}>{payload[0].value}</strong>
// 					</span>
// 				</div>
// 				<div
// 					style={{
// 						display: 'flex',
// 						alignItems: 'center',
// 						color: '#6b7280',
// 					}}
// 				>
// 					<span
// 						style={{
// 							display: 'inline-block',
// 							width: '10px',
// 							height: '10px',
// 							borderRadius: '2px',
// 							background: '#10b981',
// 							marginRight: '8px',
// 						}}
// 					/>
// 					<span>
// 						Posts:{' '}
// 						<strong style={{ color: '#111827' }}>{payload[1].value}</strong>
// 					</span>
// 				</div>
// 			</div>
// 		)
// 	}
// 	return null
// }

// const EventsChart = ({ chartDate }: Props) => {
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
// 			<div style={{ marginBottom: '16px' }}>
// 				<div
// 					style={{
// 						display: 'flex',
// 						alignItems: 'center',
// 						gap: '12px',
// 						marginBottom: '8px',
// 					}}
// 				>
// 					<FiCalendar
// 						style={{
// 							fontSize: '20px',
// 							color: '#6366f1',
// 						}}
// 					/>
// 					<h3
// 						style={{
// 							fontSize: '18px',
// 							fontWeight: 600,
// 							color: '#111827',
// 							margin: 0,
// 						}}
// 					>
// 						Events Overview
// 					</h3>
// 				</div>
// 				<p
// 					style={{
// 						fontSize: '14px',
// 						color: '#6b7280',
// 						margin: 0,
// 						paddingLeft: '32px',
// 					}}
// 				>
// 					Monthly event and post statistics
// 				</p>
// 			</div>

// 			<div style={{ flex: 1, minHeight: '250px' }}>
// 				<ResponsiveContainer width="100%" height="100%">
// 					<BarChart
// 						data={chartDate}
// 						margin={{
// 							top: 20,
// 							right: 30,
// 							left: 20,
// 							bottom: 20,
// 						}}
// 					>
// 						<CartesianGrid
// 							strokeDasharray="3 3"
// 							vertical={false}
// 							stroke="#f3f4f6"
// 						/>
// 						<XAxis
// 							dataKey="date"
// 							tick={{ fill: '#6b7280', fontSize: '12px' }}
// 							axisLine={{ stroke: '#e5e7eb' }}
// 							tickLine={{ stroke: '#e5e7eb' }}
// 						/>
// 						<YAxis
// 							tick={{ fill: '#6b7280', fontSize: '12px' }}
// 							axisLine={{ stroke: '#e5e7eb' }}
// 							tickLine={{ stroke: '#e5e7eb' }}
// 						/>
// 						<Tooltip content={<CustomTooltip />} />
// 						<Legend
// 							iconType="square"
// 							formatter={(value) => (
// 								<span
// 									style={{
// 										display: 'inline-flex',
// 										alignItems: 'center',
// 										fontSize: '12px',
// 										color: '#6b7280',
// 										marginLeft: '6px',
// 									}}
// 								>
// 									{value === 'job' ? (
// 										<>
// 											<FiCalendar
// 												style={{
// 													marginRight: '6px',
// 													fontSize: '14px',
// 													color: '#6366f1',
// 												}}
// 											/>{' '}
// 											Events
// 										</>
// 									) : (
// 										<>
// 											<FiTrendingUp
// 												style={{
// 													marginRight: '6px',
// 													fontSize: '14px',
// 													color: '#10b981',
// 												}}
// 											/>{' '}
// 											Posts
// 										</>
// 									)}
// 								</span>
// 							)}
// 						/>
// 						<Bar
// 							dataKey="job"
// 							fill="#6366f1"
// 							radius={[4, 4, 0, 0]}
// 							activeBar={{
// 								fill: '#818cf8',
// 								stroke: '#4f46e5',
// 								strokeWidth: 1,
// 							}}
// 						/>
// 						<Bar
// 							dataKey="post"
// 							fill="#10b981"
// 							radius={[4, 4, 0, 0]}
// 							activeBar={{
// 								fill: '#34d399',
// 								stroke: '#059669',
// 								strokeWidth: 1,
// 							}}
// 						/>
// 					</BarChart>
// 				</ResponsiveContainer>
// 			</div>

// 			<div
// 				style={{
// 					display: 'flex',
// 					gap: '16px',
// 					marginTop: '16px',
// 					justifyContent: 'center',
// 				}}
// 			>
// 				<div
// 					style={{
// 						display: 'flex',
// 						alignItems: 'center',
// 						fontSize: '12px',
// 						color: '#6b7280',
// 						background: '#f9fafb',
// 						padding: '6px 12px',
// 						borderRadius: '20px',
// 					}}
// 				>
// 					<span
// 						style={{
// 							display: 'inline-block',
// 							width: '10px',
// 							height: '10px',
// 							borderRadius: '2px',
// 							background: '#6366f1',
// 							marginRight: '8px',
// 						}}
// 					/>
// 					<span>Events</span>
// 				</div>
// 				<div
// 					style={{
// 						display: 'flex',
// 						alignItems: 'center',
// 						fontSize: '12px',
// 						color: '#6b7280',
// 						background: '#f9fafb',
// 						padding: '6px 12px',
// 						borderRadius: '20px',
// 					}}
// 				>
// 					<span
// 						style={{
// 							display: 'inline-block',
// 							width: '10px',
// 							height: '10px',
// 							borderRadius: '2px',
// 							background: '#10b981',
// 							marginRight: '8px',
// 						}}
// 					/>
// 					<span>Posts</span>
// 				</div>
// 			</div>
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
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { FiCalendar, FiTrendingUp, FiBarChart2 } from 'react-icons/fi'

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
					border: '1px solid #E5E7EB',
					borderRadius: '8px',
					padding: '16px',
					boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
					fontSize: '14px',
				}}
			>
				<p
					style={{
						fontWeight: 600,
						margin: '0 0 8px 0',
						color: '#1F2937',
						borderBottom: '1px solid #F3F4F6',
						paddingBottom: '8px',
					}}
				>
					{label}
				</p>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<span
								style={{
									display: 'inline-block',
									width: '10px',
									height: '10px',
									borderRadius: '2px',
									background: '#6366F1',
									marginRight: '8px',
								}}
							/>
							<span style={{ color: '#6B7280' }}>Events</span>
						</div>
						<span style={{ fontWeight: 500, color: '#1F2937' }}>
							{payload[0].value}
						</span>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<span
								style={{
									display: 'inline-block',
									width: '10px',
									height: '10px',
									borderRadius: '2px',
									background: '#10B981',
									marginRight: '8px',
								}}
							/>
							<span style={{ color: '#6B7280' }}>Posts</span>
						</div>
						<span style={{ fontWeight: 500, color: '#1F2937' }}>
							{payload[1].value}
						</span>
					</div>
				</div>
			</div>
		)
	}
	return null
}

const EventsChart = ({ chartDate }: Props) => {
	// Calculate totals for summary (keeping original data keys)
	const totals = chartDate.reduce(
		(acc, curr) => {
			return {
				job: acc.job + curr.job,
				post: acc.post + curr.post,
			}
		},
		{ job: 0, post: 0 }
	)

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
			<div style={{ marginBottom: '24px' }}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '12px',
						marginBottom: '8px',
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
						<FiBarChart2 size={20} />
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
							Published Events
						</h3>
						<p
							style={{
								fontSize: '14px',
								color: '#6B7280',
								margin: 0,
							}}
						>
							Monthly event and post statistics
						</p>
					</div>
				</div>
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '16px',
					background: '#F9FAFB',
					borderRadius: '8px',
					padding: '12px 16px',
				}}
			>
				<div style={{ textAlign: 'center' }}>
					<p
						style={{
							fontSize: '12px',
							color: '#6B7280',
							margin: '0 0 4px 0',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '4px',
						}}
					>
						<span
							style={{
								display: 'inline-block',
								width: '10px',
								height: '10px',
								borderRadius: '2px',
								background: '#6366F1',
							}}
						/>
						Total Events
					</p>
					<p
						style={{
							fontSize: '20px',
							fontWeight: 600,
							color: '#111827',
							margin: 0,
						}}
					>
						{totals.job}
					</p>
				</div>
				<div style={{ textAlign: 'center' }}>
					<p
						style={{
							fontSize: '12px',
							color: '#6B7280',
							margin: '0 0 4px 0',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '4px',
						}}
					>
						<span
							style={{
								display: 'inline-block',
								width: '10px',
								height: '10px',
								borderRadius: '2px',
								background: '#10B981',
							}}
						/>
						Total Posts
					</p>
					<p
						style={{
							fontSize: '20px',
							fontWeight: 600,
							color: '#111827',
							margin: 0,
						}}
					>
						{totals.post}
					</p>
				</div>
			</div>

			<div style={{ flex: 1, minHeight: '300px' }}>
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={chartDate}
						margin={{
							top: 20,
							right: 20,
							left: 10,
							bottom: 20,
						}}
					>
						<CartesianGrid
							strokeDasharray="3 3"
							vertical={false}
							stroke="#F3F4F6"
						/>
						<XAxis
							dataKey="date"
							tick={{ fill: '#6B7280', fontSize: 12 }}
							axisLine={{ stroke: '#E5E7EB' }}
							tickLine={{ stroke: '#E5E7EB' }}
						/>
						<YAxis
							tick={{ fill: '#6B7280', fontSize: 12 }}
							axisLine={{ stroke: '#E5E7EB' }}
							tickLine={{ stroke: '#E5E7EB' }}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend
							iconType="square"
							iconSize={10}
							wrapperStyle={{
								paddingTop: '20px',
							}}
							formatter={(value) => (
								<span
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										fontSize: '12px',
										color: '#6B7280',
										marginLeft: '6px',
									}}
								>
									{value === 'job' ? (
										<>
											<FiCalendar
												style={{
													marginRight: '6px',
													fontSize: '14px',
													color: '#6366F1',
												}}
											/>
											Events
										</>
									) : (
										<>
											<FiTrendingUp
												style={{
													marginRight: '6px',
													fontSize: '14px',
													color: '#10B981',
												}}
											/>
											Posts
										</>
									)}
								</span>
							)}
						/>
						<Bar
							dataKey="job"
							fill="#6366F1"
							radius={[4, 4, 0, 0]}
							activeBar={{
								fill: '#818CF8',
								stroke: '#4F46E5',
								strokeWidth: 1,
							}}
						/>
						<Bar
							dataKey="post"
							fill="#10B981"
							radius={[4, 4, 0, 0]}
							activeBar={{
								fill: '#34D399',
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
					justifyContent: 'space-between',
					marginTop: '16px',
					fontSize: '12px',
					color: '#9CA3AF',
				}}
			>
				<span>Updated: {new Date().toLocaleDateString()}</span>
				<span>Showing last {chartDate.length} periods</span>
			</div>
		</div>
	)
}

export default EventsChart
