/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import {
	Button,
	Form,
	Modal,
	Spinner,
	Container,
	Row,
	Col,
	Card,
} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { SessionHandler } from '../../../utils/session-handler'
import {
	GetJobListResponse,
	useGetJobList,
} from '../../../hooks/web/jobs/useGetJobList'
import { useGetJob } from '../../../hooks/web/jobs/useGetJob'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import {
	GetJobTypeListResponse,
	useGetJobTypeList,
} from '../../../hooks/web/jobs/useGetJobTypeList'
import {
	GetModalityListResponse,
	useGetModalityList,
} from '../../../hooks/web/jobs/useGetModalityList'
import {
	GetLocationListResponse,
	useGetLocationList,
} from '../../../hooks/web/jobs/useGetLocationList'
import Select from 'react-dropdown-select'
import { useForm } from 'react-hook-form'
import {
	FiBriefcase,
	FiFilter,
	FiPlusCircle,
	FiMapPin,
	FiClock,
	FiDollarSign,
	FiChevronRight,
} from 'react-icons/fi'

const sessionHandler = new SessionHandler()

const checkUser = () => {
	const user = sessionHandler.getSession('user')
	return user === 'lecture' || user === 'user'
}

interface FormData {
	search?: string
	selectedJobTypes?: GetJobTypeListResponse[]
	selectedModality?: GetModalityListResponse[]
	selectedLocations?: GetLocationListResponse[]
}

