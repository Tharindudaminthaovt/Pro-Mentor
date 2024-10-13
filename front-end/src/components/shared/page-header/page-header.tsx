import React from 'react'
import './page-header.scss'

type Props = {
	title: string
	children?: React.ReactNode
}

const PageHeader = ({ title, children }: Props) => {
	return (
		<div className="page-header">
			<div className="title">{title}</div>

			{children ? (
				<div className="buttons-set">{children}</div>
			) : (
				<div className="buttons-set"></div>
			)}
		</div>
	)
}

export default PageHeader
