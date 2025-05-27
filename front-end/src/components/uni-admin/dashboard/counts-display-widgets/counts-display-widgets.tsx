// import './counts-display-widgets.scss'

// import { useGetCounts } from '../../../../hooks/uni-admin/dashboard/useGetCounts'

// export interface SummeryCounts {
// 	icon: string;
// 	title: string;
// 	count: number;
// }

// type Props = {
// 	countsList: SummeryCounts[]
// }

// const CountsDisplayWidgets = ({ countsList }: Props) => {
// 	const { countsData, isLoading, isValidating, error } = useGetCounts()

// 	if (error) return <div>Failed to load</div>
// 	if (isLoading || isValidating) return <div>Loading...</div>
// 	if (typeof countsData === 'string') return <div>Error!!!</div>

// 	return (
// 		<div className="counts-display">
// 			{countsList.map((count, index) => {
// 				return (
// 					<div className="count-container" key={index}>
// 						<div className="icon">
// 							<img src={count.icon} alt="icon" />
// 						</div>
// 						<div className="text">
// 							<div className="text-title">{count.title}</div>
// 							<h3 className="text-number">{count.count}</h3>
// 						</div>
// 					</div>
// 				)
// 			})}
// 		</div>
// 	)
// }

// export default CountsDisplayWidgets

import './counts-display-widgets.scss'
import {
	FiUsers,
	FiBriefcase,
	FiFileText,
	FiCalendar,
	// RiAdminLine,
} from 'react-icons/fi'
import { RiAdminLine } from 'react-icons/ri'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { FaPeopleGroup } from 'react-icons/fa6'
import { PiStudent } from 'react-icons/pi'

import { useGetCounts } from '../../../../hooks/uni-admin/dashboard/useGetCounts'

export interface SummeryCounts {
	icon: string
	title: string
	count: number
}

type Props = {
	countsList: SummeryCounts[]
}

const CountsDisplayWidgets = ({ countsList }: Props) => {
	const { countsData, isLoading, isValidating, error } = useGetCounts()

	if (error) return <div>Failed to load</div>
	if (isLoading || isValidating) return <div>Loading...</div>
	if (typeof countsData === 'string') return <div>Error!!!</div>

	// Map icon strings to actual icons
	const getIconComponent = (iconName: string) => {
		switch (iconName.toLowerCase()) {
			case '/src/assets/images/nav-admin.svg':
				return <RiAdminLine size={25} />
			case '/src/assets/images/nav-lecturers.svg':
				return <FaChalkboardTeacher size={25} />
			case '/src/assets/images/nav-staff.svg':
				return <FaPeopleGroup size={25} />
			case '/src/assets/images/nav-students.svg':
				return <PiStudent size={25} />
			case 'jobs':
				return <RiAdminLine size={20} />
			case 'posts':
				return <FiFileText size={20} />
			case '/src/assets/images/events.svg':
				return <FiCalendar size={20} />
			default:
				return <FiUsers size={20} />
		}
	}

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
				gap: '16px',
				width: '100%',
			}}
		>
			{countsList.map((count, index) => {
				// Determine colors based on index or type
				const colors = [
					{ bg: '#6366F1', text: '#E0E7FF' },
					{ bg: '#10B981', text: '#D1FAE5' },
					{ bg: '#F59E0B', text: '#FEF3C7' },
					{ bg: '#EF4444', text: '#FEE2E2' },
				][index % 4]

				return (
					<div
						key={index}
						style={{
							background: 'white',
							borderRadius: '12px',
							padding: '20px',
							boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
							border: '1px solid #F3F4F6',
							display: 'flex',
							alignItems: 'center',
							gap: '16px',
						}}
					>
						<div
							style={{
								background: colors.bg,
								width: '48px',
								height: '48px',
								borderRadius: '8px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'white',
								flexShrink: 0,
							}}
						>
							{/* <img src={count.icon} alt="icon" /> */}
							{getIconComponent(count.icon)}
						</div>
						<div>
							<p
								style={{
									fontSize: '14px',
									color: '#6B7280',
									margin: '0 0 4px 0',
									fontWeight: 500,
								}}
							>
								{count.title}
							</p>
							<h3
								style={{
									fontSize: '24px',
									fontWeight: 600,
									color: '#111827',
									margin: 0,
								}}
							>
								{count.count}
							</h3>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default CountsDisplayWidgets
