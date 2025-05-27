import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, Spinner, Card } from 'react-bootstrap'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import Select from 'react-dropdown-select'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import { motion } from 'framer-motion'
import {
	FiUpload,
	FiX,
	FiCalendar,
	FiMapPin,
	FiTag,
	FiGlobe,
} from 'react-icons/fi'
import { errorDisplayHandler } from '../../../../utils/errorDisplayHandler'
import { useGetLocationList } from '../../../../hooks/web/jobs/useGetLocationList'
import { useGetModeList } from '../../../../hooks/web/web-events/useGetModeList'
import { useGetTagsList } from '../../../../hooks/web/jobs/useGetTagsList'
import { useCreateLocation } from '../../../../hooks/web/jobs/useCreateLocation'
import { useCreateMode } from '../../../../hooks/web/web-events/useCreateMode'
import { useCreateTag } from '../../../../hooks/web/jobs/useCreateTag'
import { useCreateEvent } from '../../../../hooks/web/web-events/useCreateEvent'
import { useUploadPost } from '../../../../hooks/web/posts/useUploadPost'
import PageHeader from '../../../../components/shared/page-header/page-header'

// Define types
interface FormData {
	title: string
	description: string
	companyName: string
	selectedLocation?: { id: string; location: string }
	selectedMode?: { id: string; key: string }
	selectedTagsList?: { id: string; key: string }[]
	time: Date
	image?: FileList
	imageUrl?: string
}

// Validation schema
const schema = yup.object().shape({
	title: yup.string().required('Title is required'),
	description: yup.string().required('Description is required'),
	companyName: yup.string().required('Company name is required'),
	time: yup.date().required('Event date and time is required'),
	image: yup
		.mixed()
		.test('required', 'Image is required', (value, context) => {
			return (
				context.parent.imageUrl ||
				(value instanceof FileList && value.length > 0)
			)
		})
		.test('fileSize', 'File too large (max 5MB)', (value) => {
			if (!(value instanceof FileList)) return true
			return value[0]?.size <= 5 * 1024 * 1024 // 5MB
		})
		.test('fileType', 'Unsupported file type (JPEG, PNG only)', (value) => {
			if (!(value instanceof FileList)) return true
			return ['image/jpeg', 'image/png', 'image/webp'].includes(value[0]?.type)
		}),
	imageUrl: yup.string().optional(),
})

