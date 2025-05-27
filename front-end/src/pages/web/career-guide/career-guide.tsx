import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Spinner, Accordion, Form, Card } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../../../components/shared/page-header/page-header'
import {
	GetSkillListResponse,
	useGetSkills,
} from '../../../hooks/web/career-guide/useGetSkills'
import {
	CareerGuideResponse,
	usePostCareerGuide,
} from '../../../hooks/web/career-guide/usePostCareerGuide'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import DisplayGuide from '../../../components/web/posts/career-guide/display-guide'
import { FiChevronDown, FiCheck } from 'react-icons/fi'

interface SelectSkillsFormData {
	skills?: Record<string, boolean>
}

const CareerGuide = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [career, setCareer] = useState('')
	const [isDisplayGuide, setIsDisplayGuide] = useState(false)
	const [guides, setGuides] = useState<CareerGuideResponse[]>([])
	const [skills, setSkills] = useState<GetSkillListResponse[]>([])
	const { handleSubmit, control, watch } = useForm<SelectSkillsFormData>()

	const selectedSkillsCount = Object.keys(watch('skills') || {}).filter(
		(key) => watch('skills')?.[key]
	).length

	const {
		setGetCareerPathRequest,
		getCareerPathResponse,
		isLoading_getCareerPath,
		isValidating_getCareerPath,
		error_getCareerPath,
		setIsReqeustReady_getCareerPath,
		mutate_getCareerPath,
	} = usePostCareerGuide()

	const {
		getSkillsResponse,
		isLoading_getSkills,
		isValidating_getSkills,
		error_getSkills,
	} = useGetSkills()

	const onSubmit: SubmitHandler<SelectSkillsFormData> = (data) => {
		const skillIdList = Object.keys(data.skills || {}).filter(
			(key) => data.skills?.[key]
		)
		const skillList = skills.flatMap((category) => category.category)

		const selectedSkills = skillIdList
			.map((skillId) => skillList.find((skill) => skill.id == skillId))
			.filter(Boolean)
			.map((skill) => skill?.value)
			.join(',')

		setGetCareerPathRequest({
			skills: selectedSkills,
		})
		setIsReqeustReady_getCareerPath(true)
		mutate_getCareerPath()
	}

	const modalCloseHandler = () => {
		setIsDisplayGuide(false)
	}

	useEffect(() => {
		if (getCareerPathResponse) {
			setCareer(getCareerPathResponse.job)
			setGuides(getCareerPathResponse.guides)
			setIsDisplayGuide(true)
		} else {
			setCareer('')
			setGuides([])
		}
	}, [getCareerPathResponse])

	useEffect(() => {
		if (getSkillsResponse?.length) {
			setSkills(getSkillsResponse)
		} else {
			setSkills([])
		}
	}, [getSkillsResponse])

	useEffect(() => {
		errorDisplayHandler(error_getSkills)
		errorDisplayHandler(error_getCareerPath)
	}, [error_getSkills, error_getCareerPath])

	useEffect(() => {
		setIsLoading(
			isLoading_getSkills ||
				isValidating_getSkills ||
				isLoading_getCareerPath ||
				isValidating_getCareerPath
		)
	}, [
		isLoading_getSkills,
		isValidating_getSkills,
		isLoading_getCareerPath,
		isValidating_getCareerPath,
	])

	return (
		<div
			style={{
				backgroundColor: '#F8FAFC',
				minHeight: '100vh',
				padding: '24px',
			}}
		>
			<div
				style={{
					maxWidth: '1200px',
					margin: '0 auto',
				}}
			>
				{/* Page Header */}
				<div
					style={{
						marginBottom: '32px',
						textAlign: 'center',
					}}
				>
					<h1
						style={{
							color: '#1E293B',
							fontWeight: '700',
							marginBottom: '12px',
							fontSize: '32px',
						}}
					>
						Career Path Finder
					</h1>
					<p
						style={{
							color: '#64748B',
							fontSize: '16px',
							maxWidth: '600px',
							margin: '0 auto',
						}}
					>
						Select your skills to discover potential career paths that match
						your expertise
					</p>
				</div>

				{/* Skills Selection Card */}
				<Card
					style={{
						border: '1px solid #F1F5F9',
						borderRadius: '16px',
						boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
						marginBottom: '24px',
					}}
				>
					<Card.Body style={{ padding: '32px' }}>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginBottom: '24px',
								}}
							>
								<h2
									style={{
										color: '#1E293B',
										fontWeight: '600',
										fontSize: '20px',
										margin: 0,
									}}
								>
									Select Your Skills
								</h2>
								{selectedSkillsCount > 0 && (
									<span
										style={{
											backgroundColor: '#8B5CF6',
											borderRadius: '16px',
											padding: '6px 12px',
											fontSize: '14px',
											fontWeight: '500',
										}}
									>
										{selectedSkillsCount}{' '}
										{selectedSkillsCount === 1 ? 'skill' : 'skills'} selected
									</span>
								)}
							</div>

							<Form.Group controlId="skills">
								<Accordion defaultActiveKey={['0']} alwaysOpen flush>
									{skills?.map((item, index) => (
										<motion.div
											key={index}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, delay: index * 0.05 }}
										>
											<Accordion.Item
												eventKey={index.toString()}
												style={{
													border: '1px solid #F1F5F9',
													borderRadius: '12px',
													marginBottom: '16px',
													overflow: 'hidden',
												}}
											>
												<Accordion.Header
													style={{
														backgroundColor: '#F8FAFC',
														padding: '16px 20px',
													}}
												>
													<div
														style={{
															display: 'flex',
															alignItems: 'center',
															width: '100%',
														}}
													>
														<span
															style={{
																fontWeight: '600',
																color: '#1E293B',
																flex: 1,
															}}
														>
															{item.value}
														</span>
														<div
															style={{
																display: 'flex',
																alignItems: 'center',
															}}
														>
															<span
																style={{
																	backgroundColor: '#E2E8F0',
																	color: '#475569',
																	borderRadius: '12px',
																	padding: '4px 8px',
																	marginRight: '12px',
																	fontSize: '12px',
																}}
															>
																{item.category.length} skills
															</span>
															<FiChevronDown
																style={{
																	transition: 'transform 0.2s',
																}}
															/>
														</div>
													</div>
												</Accordion.Header>
												<Accordion.Body
													style={{
														padding: '16px 20px',
														backgroundColor: '#FFFFFF',
													}}
												>
													<div
														style={{
															display: 'grid',
															gridTemplateColumns:
																'repeat(auto-fill, minmax(250px, 1fr))',
															gap: '12px',
														}}
													>
														{item.category.map((skill) => (
															<Form.Check
																key={skill.id}
																type="checkbox"
																id={`skill-${skill.id}`}
																style={{
																	display: 'flex',
																	alignItems: 'center',
																	padding: '8px 12px',
																	backgroundColor: watch(`skills.${skill.id}`)
																		? '#F5F3FF'
																		: '#F8FAFC',
																	borderRadius: '8px',
																	border: `1px solid ${
																		watch(`skills.${skill.id}`)
																			? '#DDD6FE'
																			: '#E2E8F0'
																	}`,
																	transition: 'all 0.2s',
																}}
															>
																<Form.Check.Input
																	type="checkbox"
																	{...control.register(`skills.${skill.id}`)}
																	style={{
																		marginRight: '12px',
																		width: '18px',
																		height: '18px',
																		cursor: 'pointer',
																		display: 'none',
																	}}
																/>
																<Form.Check.Label
																	style={{
																		flex: 1,
																		color: '#1E293B',
																		cursor: 'pointer',
																	}}
																>
																	{skill.value}
																</Form.Check.Label>
																{watch(`skills.${skill.id}`) && (
																	<FiCheck
																		style={{
																			color: '#8B5CF6',
																		}}
																	/>
																)}
															</Form.Check>
														))}
													</div>
												</Accordion.Body>
											</Accordion.Item>
										</motion.div>
									))}
								</Accordion>
							</Form.Group>

							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									marginTop: '32px',
								}}
							>
								<Button
									type="submit"
									disabled={isLoading || selectedSkillsCount === 0}
									style={{
										background:
											'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
										border: 'none',
										borderRadius: '12px',
										padding: '12px 32px',
										fontWeight: '600',
										fontSize: '16px',
										color: '#FFFFFF',
										display: 'flex',
										alignItems: 'center',
										gap: '8px',
										boxShadow: '0 2px 4px rgba(139, 92, 246, 0.2)',
										opacity: selectedSkillsCount === 0 ? 0.6 : 1,
										cursor:
											selectedSkillsCount === 0 ? 'not-allowed' : 'pointer',
									}}
								>
									{isLoading ? (
										<>
											<Spinner
												as="span"
												animation="border"
												size="sm"
												role="status"
												aria-hidden="true"
											/>
											Analyzing Your Skills...
										</>
									) : (
										<>Find My Career Path</>
									)}
								</Button>
							</div>
						</Form>
					</Card.Body>
				</Card>

				<DisplayGuide
					isDisplayGuide={isDisplayGuide}
					modalCloseHandler={modalCloseHandler}
					title={career}
					guides={guides}
				/>

				<AnimatePresence>
					{isLoading && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							style={{
								position: 'fixed',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: 'rgba(15, 23, 42, 0.7)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								zIndex: 9999,
							}}
						>
							<div
								style={{
									textAlign: 'center',
									padding: '32px',
									backgroundColor: '#FFFFFF',
									borderRadius: '16px',
									maxWidth: '400px',
									boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
								}}
							>
								<Spinner
									animation="border"
									variant="primary"
									style={{
										width: '48px',
										height: '48px',
										marginBottom: '20px',
									}}
								/>
								<h3
									style={{
										color: '#1E293B',
										marginBottom: '8px',
									}}
								>
									Finding Your Career Path
								</h3>
								<p
									style={{
										color: '#64748B',
									}}
								>
									We're analyzing your skills to suggest the best career
									options...
								</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default CareerGuide
