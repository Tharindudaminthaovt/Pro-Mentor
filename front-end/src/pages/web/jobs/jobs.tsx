/* eslint-disable react-hooks/exhaustive-deps */
import JobsItem from '../../../components/web/jobs/jobs-item/jobs-item'
import JobsDetailItem from '../../../components/web/jobs/jobs-detail-item/jobs-detail-item'
import { useEffect, useState } from 'react'
import { Button, Form, FormControl, Modal, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { SessionHandler } from '../../../utils/session-handler'
import './jobs.scss'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

const sessionHandler = new SessionHandler()

const checkUser = () => {
	const user = sessionHandler.getSession('user')

	if (user === 'lecture' || user === 'user') return true
	else return false
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
	const { handleSubmit, register, setValue } = useForm<FormData>({
		resolver: undefined,
	})
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
		// setTagId_getJobs,
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
		// console.log(data)
		setFiltered(true)
		setManuallySelected(false)
		setTypeId_getJobs(data.selectedJobTypes?.map((x) => x.id) || [''])
		setLocationId_getJobs(data.selectedLocations?.map((x) => x.id) || [''])
		setModalityId_getJobs(data.selectedModality?.map((x) => x.id) || [''])
		setSearch_getJobs(data?.search || '')

		// console.log('send filters ===>')
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
			// console.log('got job id')
			setJobId_getJob(jobId)
			mutate_getJob()
		}
	}, [jobId])

	useEffect(() => {
		if (getJobResponse && !manuallySelected) {
			// console.log('got data ===>')
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
		<>
			<div className="page jobs-page">
				<Form className="top-row" onSubmit={handleSubmit(filterSubmitHandler)}>
					<Form.Group className="filter">
						<Form.Label>Search</Form.Label>
						<FormControl
							type="text"
							placeholder="Search"
							className="mr-sm-2"
							{...register('search')}
							// onKeyDown={keyDownHandler} // Listen for Enter key press
						/>
					</Form.Group>

					<Form.Group className="filter">
						<Form.Label>Job Type</Form.Label>
						{jobTypeList && (
							<Select
								options={jobTypeList.map((type) => ({
									value: type.id,
									label: type.key,
								}))}
								values={[]}
								name="select"
								multi
								onChange={(val) => {
									setValue(
										'selectedJobTypes',
										val.map((v) => ({
											id: v.value,
											key: v.label,
										}))
									)
									// handleSubmit(filterSubmitHandler)()
								}}
								clearable
							/>
						)}
					</Form.Group>

					<Form.Group className="filter">
						<Form.Label>Modality</Form.Label>
						{modalityList && (
							<Select
								options={modalityList.map((type) => ({
									value: type.id,
									label: type.key,
								}))}
								values={[]}
								name="select"
								multi
								onChange={(val) => {
									setValue(
										'selectedModality',
										val.map((v) => ({
											id: v.value,
											key: v.label,
										}))
									)
									// handleSubmit(filterSubmitHandler)()
								}}
								clearable
							/>
						)}
					</Form.Group>

					<Form.Group className="filter">
						<Form.Label>Location</Form.Label>
						{locationList && (
							<Select
								options={locationList.map((type) => ({
									value: type.id,
									label: type.location,
								}))}
								values={[]}
								name="select"
								multi
								onChange={(val) => {
									setValue(
										'selectedLocations',
										val.map((v) => ({
											id: v.value,
											location: v.label,
										}))
									)
									// handleSubmit(filterSubmitHandler)()
								}}
								clearable
							/>
						)}
					</Form.Group>

					<button className="filter-btn" type="submit">
						<FontAwesomeIcon
							icon={faFilter}
							className="px-2"
							style={{ color: '#35314e' }}
							fontSize={18}
						/>
					</button>

					{isCreateVisible && (
						<Button
							className="create-btn"
							onClick={() => navigate('/create-job')}
						>
							Create Job Post
						</Button>
					)}
				</Form>

				{getJobsListResponse && getJobsListResponse.length > 0 ? (
					<div className="content">
						<div className="latest-list">
							{getJobsListResponse &&
								getJobsListResponse.map((job) => {
									return (
										<JobsItem
											item={job}
											setSelectedJob={jobItemSelectHandler}
											key={job.id}
										/>
									)
								})}
						</div>

						{selectedJob && <JobsDetailItem jobDetails={selectedJob} />}
					</div>
				) : (
					<div className="no-data">No Data Found</div>
				)}
			</div>

			{/* Loader overlay */}
			<Modal show={isLoading} backdrop="static" keyboard={false} centered>
				<Modal.Body className="text-center">
					<Spinner animation="border" role="status" />
					{/* <p>{loaderMsg}</p> */}
				</Modal.Body>
			</Modal>
		</>
	)
}

export default Jobs