const Jobs = () => {
	const { jobId } = useParams()
	const navigate = useNavigate()
	const { handleSubmit, register, setValue } = useForm<FormData>()
	const [isLoading, setIsLoading] = useState(false)
	const isCreateVisible = checkUser()
	const [manuallySelected, setManuallySelected] = useState(false)
	const [filtered, setFiltered] = useState(false)
	const [selectedJob, setSelectedJob] = useState<GetJobListResponse>()
	const [locationList, setLocationList] = useState<GetLocationListResponse[]>(
		[]
	)
	const [modalityList, setModalityList] = useState<GetModalityListResponse[]>(
		[]
	)
	const [jobTypeList, setJobTypeList] = useState<GetJobTypeListResponse[]>([])

	const {
		isLoading_getJobs,
		isValidating_getJobs,
		error_getJobs,
		setLocationId_getJobs,
		setSearch_getJobs,
		setModalityId_getJobs,
		setTypeId_getJobs,
		mutate_getJobs,
		getJobsListResponse,
	} = useGetJobList()

	const {
		isLoading_getJob,
		isValidating_getJob,
		error_getJob,
		getJobResponse,
		setJobId_getJob,
		mutate_getJob,
	} = useGetJob()

	const {
		isLoading_getJobType,
		isValidating_getJobType,
		error_getJobType,
		getJobTypeListResponse,
		mutate_getJobType,
	} = useGetJobTypeList()

	const {
		isLoading_getModality,
		isValidating_getModality,
		error_getModality,
		getModalityListResponse,
		mutate_getModality,
	} = useGetModalityList()

	const {
		isLoading_getLocations,
		isValidating_getLocations,
		error_getLocations,
		mutate_getLocations,
		getLocationsListResponse,
	} = useGetLocationList()

	const jobItemSelectHandler = (item: GetJobListResponse) => {
		setManuallySelected(true)
		setFiltered(false)
		setSelectedJob(item)
		navigate(`/jobs/${item.id}`)
	}

	const filterSubmitHandler = (data: FormData) => {
		setFiltered(true)
		setManuallySelected(false)
		setTypeId_getJobs(data.selectedJobTypes?.map((x) => x.id) || [''])
		setLocationId_getJobs(data.selectedLocations?.map((x) => x.id) || [''])
		setModalityId_getJobs(data.selectedModality?.map((x) => x.id) || [''])
		setSearch_getJobs(data?.search || '')
		mutate_getJobs()
	}

	useEffect(() => {
		mutate_getJobs()
		mutate_getJobType()
		mutate_getLocations()
		mutate_getModality()
	}, [])

	useEffect(() => {
		if (jobId) {
			setJobId_getJob(jobId)
			mutate_getJob()
		}
	}, [jobId])

	useEffect(() => {
		if (getJobResponse && !manuallySelected) {
			setSelectedJob(getJobResponse)
		}
	}, [getJobResponse])

	useEffect(() => {
		if (getJobsListResponse && getJobsListResponse.length === 0) {
			return
		}
		if (getJobsListResponse && filtered) {
			jobItemSelectHandler(getJobsListResponse[0])
		}
		if (getJobsListResponse && !jobId) {
			setSelectedJob(getJobsListResponse[0])
			navigate(`/jobs/${getJobsListResponse[0].id}`)
		}
	}, [getJobsListResponse])

	useEffect(() => {
		setJobTypeList(getJobTypeListResponse || [])
	}, [getJobTypeListResponse])

	useEffect(() => {
		setModalityList(getModalityListResponse || [])
	}, [getModalityListResponse])

	useEffect(() => {
		setLocationList(getLocationsListResponse || [])
	}, [getLocationsListResponse])

	useEffect(() => {
		if (
			isLoading_getJob ||
			isLoading_getJobs ||
			isLoading_getJobType ||
			isLoading_getLocations ||
			isLoading_getModality ||
			isValidating_getJob ||
			isValidating_getJobs ||
			isValidating_getJobType ||
			isValidating_getLocations ||
			isValidating_getModality
		) {
			setIsLoading(true)
		} else setIsLoading(false)
	}, [
		isLoading_getJob,
		isLoading_getJobs,
		isLoading_getJobType,
		isLoading_getLocations,
		isLoading_getModality,
		isValidating_getJob,
		isValidating_getJobs,
		isValidating_getJobType,
		isValidating_getLocations,
		isValidating_getModality,
	])

	useEffect(() => {
		errorDisplayHandler(error_getJob)
		errorDisplayHandler(error_getJobs)
		errorDisplayHandler(error_getJobType)
		errorDisplayHandler(error_getLocations)
		errorDisplayHandler(error_getModality)
	}, [
		error_getJob,
		error_getJobs,
		error_getJobType,
		error_getLocations,
		error_getModality,
	])

	return (
		<Container
			fluid
			style={{
				backgroundColor: '#FFFFFF',
				minHeight: '100vh',
				padding: '2rem 0',
				color: '#1E293B',
				fontFamily: "'Inter', sans-serif",
			}}
		>
			{/* Filter Section */}
			<Row className="mb-4">
				<Col>
					<Card
						style={{
							border: '1px solid #F1F5F9',
							borderRadius: '16px',
							boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
							padding: '1.5rem',
						}}
					>
						<Form onSubmit={handleSubmit(filterSubmitHandler)}>
							<Row>
								<Col md={3}>
									<Form.Group>
										<Form.Label style={{ fontWeight: '600', color: '#64748B' }}>
											Search
										</Form.Label>
										<Form.Control
											type="text"
											placeholder="Job title or company"
											style={{
												borderRadius: '12px',
												border: '1px solid #E2E8F0',
												padding: '0.75rem 1rem',
											}}
											{...register('search')}
										/>
									</Form.Group>
								</Col>

								<Col md={3}>
									<Form.Group>
										<Form.Label style={{ fontWeight: '600', color: '#64748B' }}>
											Job Type
										</Form.Label>
										<Select
											options={jobTypeList.map((type) => ({
												value: type.id,
												label: type.key,
											}))}
											values={[]}
											multi
											onChange={(val) => {
												setValue(
													'selectedJobTypes',
													val.map((v) => ({
														id: v.value,
														key: v.label,
													}))
												)
											}}
											placeholder="Select types"
											style={{
												borderRadius: '12px',
												border: '1px solid #E2E8F0',
												padding: '0.25rem',
											}}
										/>
									</Form.Group>
								</Col>

								<Col md={3}>
									<Form.Group>
										<Form.Label style={{ fontWeight: '600', color: '#64748B' }}>
											Modality
										</Form.Label>
										<Select
											options={modalityList.map((type) => ({
												value: type.id,
												label: type.key,
											}))}
											values={[]}
											multi
											onChange={(val) => {
												setValue(
													'selectedModality',
													val.map((v) => ({
														id: v.value,
														key: v.label,
													}))
												)
											}}
											placeholder="Select modalities"
											style={{
												borderRadius: '12px',
												border: '1px solid #E2E8F0',
												padding: '0.25rem',
											}}
										/>
									</Form.Group>
								</Col>

								<Col md={2}>
									<Form.Group>
										<Form.Label style={{ fontWeight: '600', color: '#64748B' }}>
											Location
										</Form.Label>
										<Select
											options={locationList.map((type) => ({
												value: type.id,
												label: type.location,
											}))}
											values={[]}
											multi
											onChange={(val) => {
												setValue(
													'selectedLocations',
													val.map((v) => ({
														id: v.value,
														location: v.label,
													}))
												)
											}}
											placeholder="Select locations"
											style={{
												borderRadius: '12px',
												border: '1px solid #E2E8F0',
												padding: '0.25rem',
											}}
										/>
									</Form.Group>
								</Col>

								<Col
									md={1}
									className="d-flex align-items-end"
									style={{ marginBottom: '0.9rem' }}
								>
									<Button
										type="submit"
										style={{
											background:
												'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
											border: 'none',
											borderRadius: '12px',
											padding: '0.75rem 1.5rem',
											fontWeight: '600',
											color: '#FFFFFF',
											display: 'flex',
											alignItems: 'center',
											gap: '0.5rem',
											width: '100%',
											justifyContent: 'center',
										}}
									>
										<FiFilter size={18} />
									</Button>
								</Col>
							</Row>
						</Form>
					</Card>
				</Col>
			</Row>

			{isCreateVisible && (
				<Row className="mb-4">
					<Col>
						<Button
							onClick={() => navigate('/create-job')}
							style={{
								background: 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
								border: 'none',
								borderRadius: '12px',
								padding: '0.75rem 1.5rem',
								fontWeight: '600',
								marginLeft: '1.5rem',
								color: '#FFFFFF',
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
								transition: 'all 0.2s ease',
								boxShadow: '0 4px 6px rgba(79, 70, 229, 0.15)',
							}}
						>
							<FiPlusCircle size={18} />
							Create Job Post
						</Button>
					</Col>
				</Row>
			)}

			<Row>
				{/* Jobs List Column */}
				<Col lg={5}>
					<Card
						style={{
							border: '1px solid #F1F5F9',
							borderRadius: '16px',
							boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
							height: '100%',
						}}
					>
						<Card.Body style={{ padding: '1.5rem' }}>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.75rem',
									marginBottom: '1.5rem',
								}}
							>
								<div
									style={{
										width: '40px',
										height: '40px',
										borderRadius: '8px',
										background:
											'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										boxShadow: '0 4px 6px rgba(59, 130, 246, 0.15)',
									}}
								>
									<FiBriefcase size={20} color="#FFFFFF" />
								</div>
								<h3
									style={{
										color: '#1E293B',
										fontWeight: '600',
										fontSize: '1.25rem',
										margin: 0,
									}}
								>
									Tech Jobs
								</h3>
							</div>

							{getJobsListResponse && getJobsListResponse.length > 0 ? (
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '1rem',
									}}
								>
									{getJobsListResponse.map((job) => (
										<div
											key={job.id}
											onClick={() => jobItemSelectHandler(job)}
											style={{
												backgroundColor:
													job.id === selectedJob?.id ? '#F1F5F9' : '#FFFFFF',
												borderRadius: '12px',
												padding: '1.5rem',
												border:
													job.id === selectedJob?.id
														? '1px solid #3B82F6'
														: '1px solid #E2E8F0',
												cursor: 'pointer',
												transition: 'all 0.2s ease',
												':hover': {
													transform: 'translateY(-2px)',
													boxShadow: '0 4px 6px rgba(59, 130, 246, 0.1)',
												},
											}}
										>
											<h4
												style={{
													color: '#1E293B',
													fontWeight: '600',
													fontSize: '1rem',
													marginBottom: '0.5rem',
												}}
											>
												{job.title}
											</h4>
											<p
												style={{
													color: '#64748B',
													fontSize: '0.875rem',
													marginBottom: '0.75rem',
												}}
											>
												{job.companyName}
											</p>
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '0.5rem',
													flexWrap: 'wrap',
												}}
											>
												<span
													style={{
														backgroundColor: 'rgba(59, 130, 246, 0.1)',
														color: '#1D4ED8',
														fontWeight: '600',
														padding: '0.35rem 0.75rem',
														borderRadius: '8px',
														fontSize: '0.75rem',
														display: 'flex',
														alignItems: 'center',
														gap: '0.25rem',
													}}
												>
													<FiMapPin size={12} />
													{job.location?.location || 'Remote'}
												</span>
												<span
													style={{
														backgroundColor: 'rgba(16, 185, 129, 0.1)',
														color: '#047857',
														fontWeight: '600',
														padding: '0.35rem 0.75rem',
														borderRadius: '8px',
														fontSize: '0.75rem',
														display: 'flex',
														alignItems: 'center',
														gap: '0.25rem',
													}}
												>
													<FiClock size={12} />
													{job.modality?.key || 'Full-time'}
												</span>
												{job.tags?.slice(0, 2).map((tag, i) => (
													<span
														key={i}
														style={{
															backgroundColor: 'rgba(226, 232, 240, 0.5)',
															color: '#475569',
															fontWeight: '500',
															padding: '0.35rem 0.75rem',
															borderRadius: '8px',
															fontSize: '0.75rem',
														}}
													>
														{tag?.key}
													</span>
												))}
											</div>
										</div>
									))}
								</div>
							) : (
								<div
									style={{
										textAlign: 'center',
										padding: '3rem 0',
										color: '#64748B',
									}}
								>
									<div
										style={{
											fontSize: '5rem',
											color: '#E2E8F0',
											marginBottom: '1rem',
										}}
									>
										<FiBriefcase />
									</div>
									<h3
										style={{
											color: '#1E293B',
											fontWeight: '600',
											marginBottom: '0.5rem',
										}}
									>
										No jobs found
									</h3>
									<p
										style={{
											fontSize: '1rem',
											maxWidth: '400px',
											margin: '0 auto 1.5rem',
										}}
									>
										Try adjusting your search filters or check back later.
									</p>
								</div>
							)}
						</Card.Body>
					</Card>
				</Col>

				{/* Job Details Column */}
				<Col lg={7}>
					{selectedJob ? (
						<Card
							style={{
								border: '1px solid #F1F5F9',
								borderRadius: '16px',
								boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
								height: '100%',
							}}
						>
							<Card.Body style={{ padding: '2rem' }}>
								<div style={{ marginBottom: '2rem' }}>
									<h2
										style={{
											color: '#1E293B',
											fontWeight: '700',
											fontSize: '1.75rem',
											marginBottom: '0.5rem',
										}}
									>
										{selectedJob.title}
									</h2>
									<p
										style={{
											color: '#3B82F6',
											fontWeight: '600',
											fontSize: '1.125rem',
											marginBottom: '1rem',
										}}
									>
										{selectedJob.companyName}
									</p>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '1rem',
											flexWrap: 'wrap',
											marginBottom: '1.5rem',
										}}
									>
										<span
											style={{
												backgroundColor: 'rgba(59, 130, 246, 0.1)',
												color: '#1D4ED8',
												fontWeight: '600',
												padding: '0.5rem 1rem',
												borderRadius: '8px',
												fontSize: '0.875rem',
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
											}}
										>
											<FiMapPin size={14} />
											{selectedJob.location?.location || 'Remote'}
										</span>
										<span
											style={{
												backgroundColor: 'rgba(16, 185, 129, 0.1)',
												color: '#047857',
												fontWeight: '600',
												padding: '0.5rem 1rem',
												borderRadius: '8px',
												fontSize: '0.875rem',
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
											}}
										>
											<FiClock size={14} />
											{selectedJob.modality?.key || 'Full-time'}
										</span>
										<span
											style={{
												backgroundColor: 'rgba(234, 179, 8, 0.1)',
												color: '#B45309',
												fontWeight: '600',
												padding: '0.5rem 1rem',
												borderRadius: '8px',
												fontSize: '0.875rem',
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
											}}
										>
											<FiDollarSign size={14} />
											{selectedJob.salary || 'Competitive'}
										</span>
									</div>
									<Button
										variant="primary"
										style={{
											background:
												'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
											border: 'none',
											borderRadius: '12px',
											padding: '0.75rem 2rem',
											fontWeight: '600',
											boxShadow: '0 4px 6px rgba(79, 70, 229, 0.15)',
											display: 'inline-flex',
											alignItems: 'center',
											gap: '0.5rem',
										}}
									>
										Apply Now <FiChevronRight size={18} />
									</Button>
								</div>

								<div style={{ marginBottom: '2rem' }}>
									<h3
										style={{
											color: '#1E293B',
											fontWeight: '600',
											fontSize: '1.25rem',
											marginBottom: '1rem',
										}}
									>
										Job Description
									</h3>
									<div
										style={{
											color: '#475569',
											lineHeight: '1.6',
											whiteSpace: 'pre-line',
										}}
									>
										{selectedJob.description || 'No description provided.'}
									</div>
								</div>

								<div style={{ marginBottom: '2rem' }}>
									<h3
										style={{
											color: '#1E293B',
											fontWeight: '600',
											fontSize: '1.25rem',
											marginBottom: '1rem',
										}}
									>
										Requirements
									</h3>
									<div
										style={{
											color: '#475569',
											lineHeight: '1.6',
											whiteSpace: 'pre-line',
										}}
									>
										{selectedJob.requirements || 'No requirements listed.'}
									</div>
								</div>

								<div>
									<h3
										style={{
											color: '#1E293B',
											fontWeight: '600',
											fontSize: '1.25rem',
											marginBottom: '1rem',
										}}
									>
										Skills
									</h3>
									<div
										style={{
											display: 'flex',
											gap: '0.5rem',
											flexWrap: 'wrap',
										}}
									>
										{selectedJob.tags?.length ? (
											selectedJob.tags.map((tag, i) => (
												<span
													key={i}
													style={{
														backgroundColor: 'rgba(226, 232, 240, 0.5)',
														color: '#475569',
														fontWeight: '500',
														padding: '0.5rem 1rem',
														borderRadius: '8px',
														fontSize: '0.875rem',
													}}
												>
													{tag?.key}
												</span>
											))
										) : (
											<span style={{ color: '#64748B' }}>
												No specific skills listed
											</span>
										)}
									</div>
								</div>
							</Card.Body>
						</Card>
					) : (
						<Card
							style={{
								border: '1px solid #F1F5F9',
								borderRadius: '16px',
								boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
								height: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Card.Body style={{ textAlign: 'center', padding: '3rem' }}>
								<div
									style={{
										fontSize: '5rem',
										color: '#E2E8F0',
										marginBottom: '1rem',
									}}
								>
									<FiBriefcase />
								</div>
								<h3
									style={{
										color: '#1E293B',
										fontWeight: '600',
										marginBottom: '0.5rem',
									}}
								>
									Select a job to view details
								</h3>
								<p style={{ color: '#64748B', marginBottom: 0 }}>
									Choose from the list on the left to see the full job
									description and requirements
								</p>
							</Card.Body>
						</Card>
					)}
				</Col>
			</Row>

			{/* Loader */}
			<Modal
				show={isLoading}
				backdrop="static"
				keyboard={false}
				centered
				style={{ border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
			>
				<Modal.Body
					style={{
						backgroundColor: '#FFFFFF',
						borderRadius: '16px',
						border: '1px solid #F1F5F9',
						padding: '2rem',
						textAlign: 'center',
						maxWidth: '300px',
						margin: '0 auto',
						boxShadow: '0 8px 32px rgba(15, 23, 42, 0.1)',
					}}
				>
					<div
						style={{
							position: 'relative',
							width: '60px',
							height: '60px',
							margin: '0 auto 1.5rem',
						}}
					>
						<Spinner
							animation="border"
							variant="primary"
							style={{
								width: '60px',
								height: '60px',
								borderWidth: '4px',
								borderColor: '#4F46E5 transparent #4F46E5 transparent',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: '-10px',
								left: '-10px',
								right: '-10px',
								bottom: '-10px',
								border: '2px solid rgba(79, 70, 229, 0.2)',
								borderRadius: '50%',
								animation: 'pulse 2s infinite',
							}}
						></div>
					</div>
					<h4
						style={{
							color: '#1E293B',
							fontWeight: '600',
							marginBottom: '0.5rem',
						}}
					>
						Loading Jobs
					</h4>
					<p
						style={{
							color: '#64748B',
							fontSize: '0.875rem',
							marginBottom: 0,
						}}
					>
						Fetching the latest opportunities...
					</p>
				</Modal.Body>
			</Modal>
		</Container>
	)
}

export default Jobs
