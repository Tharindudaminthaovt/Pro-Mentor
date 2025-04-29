// import { Button, Modal } from 'react-bootstrap'
// import { CareerGuideResponse } from '../../../../hooks/web/career-guide/usePostCareerGuide'
// import './display-guide.scss'

// type Props = {
// 	isDisplayGuide: boolean
// 	modalCloseHandler: () => void
// 	title: string
// 	guides: CareerGuideResponse[]
// }

// const DisplayGuide = ({
// 	isDisplayGuide,
// 	modalCloseHandler,
// 	title,
// 	guides,
// }: Props) => {
// 	return (
// 		<>
// 			<Modal show={isDisplayGuide} onHide={modalCloseHandler}>
// 				<Modal.Header closeButton>
// 					<Modal.Title>{title}</Modal.Title>
// 				</Modal.Header>
// 				<Modal.Body>
// 					<div>
// 						{guides && guides.length > 0 ? (
// 							<ul>
// 								{guides.map((item, index) => (
// 									<li
// 										key={index}
// 										className={item.needToImprove ? 'hilight-yellow' : ''}
// 									>
// 										{item.value}
// 									</li>
// 								))}
// 							</ul>
// 						) : (
// 							<div>No guides</div>
// 						)}
// 					</div>
// 				</Modal.Body>
// 				<Modal.Footer>
// 					<Button variant="secondary" onClick={modalCloseHandler}>
// 						Close
// 					</Button>
// 					<Button variant="primary" onClick={modalCloseHandler}>
// 						Ok
// 					</Button>
// 				</Modal.Footer>
// 			</Modal>
// 		</>
// 	)
// }

// export default DisplayGuide

import { Button, Modal, Badge, Card, Stack } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { CareerGuideResponse } from '../../../../hooks/web/career-guide/usePostCareerGuide'
import './display-guide.scss'

type Props = {
	isDisplayGuide: boolean
	modalCloseHandler: () => void
	title: string
	guides: CareerGuideResponse[]
}

const DisplayGuide = ({
	isDisplayGuide,
	modalCloseHandler,
	title,
	guides,
}: Props) => {
	// Function to preserve line breaks and formatting
	const formatGuideText = (text: string) => {
		return text.split('\n').map((paragraph, i) => (
			<p key={i} className="mb-2">
				{paragraph || <br />}
			</p>
		))
	}

	return (
		<Modal show={isDisplayGuide} onHide={modalCloseHandler} centered size="lg">
			<Modal.Header closeButton className="border-0 pb-0">
				<Modal.Title className="w-100">
					<div className="d-flex justify-content-between align-items-center">
						<h3 className="mb-0">Career Path: {title}</h3>
						<Badge bg="primary" pill>
							{guides.length}{' '}
							{guides.length === 1 ? 'Recommendation' : 'Recommendations'}
						</Badge>
					</div>
					<hr className="mt-3 mb-0" />
				</Modal.Title>
			</Modal.Header>

			<Modal.Body className="pt-0">
				<AnimatePresence>
					{guides && guides.length > 0 ? (
						<Stack gap={3} className="mt-3">
							{guides.map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.05 }}
								>
									<Card
										className={`border-0 shadow-sm ${
											item.needToImprove ? 'highlight-card' : ''
										}`}
									>
										<Card.Body>
											{item.needToImprove && (
												<Badge bg="warning" text="dark" className="mb-2">
													Area for Improvement
												</Badge>
											)}
											<div className="guide-content">
												{formatGuideText(item.value)}
											</div>
										</Card.Body>
									</Card>
								</motion.div>
							))}
						</Stack>
					) : (
						<div className="text-center py-4">
							<h5 className="text-muted">No recommendations available</h5>
							<p className="text-muted">
								Try selecting different skills to get more career guidance
							</p>
						</div>
					)}
				</AnimatePresence>
			</Modal.Body>

			<Modal.Footer className="border-0">
				<Button
					variant="outline-secondary"
					onClick={modalCloseHandler}
					className="px-4"
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DisplayGuide
