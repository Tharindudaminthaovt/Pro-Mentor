import { Button, Modal, Badge, Card, Stack } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { CareerGuideResponse } from '../../../../hooks/web/career-guide/usePostCareerGuide'

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
	const formatGuideText = (text: string) => {
		const lines = text.split('\n')
		return lines.map((line, i) => {
			if (!line.trim()) return <br key={i} />

			if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
				return (
					<div key={i} style={{ display: 'flex', marginBottom: '0.5rem' }}>
						<span style={{ marginRight: '0.5rem' }}>•</span>
						<span style={{ whiteSpace: 'pre-wrap' }}>{line.substring(2)}</span>
					</div>
				)
			}

			if (/^\d+\./.test(line.trim())) {
				return (
					<div key={i} style={{ display: 'flex', marginBottom: '0.5rem' }}>
						<span style={{ marginRight: '0.5rem' }}>{line.split('.')[0]}.</span>
						<span style={{ whiteSpace: 'pre-wrap' }}>
							{line.substring(line.indexOf('.') + 1)}
						</span>
					</div>
				)
			}

			return (
				<p key={i} style={{ marginBottom: '0.5rem', whiteSpace: 'pre-wrap' }}>
					{line}
				</p>
			)
		})
	}

	// SVG icons as React components
	const WarningIcon = () => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
				fill="#D97706"
			/>
		</svg>
	)

	const CheckIcon = () => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
				fill="#10B981"
			/>
		</svg>
	)

	return (
		<Modal show={isDisplayGuide} onHide={modalCloseHandler} centered size="lg">
			<Modal.Header closeButton style={{ border: 'none', paddingBottom: 0 }}>
				<Modal.Title style={{ width: '100%' }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<h3 style={{ marginBottom: 0 }}>Career Path: {title}</h3>
						<Badge bg="primary" pill>
							{guides.length}{' '}
							{guides.length === 1 ? 'Recommendation' : 'Recommendations'}
						</Badge>
					</div>
					<hr style={{ marginTop: '1rem', marginBottom: 0 }} />
				</Modal.Title>
			</Modal.Header>

			<Modal.Body style={{ paddingTop: 0 }}>
				<AnimatePresence>
					{guides && guides.length > 0 ? (
						<Stack gap={3} style={{ marginTop: '1rem' }}>
							{guides.map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.05 }}
								>
									{item.needToImprove ? (
										// Improvement area card
										<Card
											style={{
												border: 'none',
												boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
												borderLeft: '4px solid #F59E0B',
												backgroundColor: 'rgba(245, 158, 11, 0.05)',
											}}
										>
											<Card.Body>
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
														marginBottom: '1rem',
													}}
												>
													<div
														style={{
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
															width: '32px',
															height: '32px',
															borderRadius: '50%',
															backgroundColor: 'rgba(245, 158, 11, 0.1)',
															marginRight: '0.5rem',
														}}
													>
														<WarningIcon />
													</div>
													<Badge
														bg="warning"
														text="dark"
														style={{
															padding: '0.5rem 1rem',
															fontSize: '0.875rem',
														}}
													>
														Priority Improvement Area
													</Badge>
												</div>
												<div style={{ color: '#78350F' }}>
													{formatGuideText(item.value)}
												</div>
											</Card.Body>
										</Card>
									) : (
										// Strength card
										<Card
											style={{
												border: 'none',
												boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
												borderLeft: '4px solid #10B981',
												backgroundColor: 'rgba(16, 185, 129, 0.05)',
											}}
										>
											<Card.Body>
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
														marginBottom: '1rem',
													}}
												>
													<div
														style={{
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
															width: '32px',
															height: '32px',
															borderRadius: '50%',
															backgroundColor: 'rgba(16, 185, 129, 0.1)',
															marginRight: '0.5rem',
														}}
													>
														<CheckIcon />
													</div>
													<Badge
														bg="success"
														style={{
															padding: '0.5rem 1rem',
															fontSize: '0.875rem',
														}}
													>
														Strength
													</Badge>
												</div>
												<div>{formatGuideText(item.value)}</div>
											</Card.Body>
										</Card>
									)}
								</motion.div>
							))}
						</Stack>
					) : (
						<div
							style={{
								textAlign: 'center',
								padding: '1.5rem 0',
								color: '#6c757d',
							}}
						>
							<h5 style={{ color: 'inherit' }}>No recommendations available</h5>
							<p style={{ color: 'inherit', marginBottom: 0 }}>
								Try selecting different skills to get more career guidance
							</p>
						</div>
					)}
				</AnimatePresence>
			</Modal.Body>

			<Modal.Footer style={{ border: 'none' }}>
				<Button
					variant="outline-secondary"
					onClick={modalCloseHandler}
					style={{ padding: '0.375rem 1.5rem' }}
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DisplayGuide
