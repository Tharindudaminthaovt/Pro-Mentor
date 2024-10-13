/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from 'yup'
import PageHeader from '../../../../components/shared/page-header/page-header'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import {
	GetLocationListResponse,
	useGetLocationList,
} from '../../../../hooks/web/jobs/useGetLocationList'
import {
	GetModalityListResponse,
	useGetModalityList,
} from '../../../../hooks/web/jobs/useGetModalityList'
import {
	GetJobTypeListResponse,
	useGetJobTypeList,
} from '../../../../hooks/web/jobs/useGetJobTypeList'
import { errorDisplayHandler } from '../../../../utils/errorDisplayHandler'
import Select from 'react-dropdown-select'
import { useCreateLocation } from '../../../../hooks/web/jobs/useCreateLocation'
import { useCreateModality } from '../../../../hooks/web/jobs/useCreateModality'
import { useCreateJobType } from '../../../../hooks/web/jobs/useCreateJobType'
import {
	GetTagsListResponse,
	useGetTagsList,
} from '../../../../hooks/web/jobs/useGetTagsList'
import { useCreateJob } from '../../../../hooks/web/jobs/useCreateJob'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import './create-job.scss'
import { useCreateTag } from '../../../../hooks/web/jobs/useCreateTag'

const schema = yup.object().shape({
	title: yup.string().required('Title is required'),
	description: yup.string().required('Description is required'),
	companyName: yup.string().required('Company name is required'),
})

export interface FormData {
	title: string
	description: string
	companyName: string
	selectedType?: GetJobTypeListResponse
	selectedLocation?: GetLocationListResponse
	selectedModality?: GetModalityListResponse
	selectedTagsList?: GetTagsListResponse[]
}

