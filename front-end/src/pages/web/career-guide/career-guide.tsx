// import PageHeader from '../../../components/shared/page-header/page-header'
// import { Button, Modal, Spinner, Accordion, Form } from 'react-bootstrap'
// import { SubmitHandler, useForm } from 'react-hook-form'
// import {
// 	GetSkillListResponse,
// 	useGetSkills,
// } from '../../../hooks/web/career-guide/useGetSkills'
// import { useEffect, useState } from 'react'
// import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
// import {
// 	CareerGuideResponse,
// 	usePostCareerGuide,
// } from '../../../hooks/web/career-guide/usePostCareerGuide'
// import './career-guide.scss'
// import DisplayGuide from '../../../components/web/posts/career-guide/display-guide'

// export interface SelectSkillsFormData {
// 	skills?: any | string[]
// }

// const CareerGuide = () => {
// 	const [isLoading, setIsLoading] = useState(false)
// 	const [career, setCareer] = useState('')
// 	const [isDisplayGuide, setIsDisplayGuide] = useState(false)
// 	const [guides, setGuides] = useState<CareerGuideResponse[]>([])
// 	const [skills, setSkills] = useState<GetSkillListResponse[]>([])
// 	const { handleSubmit, control } = useForm<SelectSkillsFormData>()

// 	const {
// 		setGetCareerPathRequest,
// 		getCareerPathResponse,
// 		isLoading_getCareerPath,
// 		isValidating_getCareerPath,
// 		error_getCareerPath,
// 		setIsReqeustReady_getCareerPath,
// 		mutate_getCareerPath,
// 	} = usePostCareerGuide()

// 	const {
// 		getSkillsResponse,
// 		isLoading_getSkills,
// 		isValidating_getSkills,
// 		error_getSkills,
// 	} = useGetSkills()

// 	const onSubmit: SubmitHandler<SelectSkillsFormData> = (data) => {
// 		console.log(Object.keys(data.skills))
// 		const skillIdList = Object.keys(data.skills)
// 		const skillList = skills.flatMap((category) => {
// 			return category.category
// 		})

// 		const selectedSkills = skillIdList
// 			?.map((skillId: any) => {
// 				console.log(data.skills[skillId], skillId)
// 				if (data.skills[skillId]) {
// 					return skillList.find((skill) => skill.id == skillId)
// 				}
// 				return
// 			})
// 			.filter((item) => !!item)
// 			.reduce(
// 				(acc, current) =>
// 					acc
// 						? acc + (current?.value ? ',' + current?.value : '')
// 						: current?.value
// 							? current.value
// 							: '',
// 				''
// 			)

// 		setGetCareerPathRequest({
// 			skills: selectedSkills,
// 		})
// 		setIsReqeustReady_getCareerPath(true)
// 		mutate_getCareerPath()
// 	}

// 	// close both add and deactivate modals
// 	const modalCloseHandler = () => {
// 		setIsDisplayGuide(false)
// 	}

// 	useEffect(() => {
// 		if (getCareerPathResponse) {
// 			setCareer(getCareerPathResponse.job)
// 			setGuides(getCareerPathResponse.guides)
// 			setIsDisplayGuide(true)
// 		} else {
// 			setCareer('')
// 			setGuides([])
// 		}
// 	}, [getCareerPathResponse])

// 	useEffect(() => {
// 		if (getSkillsResponse && getSkillsResponse.length > 0) {
// 			setSkills(getSkillsResponse)
// 		} else if (getSkillsResponse && getSkillsResponse.length === 0) {
// 			setSkills([])
// 		}
// 	}, [getSkillsResponse])

// 	useEffect(() => {
// 		errorDisplayHandler(error_getSkills)
// 		errorDisplayHandler(error_getCareerPath)
// 	}, [error_getSkills, error_getCareerPath])

// 	useEffect(() => {
// 		if (
// 			isLoading_getSkills ||
// 			isValidating_getSkills ||
// 			isLoading_getCareerPath ||
// 			isValidating_getCareerPath
// 		) {
// 			setIsLoading(true)
// 		} else {
// 			setIsLoading(false)
// 		}
// 	}, [
// 		isLoading_getSkills,
// 		isValidating_getSkills,
// 		isLoading_getCareerPath,
// 		isValidating_getCareerPath,
// 	])

