import './counts-display-widgets.scss'

import { useGetCounts } from '../../../../hooks/uni-admin/dashboard/useGetCounts'

export interface SummeryCounts {
	icon: string;
	title: string;
	count: number;
}


type Props = {
	countsList: SummeryCounts[]
}


const CountsDisplayWidgets = ({ countsList }: Props) => {
	const { countsData, isLoading, isValidating, error } = useGetCounts()

	if (error) return <div>Failed to load</div>
	if (isLoading || isValidating) return <div>Loading...</div>
	if (typeof countsData === 'string') return <div>Error!!!</div>

	return (
		<div className="counts-display">
			{countsList.map((count, index) => {
				return (
					<div className="count-container" key={index}>
						<div className="icon">
							<img src={count.icon} alt="icon" />
						</div>
						<div className="text">
							<div className="text-title">{count.title}</div>
							<h3 className="text-number">{count.count}</h3>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default CountsDisplayWidgets
