import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, Form, Spinner, Card } from 'react-bootstrap'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import Select from 'react-dropdown-select'
import PageHeader from '../../../../components/shared/page-header/page-header'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { FiBriefcase, FiMapPin, FiClock, FiTag } from 'react-icons/fi'
import { useGetLocationList } from '../../../../hooks/web/jobs/useGetLocationList'
import { useCreateLocation } from '../../../../hooks/web/jobs/useCreateLocation'
import { useCreateJob } from '../../../../hooks/web/jobs/useCreateJob'
import { useGetModalityList } from '../../../../hooks/web/jobs/useGetModalityList'
import { useGetJobTypeList } from '../../../../hooks/web/jobs/useGetJobTypeList'
import { useCreateModality } from '../../../../hooks/web/jobs/useCreateModality'
import { useCreateJobType } from '../../../../hooks/web/jobs/useCreateJobType'
import { useGetTagsList } from '../../../../hooks/web/jobs/useGetTagsList'
import { useCreateTag } from '../../../../hooks/web/jobs/useCreateTag'

const schema = yup.object().shape({
	title: yup.string().required('Title is required'),
	description: yup.string().required('Description is required'),
	companyName: yup.string().required('Company name is required'),
})

const CreateJob = () => {
	const navigate = useNavigate()
	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
	})

	const [isLoading, setIsLoading] = useState(false)

	// Original hooks and state management preserved
	const { mutate_getJobType, getJobTypeListResponse } = useGetJobTypeList()
	const { mutate_getLocations, getLocationsListResponse } = useGetLocationList()
	const { mutate_getModality, getModalityListResponse } = useGetModalityList()
	const { mutate_getTags, getTagsListResponse } = useGetTagsList()

	const {
		setIsRequestReady_createLocation,
		setCreateLocationRequest,
		createLocationResponse,
	} = useCreateLocation()
	const {
		setIsRequestReady_createModality,
		setCreateModalityRequest,
		createModalityResponse,
	} = useCreateModality()
	const {
		setIsRequestReady_createJobType,
		setCreateJobTypeRequest,
		createJobTypeResponse,
	} = useCreateJobType()
	const {
		setIsRequestReady_createTag,
		setCreateTagRequest,
		createTagResponse,
	} = useCreateTag()
	const {
		setIsRequestReady_createJob,
		setCreateJobRequest,
		createJobResponse,
	} = useCreateJob()

	useEffect(() => {
		mutate_getJobType()
		mutate_getLocations()
		mutate_getModality()
		mutate_getTags()
	}, [])

	// Original response handling preserved
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
		if (createJobResponse) {
			toast.success('Job post created successfully!')
			navigate('/jobs')
		}
	}, [createJobResponse])

	const onSubmit = (formData: any) => {
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
	}

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
					maxWidth: '800px',
					margin: '0 auto',
				}}
			>
				<PageHeader
					title="Create Job Post"
					subtitle="Post a new job opportunity for the community"
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
							overflow: 'hidden',
						}}
					>
						<Card.Body style={{ padding: '32px' }}>
							<Form onSubmit={handleSubmit(onSubmit)}>
								{/* Basic Information Section */}
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
										Job Details
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
											Job Title
										</Form.Label>
										<Controller
											name="title"
											control={control}
											render={({ field }) => (
												<Form.Control
													{...field}
													style={{
														border: '1px solid #E2E8F0',
														borderRadius: '8px',
														padding: '12px 16px',
													}}
													placeholder="Enter job title"
												/>
											)}
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
										<Controller
											name="companyName"
											control={control}
											render={({ field }) => (
												<Form.Control
													{...field}
													style={{
														border: '1px solid #E2E8F0',
														borderRadius: '8px',
														padding: '12px 16px',
													}}
													placeholder="Enter company name"
												/>
											)}
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
										<Controller
											name="description"
											control={control}
											render={({ field }) => (
												<Form.Control
													{...field}
													as="textarea"
													rows={5}
													style={{
														border: '1px solid #E2E8F0',
														borderRadius: '8px',
														padding: '12px 16px',
														resize: 'none',
													}}
													placeholder="Describe the job responsibilities and requirements..."
												/>
											)}
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

								{/* Job Settings Section */}
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
										Job Settings
									</h3>

									<div
										style={{
											display: 'grid',
											gridTemplateColumns: '1fr 1fr 1fr',
											gap: '16px',
											marginBottom: '24px',
										}}
									>
										{/* Location Selector - Original logic preserved */}
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
														setValue('selectedLocation', {
															id: val[0].value,
															location: val[0].label,
														})
													}}
													clearable
													required
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

										{/* Modality Selector - Original logic preserved */}
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
												<FiClock /> Modality
											</Form.Label>
											{getModalityListResponse && (
												<Select
													options={getModalityListResponse.map((mode) => ({
														value: mode.id,
														label: mode.key,
													}))}
													values={[]}
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
														setCreateModalityRequest({ key: value.label })
														setIsRequestReady_createModality(true)
													}}
													style={{
														border: '1px solid #E2E8F0',
														borderRadius: '8px',
													}}
												/>
											)}
										</Form.Group>

										{/* Job Type Selector - Original logic preserved */}
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
												<FiBriefcase /> Job Type
											</Form.Label>
											{getJobTypeListResponse && (
												<Select
													options={getJobTypeListResponse.map((mode) => ({
														value: mode.id,
														label: mode.key,
													}))}
													values={[]}
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
														setCreateJobTypeRequest({ key: value.label })
														setIsRequestReady_createJobType(true)
													}}
													style={{
														border: '1px solid #E2E8F0',
														borderRadius: '8px',
													}}
												/>
											)}
										</Form.Group>
									</div>

									{/* Tags Selector - Original logic preserved */}
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
												style={{
													border: '1px solid #E2E8F0',
													borderRadius: '8px',
												}}
											/>
										)}
									</Form.Group>
								</div>

								{/* Submit Button */}
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
												Creating Job...
											</>
										) : (
											'Create Job Post'
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

export default CreateJob