function CreateJob() {
	const navigate = useNavigate()
	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	})
	const [isLoading, setIsLoading] = useState(false)
	const [locationList, setLocationList] = useState<GetLocationListResponse[]>(
		[]
	)
	const [modalityList, setModalityList] = useState<GetModalityListResponse[]>(
		[]
	)
	const [jobTypeList, setJobTypeList] = useState<GetJobTypeListResponse[]>([])
	const [allTagsList, setAllTagsList] = useState<GetTagsListResponse[]>([])
	const {
		isLoading_getLocations,
		isValidating_getLocations,
		getLocationsListResponse,
		mutate_getLocations,
		error_getLocations,
	} = useGetLocationList()
	const {
		isLoading_getModality,
		isValidating_getModality,
		error_getModality,
		mutate_getModality,
		getModalityListResponse,
	} = useGetModalityList()
	const {
		isLoading_getJobType,
		isValidating_getJobType,
		getJobTypeListResponse,
		mutate_getJobType,
		error_getJobType,
	} = useGetJobTypeList()
	const {
		createLocationResponse,
		setIsRequestReady_createLocation,
		setCreateLocationRequest,
	} = useCreateLocation()
	const {
		createModalityResponse,
		setIsRequestReady_createModality,
		setCreateModalityRequest,
	} = useCreateModality()
	const {
		createJobTypeResponse,
		setIsRequestReady_createJobType,
		setCreateJobTypeRequest,
	} = useCreateJobType()
	const {
		createTagResponse,
		setIsRequestReady_createTag,
		setCreateTagRequest,
	} = useCreateTag()
	const {
		getTagsListResponse,
		isLoading_getTags,
		isValidating_getTags,
		error_getTags,
		mutate_getTags,
	} = useGetTagsList()
	const {
		createJobResponse,
		setIsRequestReady_createJob,
		setCreateJobRequest,
		isLoading_createJob,
		isValidating_createJob,
		error_createJob,
		mutate_createJob,
	} = useCreateJob()

	useEffect(() => {
		mutate_getJobType()
		mutate_getLocations()
		mutate_getModality()
		mutate_getTags()
	}, [])

	useEffect(() => {
		if (createLocationResponse) {
			setValue('selectedLocation', createLocationResponse)
			mutate_getLocations()
		}
	}, [createLocationResponse])

	useEffect(() => {
		if (createModalityResponse) {
			setValue('selectedModality', createModalityResponse)
			mutate_getModality()
		}
	}, [createModalityResponse])

	useEffect(() => {
		if (createTagResponse) {
			mutate_getTags()
		}
	}, [createTagResponse])

	useEffect(() => {
		if (createJobTypeResponse) {
			setValue('selectedType', createJobTypeResponse)
		}
	}, [createJobTypeResponse])

	useEffect(() => {
		if (getJobTypeListResponse) {
			setJobTypeList(getJobTypeListResponse)
		}
	}, [getJobTypeListResponse])

	useEffect(() => {
		if (getModalityListResponse) {
			setModalityList(getModalityListResponse)
		}
	}, [getModalityListResponse])

	useEffect(() => {
		if (getLocationsListResponse) {
			setLocationList(getLocationsListResponse)
		}
	}, [getLocationsListResponse])

	useEffect(() => {
		if (getTagsListResponse) {
			setAllTagsList(getTagsListResponse)
		}
	}, [getTagsListResponse])

	useEffect(() => {
		if (createJobResponse) {
			toast.success('Job post created successfully!')
			navigate('/jobs')
		}
	}, [createJobResponse])

	// useEffect(() => {
	// 	console.log(locationList)
	// }, [locationList])

	useEffect(() => {
		errorDisplayHandler(error_getJobType)
		errorDisplayHandler(error_getLocations)
		errorDisplayHandler(error_getModality)
		errorDisplayHandler(error_getTags)
		errorDisplayHandler(error_createJob)
	}, [
		error_getJobType,
		error_getLocations,
		error_getModality,
		error_getTags,
		error_createJob,
	])

	useEffect(() => {
		if (
			isLoading_getJobType ||
			isLoading_getLocations ||
			isLoading_getModality ||
			isValidating_getJobType ||
			isValidating_getLocations ||
			isValidating_getModality ||
			isLoading_getTags ||
			isValidating_getTags ||
			isLoading_createJob ||
			isValidating_createJob
		) {
			setIsLoading(true)
		} else setIsLoading(false)
	}, [
		isLoading_getJobType,
		isLoading_getLocations,
		isLoading_getModality,
		isValidating_getJobType,
		isValidating_getLocations,
		isValidating_getModality,
		isLoading_getTags,
		isValidating_getTags,
		isLoading_createJob,
		isValidating_createJob,
	])

	const formDataConverter = (formData: FormData) => {
		console.log(formData)
		setCreateJobRequest({
			title: formData.title,
			description: formData.description,
			companyName: formData.companyName,
			typeId: formData.selectedType?.id || '',
			locationId: formData.selectedLocation?.id || '',
			modalityId: formData.selectedModality?.id || '',
			tags: formData.selectedTagsList || [],
		})
		setIsRequestReady_createJob(true)
		mutate_createJob()
	}

	return (
		<>
			<div className="page create-job-page">
				<PageHeader title="Create Job Post" />
				<Form className="cont" onSubmit={handleSubmit(formDataConverter)}>
					<Form.Group controlId="title">
						<Form.Label>Title</Form.Label>
						<Controller
							name="title"
							control={control}
							defaultValue=""
							render={({ field }) => <Form.Control {...field} />}
						/>
						<Form.Text className="text-danger">
							{errors.title?.message}
						</Form.Text>
					</Form.Group>

					<Form.Group controlId="description">
						<Form.Label>Description</Form.Label>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							render={({ field }) => <Form.Control {...field} as="textarea" />}
						/>
						{errors.description && (
							<Form.Text className="text-danger">
								{errors.description.message}
							</Form.Text>
						)}
					</Form.Group>

					<Form.Group controlId="companyName">
						<Form.Label>Company Name</Form.Label>
						<Controller
							name="companyName"
							control={control}
							defaultValue=""
							render={({ field }) => <Form.Control {...field} />}
						/>
						<Form.Text className="text-danger">
							{errors.companyName?.message}
						</Form.Text>
					</Form.Group>

					<div className="filters">
						<Form.Group className="filter">
							<Form.Label>Location</Form.Label>
							{locationList && (
								<Select
									options={locationList.map((location) => ({
										value: location.id,
										label: location.location,
									}))}
									values={[]}
									name="select"
									onChange={(val) => {
										setValue('selectedLocation', {
											id: val[0].value,
											location: val[0].label,
										})
									}}
									clearable
									required
									create
									onCreateNew={(value) => {
										// setValue('selectedLocation', value)
										setCreateLocationRequest({ location: value.label })
										setIsRequestReady_createLocation(true)
									}}
								/>
							)}
						</Form.Group>

						<Form.Group className="filter">
							<Form.Label>Modality</Form.Label>
							{modalityList && (
								<Select
									options={modalityList.map((mode) => ({
										value: mode.id,
										label: mode.key,
									}))}
									values={[]}
									name="select"
									onChange={(val) => {
										setValue('selectedModality', {
											id: val[0].value,
											key: val[0].label,
										})
									}}
									clearable
									required
									create
									onCreateNew={(value) => {
										// setValue('selectedModality', value)
										setCreateModalityRequest({ key: value.label })
										setIsRequestReady_createModality(true)
									}}
								/>
							)}
						</Form.Group>

						<Form.Group className="filter">
							<Form.Label>Job Type</Form.Label>
							{jobTypeList && (
								<Select
									options={jobTypeList.map((mode) => ({
										value: mode.id,
										label: mode.key,
									}))}
									values={[]}
									name="select"
									onChange={(val) => {
										setValue('selectedType', {
											id: val[0].value,
											key: val[0].label,
										})
									}}
									clearable
									required
									create
									onCreateNew={(value) => {
										// setValue('selectedJobType', value)
										setCreateJobTypeRequest({ key: value.label })
										setIsRequestReady_createJobType(true)
									}}
								/>
							)}
						</Form.Group>
					</div>
					<Form.Group className="tags-filter">
						<Form.Label>Tags</Form.Label>
						{allTagsList && (
							<Select
								options={allTagsList.map((mode) => ({
									value: mode.id,
									label: mode.key,
								}))}
								values={[]}
								multi
								name="select"
								onChange={(val) => {
									setValue(
										'selectedTagsList',
										val.map((v) => ({
											id: v.value,
											key: v.label,
										}))
									)
								}}
								clearable
								required
								create
								onCreateNew={(value) => {
									setCreateTagRequest({ key: value.label })
									setIsRequestReady_createTag(true)
								}}
							/>
						)}
					</Form.Group>

					<Button variant="primary" type="submit">
						Create Job Post
					</Button>
				</Form>
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

export default CreateJob
