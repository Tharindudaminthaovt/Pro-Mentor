import { useEffect, useRef, useState } from 'react'
import './expand-description.scss'

type Props = {
	text: string
}

const ExpandDescription = (props: Props) => {
	const [expanded, setExpanded] = useState(false)
	const [showButton, setShowButton] = useState(false)
	const textRef = useRef<HTMLDivElement>(null)

	const toggleExpansion = () => {
		setExpanded(!expanded)
	}

	useEffect(() => {
		// Calculate the number of lines dynamically
		if (textRef.current) {
			const lineHeight = parseInt(
				window.getComputedStyle(textRef.current).lineHeight || '0',
				10
			)
			const maxHeight = lineHeight * 3 // Max height for 3 lines
			const actualHeight = textRef.current.scrollHeight
			setShowButton(actualHeight > maxHeight)
		}
	}, [props.text])

	return (
		<div className="description">
			<div className={`text ${expanded ? 'expanded' : ''}`} ref={textRef}>
				{props.text}
			</div>
			{showButton && (
				<div
					className="see-more-btn"
					style={{ transition: 'bottom 0.3s ease' }}
					onClick={toggleExpansion}
				>
					{expanded ? '<<< See less' : 'See more >>>'}
				</div>
			)}
		</div>
	)
}

export default ExpandDescription
