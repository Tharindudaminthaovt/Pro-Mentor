/* eslint-disable react-hooks/exhaustive-deps */
import './create-event.scss'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { FieldErrors, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import {
	GetLocationListResponse,
	useGetLocationList,
} from '../../../../hooks/web/jobs/useGetLocationList'
import {
	GetTagsListResponse,
	useGetTagsList,
} from '../../../../hooks/web/jobs/useGetTagsList'
import {
	GetModeListResponse,
	useGetModeList,
} from '../../../../hooks/web/web-events/useGetModeList'
import Select from 'react-dropdown-select'
import PageHeader from '../../../../components/shared/page-header/page-header'
import { useNavigate } from 'react-router-dom'
import { useCreateLocation } from '../../../../hooks/web/jobs/useCreateLocation'
import { useCreateEvent } from '../../../../hooks/web/web-events/useCreateEvent'
import { useCreateTag } from '../../../../hooks/web/jobs/useCreateTag'
import { toast } from 'react-toastify'
import { useCreateMode } from '../../../../hooks/web/web-events/useCreateMode'
import { useUploadPost } from '../../../../hooks/web/posts/useUploadPost'
import DatePicker from 'react-datepicker'
import { errorDisplayHandler } from '../../../../utils/errorDisplayHandler'

const schema = yup.object().shape({
	title: yup.string().required('Title is required'),
	description: yup.string().required('Description is required'),
	companyName: yup.string().required('Company name is required'),
	time: yup.date().required('Event date and time is required'),
	image: yup.mixed().test('required', 'Image is required', (value) => {
		// Ensure value is a FileList and has at least one file
		return value instanceof FileList && value.length > 0
	}),
})

export interface FormData {
	title: string
	description: string
	companyName: string
	selectedLocation?: GetLocationListResponse
	selectedMode?: GetModeListResponse
	selectedTagsList?: GetTagsListResponse[]
	time: Date
	image: FileList
}
interface FormWithoutImage {
	title: string
	description: string
	companyName: string
	selectedLocation?: GetLocationListResponse
	selectedMode?: GetModeListResponse
	selectedTagsList?: GetTagsListResponse[]
	time: Date
}

interface FormErrors extends FieldErrors<FormData> {
	image?: {
		type: string
		message: string
	}
}
function CreateEvent() {
	const navigate = useNavigate()
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm<FormData | FormWithoutImage, FormErrors>({
		resolver: yupResolver(schema),
	})
	const [isLoading, setIsLoading] = useState(false)
	const [locationList, setLocationList] = useState<GetLocationListResponse[]>(
		[]
	)
	const [modeList, setModeList] = useState<GetModeListResponse[]>([])
	const [allTagsList, setAllTagsList] = useState<GetTagsListResponse[]>([])
	const [selectedImage, setSelectedImage] = useState<string | null>(null)
	const [selectedDate, setSelectedDate] = useState<Date>()

	// Manually check if the 'image' field has an error
	const hasImageError = 'image' in errors

	const {
		isLoading_getLocations,
		isValidating_getLocations,
		getLocationsListResponse,
		mutate_getLocations,
		error_getLocations,
	} = useGetLocationList()
	const {
		createLocationResponse,
		setIsRequestReady_createLocation,
		setCreateLocationRequest,
	} = useCreateLocation()
	const {
		createTagResponse,
		setIsRequestReady_createTag,
		setCreateTagRequest,
	} = useCreateTag()
	const {
		createModeResponse,
		setIsRequestReady_createMode,
		setCreateModeRequest,
	} = useCreateMode()
	const {
		getTagsListResponse,
		isLoading_getTags,
		isValidating_getTags,
		error_getTags,
		mutate_getTags,
	} = useGetTagsList()
	const {
		getModeListResponse,
		isLoading_getMode,
		isValidating_getMode,
		error_getMode,
		mutate_getMode,
	} = useGetModeList()
	const {
		createEventResponse,
		setIsRequestReady_createEvent,
		setCreateEventRequest,
		isLoading_createEvent,
		isValidating_createEvent,
		error_createEvent,
		mutate_createEvent,
	} = useCreateEvent()
	const {
		setUploadPostRequest,
		setIsRequestReady_uploadPost,
		uploadPostResponse,
		isLoading_uploadPost,
		isValidating_uploadPost,
		error_uploadPost,
	} = useUploadPost()

	useEffect(() => {
		mutate_getLocations()
		mutate_getTags()
		mutate_getMode()
	}, [])

	useEffect(() => {
		if (createLocationResponse) {
			setValue('selectedLocation', createLocationResponse)
			mutate_getLocations()
		}
	}, [createLocationResponse])

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
		if (getModeListResponse) {
			setModeList(getModeListResponse)
		}
	}, [getModeListResponse])

	useEffect(() => {
		if (createModeResponse) {
			setValue('selectedMode', createModeResponse)
			mutate_getMode()
		}
	}, [createModeResponse])

	useEffect(() => {
		if (createLocationResponse) {
			setValue('selectedLocation', createLocationResponse)
			mutate_getLocations()
		}
	}, [createLocationResponse])

	useEffect(() => {
		if (createTagResponse) {
			mutate_getTags()
		}
	}, [createTagResponse])

	useEffect(() => {
		if (createEventResponse) {
			toast.success('Event created successfully!')
			navigate('/events')
		}
	}, [createEventResponse])

	useEffect(() => {
		if (uploadPostResponse) {
			setSelectedImage(import.meta.env.VITE_CDN_URL + uploadPostResponse.path)
			toast.success('Event banner uploaded!')
		}
	}, [uploadPostResponse])

	useEffect(() => {
		if (
			isLoading_createEvent ||
			isLoading_getLocations ||
			isLoading_getMode ||
			isLoading_getTags ||
			isLoading_uploadPost ||
			isValidating_createEvent ||
			isValidating_getLocations ||
			isValidating_getMode ||
			isValidating_getTags ||
			isValidating_uploadPost
		)
			setIsLoading(true)
		else setIsLoading(false)
	}, [
		isLoading_createEvent,
		isLoading_getLocations,
		isLoading_getMode,
		isLoading_getTags,
		isLoading_uploadPost,
		isValidating_createEvent,
		isValidating_getLocations,
		isValidating_getMode,
		isValidating_getTags,
		isValidating_uploadPost,
	])

	useEffect(() => {
		errorDisplayHandler(error_createEvent)
		errorDisplayHandler(error_getLocations)
		errorDisplayHandler(error_getMode)
		errorDisplayHandler(error_getTags)
		errorDisplayHandler(error_uploadPost)
	}, [
		error_createEvent,
		error_getLocations,
		error_getMode,
		error_getTags,
		error_uploadPost,
	])

	const formDataConverter = (formData: FormData | FormWithoutImage) => {
		console.log(formData)
		setCreateEventRequest({
			title: formData.title,
			description: formData.description,
			companyName: formData.companyName,
			locationId: formData.selectedLocation?.id || '',
			tags: formData.selectedTagsList || [],
			modeId: formData.selectedMode?.id || '',
			time: formData.time.toISOString(),
			url: selectedImage || '',
		})
		setIsRequestReady_createEvent(true)
		mutate_createEvent()
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files && files.length > 0) {
			const formData = new FormData()
			formData.append('image', files[0])
			setUploadPostRequest(formData)
			setIsRequestReady_uploadPost(true)
		}
	}

	return (
		<>
			<div className="page create-event-page">
				<PageHeader title="Create Event" />
				<Form className="form cont" onSubmit={handleSubmit(formDataConverter)}>
					<Form.Group controlId="title">
						<Form.Label>Title</Form.Label>
						<Form.Control {...register('title')} />
						<Form.Text className="text-danger">
							{errors.title?.message}
						</Form.Text>
					</Form.Group>

					{selectedImage !== null && (
						<img
							src={selectedImage}
							alt="uploaded-image"
							className="uploaded-image"
						/>
					)}

					<Form.Group controlId="image">
						<Form.Label>Image</Form.Label>
						<Form.Control
							type="file"
							{...register('image')}
							onChange={handleImageChange}
						/>
						{hasImageError && (
							<Form.Text className="text-danger">
								{errors?.image?.message}
							</Form.Text>
						)}
					</Form.Group>

					<Form.Group controlId="description">
						<Form.Label>Description</Form.Label>
						<Form.Control as="textarea" {...register('description')} />
						{errors.description && (
							<Form.Text className="text-danger">
								{errors.description.message}
							</Form.Text>
						)}
					</Form.Group>

					<Form.Group controlId="companyName">
						<Form.Label>Company Name</Form.Label>
						<Form.Control {...register('companyName')} />
						<Form.Text className="text-danger">
							{errors.companyName?.message}
						</Form.Text>
					</Form.Group>

					<div className="one-row">
						<Form.Group className="date-time">
							<Form.Label>Date & Time</Form.Label>
							<DatePicker
								selected={selectedDate}
								onChange={(date: Date) => {
									console.log(date)
									date && setSelectedDate(date)
									date && setValue('time', date)
								}}
								showTimeSelect
								required
								dateFormat="MMMM d, yyyy h:mm aa"
							/>
						</Form.Group>

						<Form.Group className="filter">
							<Form.Label>Mode</Form.Label>
							{modeList && (
								<Select
									options={modeList.map((mode) => ({
										value: mode.id,
										label: mode.key,
									}))}
									values={[]}
									name="select"
									onChange={(val) => {
										setValue('selectedMode', {
											id: val[0].value,
											key: val[0].label,
										})
									}}
									clearable
									required
									create
									onCreateNew={(value) => {
										setCreateModeRequest({ key: value.label })
										setIsRequestReady_createMode(true)
									}}
								/>
							)}
						</Form.Group>
					</div>

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
									create
									onCreateNew={(value) => {
										// setValue('selectedLocation', value)
										setCreateLocationRequest({ location: value.label })
										setIsRequestReady_createLocation(true)
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
						Create Event
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

export default CreateEvent