// 	return (
// 		<>
// 			<div>
// 				<PageHeader title="Career Guide" />
// 				<div>
// 					<Form onSubmit={handleSubmit(onSubmit)}>
// 						<Form.Group className="mb-3" controlId="skills">
// 							<Accordion defaultActiveKey={['0']} alwaysOpen>
// 								{skills?.map(
// 									(item, index) =>
// 										item.category &&
// 										item.category.length > 0 && (
// 											<Accordion.Item eventKey={index.toString()} key={index}>
// 												<Accordion.Header>{item.value}</Accordion.Header>
// 												<Accordion.Body>
// 													{item.category.map((skill) => (
// 														<Form.Check
// 															inline
// 															label={skill.value}
// 															key={skill.id}
// 															{...control.register(`skills.${skill.id}`)}
// 														/>
// 													))}
// 												</Accordion.Body>
// 											</Accordion.Item>
// 										)
// 								)}
// 							</Accordion>
// 						</Form.Group>
// 						<Button variant="primary" type="submit">
// 							Submit
// 						</Button>
// 					</Form>
// 				</div>
// 			</div>

// 			<DisplayGuide
// 				isDisplayGuide={isDisplayGuide}
// 				modalCloseHandler={modalCloseHandler}
// 				title={career}
// 				guides={guides}
// 			/>

// 			{/* Loader overlay */}
// 			<Modal show={isLoading} backdrop="static" keyboard={false} centered>
// 				<Modal.Body className="text-center">
// 					<Spinner animation="border" role="status" />
// 				</Modal.Body>
// 			</Modal>
// 		</>
// 	)
// }

// export default CareerGuide

import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
	Button,
	Modal,
	Spinner,
	Accordion,
	Form,
	Card,
	Badge,
} from 'react-bootstrap'
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
import './career-guide.scss'

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
		<div className="career-guide-container">
			<PageHeader
				title="Career Path Finder"
				subtitle="Select your skills to discover potential career paths"
			/>

			<Card className="shadow-sm mb-4">
				<Card.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<div className="d-flex justify-content-between align-items-center mb-4">
							<h3 className="mb-0">Select Your Skills</h3>
							{selectedSkillsCount > 0 && (
								<Badge pill bg="primary" className="px-3 py-2">
									{selectedSkillsCount}{' '}
									{selectedSkillsCount === 1 ? 'skill' : 'skills'} selected
								</Badge>
							)}
						</div>

						<Form.Group controlId="skills">
							<Accordion defaultActiveKey={['0']} alwaysOpen flush>
								{skills?.map(
									(item, index) =>
										item.category?.length > 0 && (
											<motion.div
												key={index}
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.3, delay: index * 0.05 }}
											>
												<Accordion.Item
													eventKey={index.toString()}
													className="mb-3 border-0 shadow-sm"
												>
													<Accordion.Header className="fw-bold">
														<div className="d-flex align-items-center">
															<span className="me-2">{item.value}</span>
															<Badge
																pill
																bg="light"
																text="dark"
																className="ms-auto"
															>
																{item.category.length}
															</Badge>
														</div>
													</Accordion.Header>
													<Accordion.Body className="skill-checkboxes">
														<div className="row">
															{item.category.map((skill) => (
																<div className="col-md-4 mb-3" key={skill.id}>
																	<Form.Check
																		type="checkbox"
																		id={`skill-${skill.id}`}
																		label={skill.value}
																		{...control.register(`skills.${skill.id}`)}
																		className="form-check-lg"
																	/>
																</div>
															))}
														</div>
													</Accordion.Body>
												</Accordion.Item>
											</motion.div>
										)
								)}
							</Accordion>
						</Form.Group>

						<div className="text-center mt-4">
							<Button
								variant="primary"
								type="submit"
								size="lg"
								className="px-5 py-2"
								disabled={isLoading || selectedSkillsCount === 0}
							>
								{isLoading ? (
									<>
										<Spinner
											as="span"
											animation="border"
											size="sm"
											role="status"
											aria-hidden="true"
											className="me-2"
										/>
										Analyzing...
									</>
								) : (
									'Find Career Paths'
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
						className="loading-overlay"
					>
						<div className="text-center">
							<Spinner
								animation="border"
								variant="primary"
								role="status"
								className="mb-3"
								style={{ width: '3rem', height: '3rem' }}
							/>
							<h5 className="text-white">
								Finding the best career paths for you...
							</h5>
							<p className="text-light">This may take a few moments</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default CareerGuide
