import React, { MouseEvent, ReactNode } from 'react'
import './dots-toggle.scss'

type DotsToggleProps = {
	children: ReactNode
	onClick: (e: MouseEvent<HTMLDivElement>) => void
}

const DotsToggle = React.forwardRef<HTMLDivElement, DotsToggleProps>(
	function DotsToggleComponent({ children, onClick }, ref) {
		return (
			<div
				ref={ref}
				onClick={(e) => {
					e.preventDefault()
					onClick(e)
				}}
				className="dots-toggle"
			>
				{children}
				<span className="threedots" />
			</div>
		)
	}
)

DotsToggle.displayName = 'DotsToggle'

export default DotsToggle