const CreateEvent = () => {
	const navigate = useNavigate()
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		watch,
		trigger,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	})

	const [isLoading, setIsLoading] = useState(false)
	const [selectedImage, setSelectedImage] = useState<string | null>(null)
	const [selectedDate, setSelectedDate] = useState<Date>()
	const [isDragging, setIsDragging] = useState(false)
	const [isUploadingImage, setIsUploadingImage] = useState(false)

	// API hooks
	const { mutate_getLocations, getLocationsListResponse } = useGetLocationList()
	const { mutate_getTags, getTagsListResponse } = useGetTagsList()
	const { mutate_getMode, getModeListResponse } = useGetModeList()
	const {
		setIsRequestReady_createMode,
		setCreateModeRequest,
		createModeResponse,
	} = useCreateMode()
	const {
		setIsRequestReady_createTag,
		setCreateTagRequest,
		createTagResponse,
	} = useCreateTag()
	const {
		setIsRequestReady_createLocation,
		setCreateLocationRequest,
		createLocationResponse,
	} = useCreateLocation()
	const {
		setIsRequestReady_createEvent,
		setCreateEventRequest,
		createEventResponse,
		isLoading_createEvent,
	} = useCreateEvent()
	const {
		setUploadPostRequest,
		setIsRequestReady_uploadPost,
		uploadPostResponse,
		error_uploadPost,
	} = useUploadPost()

	// Initialize data
	useEffect(() => {
		mutate_getLocations()
		mutate_getTags()
		mutate_getMode()
	}, [])

	// Handle responses
	useEffect(() => {
		if (createModeResponse) {
			setValue('selectedMode', {
				id: createModeResponse.id,
				key: createModeResponse.key,
			})
			mutate_getMode()
		}
	}, [createModeResponse])

	useEffect(() => {
		if (createTagResponse) {
			mutate_getTags()
		}
	}, [createTagResponse])

	useEffect(() => {
		if (createLocationResponse) {
			setValue('selectedLocation', {
				id: createLocationResponse.id,
				location: createLocationResponse.location,
			})
			mutate_getLocations()
		}
	}, [createLocationResponse])

	useEffect(() => {
		if (uploadPostResponse) {
			const imageUrl = import.meta.env.VITE_CDN_URL + uploadPostResponse.path
			setSelectedImage(imageUrl)
			setValue('imageUrl', imageUrl, { shouldValidate: true })
			setIsUploadingImage(false)
			toast.success('Event banner uploaded!')
		}
		if (error_uploadPost) {
			setIsUploadingImage(false)
			errorDisplayHandler(error_uploadPost)
		}
	}, [uploadPostResponse, error_uploadPost])

	useEffect(() => {
		if (createEventResponse) {
			toast.success('Event created successfully!')
			navigate('/events')
		}
	}, [createEventResponse])

	// Loading state
	useEffect(() => {
		setIsLoading(isLoading_createEvent || isUploadingImage)
	}, [isLoading_createEvent, isUploadingImage])

	const onSubmit = (data: FormData) => {
		if (!data.imageUrl && !(data.image instanceof FileList)) {
			toast.error('Please upload an image first')
			return
		}

		setCreateEventRequest({
			title: data.title,
			description: data.description,
			companyName: data.companyName,
			locationId: data.selectedLocation?.id || '',
			tags: data.selectedTagsList || [],
			modeId: data.selectedMode?.id || '',
			time: data.time.toISOString(),
			url: data.imageUrl || '',
		})
		setIsRequestReady_createEvent(true)
	}

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files && files.length > 0) {
			setIsUploadingImage(true)
			setValue('image', files, { shouldValidate: true })

			const formData = new FormData()
			formData.append('image', files[0])
			setUploadPostRequest(formData)
			setIsRequestReady_uploadPost(true)
		}
	}

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = () => {
		setIsDragging(false)
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)
		const files = e.dataTransfer.files
		if (files && files.length > 0) {
			const input = document.getElementById('image-upload') as HTMLInputElement
			if (input) {
				input.files = files
				const event = new Event('change', { bubbles: true })
				input.dispatchEvent(event)
			}
		}
	}

	const removeImage = () => {
		setSelectedImage(null)
		setValue('imageUrl', '', { shouldValidate: true })
		setValue('image', undefined, { shouldValidate: true })
		const input = document.getElementById('image-upload') as HTMLInputElement
		if (input) input.value = ''
	}

	return (
		<div
			style={{
				backgroundColor: '#F8FAFC',
				minHeight: '100vh',
				padding: '24px',
			}}
		>
			<div style={{ maxWidth: '800px', margin: '0 auto' }}>
				<PageHeader
					title="Create New Event"
					subtitle="Organize and share your event with the community"
				/>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
				>
					<Card
						style={{
							border: '1px solid #F1F5F9',
							borderRadius: '16px',
							boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
						}}
					>
						<Card.Body style={{ padding: '32px' }}>
							<Form onSubmit={handleSubmit(onSubmit)}>
								{/* Event Details Section */}
								<div style={{ marginBottom: '32px' }}>
									<h3
										style={{
											color: '#1E293B',
											fontWeight: '600',
											fontSize: '18px',
											marginBottom: '24px',
											borderBottom: '1px solid #F1F5F9',
											paddingBottom: '12px',
										}}
									>
										Event Details
									</h3>

									<Form.Group style={{ marginBottom: '24px' }}>
										<Form.Label
											style={{
												display: 'block',
												marginBottom: '8px',
												fontWeight: '600',
												color: '#1E293B',
											}}
										>
											Event Title
										</Form.Label>
										<Form.Control
											{...register('title')}
											style={{
												border: '1px solid #E2E8F0',
												borderRadius: '8px',
												padding: '12px 16px',
											}}
											placeholder="Enter event title"
										/>
										{errors.title && (
											<p
												style={{
													color: '#DC2626',
													fontSize: '14px',
													marginTop: '8px',
												}}
											>
												{errors.title.message}
											</p>
										)}
									</Form.Group>

									<Form.Group style={{ marginBottom: '24px' }}>
										<Form.Label
											style={{
												display: 'block',
												marginBottom: '8px',
												fontWeight: '600',
												color: '#1E293B',
											}}
										>
											Company Name
										</Form.Label>
										<Form.Control
											{...register('companyName')}
											style={{
												border: '1px solid #E2E8F0',
												borderRadius: '8px',
												padding: '12px 16px',
											}}
											placeholder="Enter company name"
										/>
										{errors.companyName && (
											<p
												style={{
													color: '#DC2626',
													fontSize: '14px',
													marginTop: '8px',
												}}
											>
												{errors.companyName.message}
											</p>
										)}
									</Form.Group>

									<Form.Group style={{ marginBottom: '24px' }}>
										<Form.Label
											style={{
												display: 'block',
												marginBottom: '8px',
												fontWeight: '600',
												color: '#1E293B',
											}}
										>
											Description
										</Form.Label>
										<Form.Control
											as="textarea"
											rows={4}
											{...register('description')}
											style={{
												border: '1px solid #E2E8F0',
												borderRadius: '8px',
												padding: '12px 16px',
												resize: 'none',
											}}
											placeholder="Describe your event..."
										/>
										{errors.description && (
											<p
												style={{
													color: '#DC2626',
													fontSize: '14px',
													marginTop: '8px',
												}}
											>
												{errors.description.message}
											</p>
										)}
									</Form.Group>
								</div>

								{/* Image Upload Section */}
								<div style={{ marginBottom: '32px' }}>
									<h3
										style={{
											color: '#1E293B',
											fontWeight: '600',
											fontSize: '18px',
											marginBottom: '24px',
											borderBottom: '1px solid #F1F5F9',
											paddingBottom: '12px',
										}}
									>
										Event Banner
									</h3>

									{selectedImage ? (
										<div
											style={{
												position: 'relative',
												borderRadius: '12px',
												overflow: 'hidden',
												marginBottom: '16px',
											}}
										>
											<img
												src={selectedImage}
												alt="Preview"
												style={{
													width: '100%',
													maxHeight: '400px',
													objectFit: 'cover',
													borderRadius: '12px',
													border: '1px solid #E2E8F0',
												}}
											/>
											<button
												onClick={removeImage}
												style={{
													position: 'absolute',
													top: '12px',
													right: '12px',
													backgroundColor: 'rgba(15, 23, 42, 0.7)',
													color: 'white',
													border: 'none',
													borderRadius: '50%',
													width: '32px',
													height: '32px',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													cursor: 'pointer',
												}}
											>
												<FiX size={18} />
											</button>
										</div>
									) : (
										<div
											onDragOver={handleDragOver}
											onDragLeave={handleDragLeave}
											onDrop={handleDrop}
											style={{
												border: `2px dashed ${
													isDragging ? '#8B5CF6' : '#E2E8F0'
												}`,
												borderRadius: '12px',
												padding: '32px',
												textAlign: 'center',
												backgroundColor: isDragging ? '#F5F3FF' : '#F8FAFC',
												cursor: 'pointer',
												transition: 'all 0.2s',
											}}
											onClick={() =>
												document.getElementById('image-upload')?.click()
											}
										>
											<FiUpload
												size={32}
												color={isDragging ? '#8B5CF6' : '#94A3B8'}
												style={{ marginBottom: '12px' }}
											/>
											<p
												style={{
													color: isDragging ? '#8B5CF6' : '#64748B',
													marginBottom: '8px',
													fontWeight: isDragging ? '600' : '500',
												}}
											>
												{isDragging
													? 'Drop your image here'
													: 'Drag & drop your image here or click to browse'}
											</p>
											<small style={{ color: '#94A3B8' }}>
												JPEG, PNG (Max 5MB)
											</small>
										</div>
									)}
									<Form.Control
										id="image-upload"
										type="file"
										accept="image/jpeg,image/png,image/webp"
										onChange={handleImageChange}
										style={{ display: 'none' }}
									/>
									{errors.image && (
										<p
											style={{
												color: '#DC2626',
												fontSize: '14px',
												marginTop: '8px',
											}}
										>
											{errors.image.message}
										</p>
									)}
									{isUploadingImage && (
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '8px',
												marginTop: '8px',
											}}
										>
											<Spinner animation="border" size="sm" />
											<span style={{ color: '#64748B' }}>
												Uploading image...
											</span>
										</div>
									)}
								</div>

								{/* Event Settings Section */}
								<div style={{ marginBottom: '32px' }}>
									<h3
										style={{
											color: '#1E293B',
											fontWeight: '600',
											fontSize: '18px',
											marginBottom: '24px',
											borderBottom: '1px solid #F1F5F9',
											paddingBottom: '12px',
										}}
									>
										Event Settings
									</h3>

									<div
										style={{
											display: 'grid',
											gridTemplateColumns: '1fr 1fr',
											gap: '16px',
											marginBottom: '24px',
										}}
									>
										<Form.Group>
											<Form.Label
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '8px',
													marginBottom: '8px',
													fontWeight: '600',
													color: '#1E293B',
												}}
											>
												<FiCalendar /> Date & Time
											</Form.Label>
											<DatePicker
												selected={selectedDate}
												onChange={(date: Date) => {
													date && setSelectedDate(date)
													date &&
														setValue('time', date, { shouldValidate: true })
												}}
												showTimeSelect
												required
												dateFormat="MMMM d, yyyy h:mm aa"
												customInput={
													<Form.Control
														style={{
															border: '1px solid #E2E8F0',
															borderRadius: '8px',
															padding: '12px 16px',
															cursor: 'pointer',
														}}
													/>
												}
											/>
											{errors.time && (
												<p
													style={{
														color: '#DC2626',
														fontSize: '14px',
														marginTop: '8px',
													}}
												>
													{errors.time.message}
												</p>
											)}
										</Form.Group>

										<Form.Group>
											<Form.Label
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '8px',
													marginBottom: '8px',
													fontWeight: '600',
													color: '#1E293B',
												}}
											>
												<FiGlobe /> Mode
											</Form.Label>
											{getModeListResponse && (
												<Select
													options={getModeListResponse.map((mode) => ({
														value: mode.id,
														label: mode.key,
													}))}
													values={[]}
													onChange={(val) => {
														setValue(
															'selectedMode',
															{
																id: val[0].value,
																key: val[0].label,
															},
															{ shouldValidate: true }
														)
													}}
													clearable
													required
													create
													onCreateNew={(value) => {
														setCreateModeRequest({ key: value.label })
														setIsRequestReady_createMode(true)
													}}
													style={{
														border: '1px solid #E2E8F0',
														borderRadius: '8px',
													}}
												/>
											)}
										</Form.Group>
									</div>

									<div
										style={{
											display: 'grid',
											gridTemplateColumns: '1fr 1fr',
											gap: '16px',
										}}
									>
										<Form.Group>
											<Form.Label
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '8px',
													marginBottom: '8px',
													fontWeight: '600',
													color: '#1E293B',
												}}
											>
												<FiMapPin /> Location
											</Form.Label>
											{getLocationsListResponse && (
												<Select
													options={getLocationsListResponse.map((location) => ({
														value: location.id,
														label: location.location,
													}))}
													values={[]}
													onChange={(val) => {
														setValue(
															'selectedLocation',
															{
																id: val[0].value,
																location: val[0].label,
															},
															{ shouldValidate: true }
														)
													}}
													clearable
													create
													onCreateNew={(value) => {
														setCreateLocationRequest({ location: value.label })
														setIsRequestReady_createLocation(true)
													}}
													style={{
														border: '1px solid #E2E8F0',
														borderRadius: '8px',
													}}
												/>
											)}
										</Form.Group>

										<Form.Group>
											<Form.Label
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '8px',
													marginBottom: '8px',
													fontWeight: '600',
													color: '#1E293B',
												}}
											>
												<FiTag /> Tags
											</Form.Label>
											{getTagsListResponse && (
												<Select
													options={getTagsListResponse.map((tag) => ({
														value: tag.id,
														label: tag.key,
													}))}
													values={[]}
													multi
													onChange={(val) => {
														setValue(
															'selectedTagsList',
															val.map((v) => ({
																id: v.value,
																key: v.label,
															})),
															{ shouldValidate: true }
														)
													}}
													clearable
													required
													create
													onCreateNew={(value) => {
														setCreateTagRequest({ key: value.label })
														setIsRequestReady_createTag(true)
													}}
													style={{
														border: '1px solid #E2E8F0',
														borderRadius: '8px',
													}}
												/>
											)}
										</Form.Group>
									</div>
								</div>

								<div style={{ textAlign: 'right' }}>
									<Button
										type="submit"
										disabled={isLoading}
										style={{
											background:
												'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
											border: 'none',
											borderRadius: '12px',
											padding: '12px 32px',
											fontWeight: '600',
											fontSize: '16px',
											color: '#FFFFFF',
											boxShadow: '0 2px 4px rgba(139, 92, 246, 0.2)',
											opacity: isLoading ? 0.7 : 1,
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
													className="me-2"
												/>
												{isUploadingImage
													? 'Uploading Image...'
													: 'Creating Event...'}
											</>
										) : (
											'Create Event'
										)}
									</Button>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</motion.div>
			</div>
		</div>
	)
}

export default CreateEvent
