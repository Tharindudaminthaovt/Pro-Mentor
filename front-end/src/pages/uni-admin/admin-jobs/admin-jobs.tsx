import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import PageHeader from '../../../components/shared/page-header/page-header'
import CustomTable from '../../../components/shared/custom-table/custom-table'
import { useEffect, useState } from 'react'
import { useCreateJob } from '../../../hooks/web/jobs/useCreateJob'
import { useGetJobList } from '../../../hooks/web/jobs/useGetJobList'
import { GetJobResponse, JobCreateRequest } from '@promentor-app/shared-lib'
import { toast } from 'react-toastify'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import { useForm } from 'react-hook-form'
import RemoveJob from '../../../components/uni-admin/admin-jobs/remove-job/remove-job'
import { FiSearch, FiPlus, FiTrash2 } from 'react-icons/fi'

type JobItem = {
	id: string
	title: string
	description: string
	location: string
	modality: string
	type: string
	createdBy: string
	companyName: string
}

const tableHeaders = [
	'',
	'Title',
	'Description',
	'Location',
	'Modality',
	'Type',
	'Created By',
	'Company',
]

const AdminJobs = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
	const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
	const [removeList, setRemoveList] = useState<{ id: string; name: string }[]>(
		[]
	)
	const [jobsTableList, setJobsTableList] = useState<JobItem[]>([])
	const [selectedJobList, setSelectedJobList] = useState<JobItem[]>([])
	const { register, handleSubmit } = useForm<{ search: string }>()

	// Custom hooks
	const {
		setCreateJobRequest,
		createJobResponse,
		isLoading_createJob,
		isValidating_createJob,
		error_createJob,
		setIsRequestReady_createJob,
	} = useCreateJob()

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

	// Styles
	const styles = {
		page: {
			padding: '24px',
			backgroundColor: '#f8f9fa',
			minHeight: 'calc(100vh - 56px)',
		},
		headerContainer: {
			background: 'white',
			borderRadius: '12px',
			padding: '24px',
			marginBottom: '24px',
			boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
		},
		headerActions: {
			display: 'flex',
			alignItems: 'center',
			gap: '16px',
			width: '100%',
		},
		searchForm: {
			flexGrow: 1,
		},
		searchInputContainer: {
			position: 'relative',
			display: 'flex',
			alignItems: 'center',
		},
		searchIcon: {
			position: 'absolute',
			left: '12px',
			color: '#6c757d',
		},
		searchInput: {
			paddingLeft: '40px',
			borderRadius: '8px',
			border: '1px solid #e9ecef',
			height: '40px',
			'&:focus': {
				borderColor: '#6366f1',
				boxShadow: '0 0 0 0.25rem rgba(99, 102, 241, 0.25)',
			},
		},
		actionButtons: {
			display: 'flex',
			gap: '12px',
		},
		actionButton: {
			display: 'flex',
			alignItems: 'center',
			gap: '8px',
			padding: '8px 16px',
			borderRadius: '8px',
			fontWeight: '500',
		},
		tableContainer: {
			background: 'white',
			borderRadius: '12px',
			padding: '24px',
			boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
		},
		loadingModal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		loadingContent: {
			background: 'rgba(255, 255, 255, 0.9)',
			border: 'none',
			padding: '32px',
			borderRadius: '12px',
			textAlign: 'center' as const,
		},
		loadingText: {
			marginTop: '16px',
			color: '#111827',
			fontWeight: '500',
		},
	}

	// Event handlers
	const searchHandler = (data: { search: string }) => {
		if (data.search) {
			setSearch_getJobs(data.search)
			mutate_getJobs()
		}
	}

	const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') handleSubmit(searchHandler)()
	}

	const addNewHandler = () => setIsAddNewModalOpen(true)
	const removeHandler = () => {
		setRemoveList(
			selectedJobList.map((job) => ({ id: job.id, name: job.title }))
		)
		setIsRemoveModalOpen(true)
	}

	const modalCloseHandler = () => {
		setIsAddNewModalOpen(false)
		setIsRemoveModalOpen(false)
	}

	const addNewConfirmHandler = (data: JobCreateRequest) => {
		setCreateJobRequest(data)
		setIsRequestReady_createJob(true)
	}

	const removeConfirmHandler = (list: { id: string; name: string }[]) => {
		console.log('Jobs to remove:', list)
		setIsRemoveModalOpen(false)
		setSelectedJobList([])
		setRemoveList([])
		mutate_getJobs()
	}

	const selectHandler = (item: JobItem) => {
		setSelectedJobList((prev) =>
			prev.some((job) => job.id === item.id)
				? prev.filter((job) => job.id !== item.id)
				: [...prev, item]
		)
	}

	const jobsTableDataSetter = (response: GetJobResponse[]) => {
		setJobsTableList(
			response.map((item) => ({
				id: item.id,
				title: item.title || '-',
				description: item.description || '-',
				location: item.location?.location || '-',
				modality: item.modality?.key || '-',
				type: item.type?.key || '-',
				createdBy: item.createdBy || '',
				companyName: item.companyName || '',
			}))
		)
	}

	// Effects
	useEffect(() => {
		mutate_getJobs()
	}, [])

	useEffect(() => {
		if (createJobResponse) {
			toast.success('Job created successfully.')
			mutate_getJobs()
			setIsAddNewModalOpen(false)
		}
	}, [createJobResponse])

	useEffect(() => {
		if (getJobsListResponse) {
			jobsTableDataSetter(getJobsListResponse)
		}
	}, [getJobsListResponse])

	useEffect(() => {
		errorDisplayHandler(error_createJob)
		errorDisplayHandler(error_getJobs)
	}, [error_createJob, error_getJobs])

	useEffect(() => {
		setIsLoading(
			isLoading_createJob ||
				isLoading_getJobs ||
				isValidating_createJob ||
				isValidating_getJobs
		)
	}, [
		isLoading_createJob,
		isLoading_getJobs,
		isValidating_createJob,
		isValidating_getJobs,
	])

	return (
		<div style={styles.page}>
			<div style={styles.headerContainer}>
				<PageHeader title="Jobs">
					<div style={styles.headerActions}>
						<Form
							onSubmit={handleSubmit(searchHandler)}
							style={styles.searchForm}
						>
							<div style={styles.searchInputContainer}>
								<FiSearch style={styles.searchIcon} />
								<Form.Control
									type="text"
									placeholder="Search jobs..."
									{...register('search')}
									onKeyDown={keyDownHandler}
									style={styles.searchInput}
								/>
							</div>
						</Form>
						<div style={styles.actionButtons}>
							<Button
								variant="primary"
								onClick={addNewHandler}
								style={styles.actionButton}
							>
								<FiPlus style={{ fontSize: '16px' }} />
								Add New
							</Button>
							<Button
								variant="outline-danger"
								onClick={removeHandler}
								disabled={!selectedJobList.length}
								style={styles.actionButton}
							>
								<FiTrash2 style={{ fontSize: '16px' }} />
								Remove
							</Button>
						</div>
					</div>
				</PageHeader>
			</div>

			<div style={styles.tableContainer}>
				<CustomTable<JobItem>
					tableHeaders={tableHeaders}
					tableData={jobsTableList}
					rowClickHandler={selectHandler}
					selectedDataRows={selectedJobList}
				/>
			</div>

			{/* TODO: Add New Job modal component */}
			{/* <AddNewJob
        isAddNewModalOpen={isAddNewModalOpen}
        modalCloseHandler={modalCloseHandler}
        addNewConfirmHandler={addNewConfirmHandler}
        isFormReset={!!createJobResponse}
      /> */}

			{/* Remove Job Confirmation Modal */}
			<RemoveJob
				isRemoveModalOpen={isRemoveModalOpen}
				modalCloseHandler={modalCloseHandler}
				removeConfirmHandler={removeConfirmHandler}
				removeList={removeList}
			/>

			{/* Loading Modal */}
			<Modal
				show={isLoading}
				backdrop="static"
				keyboard={false}
				centered
				style={styles.loadingModal}
			>
				<Modal.Body style={styles.loadingContent}>
					<Spinner animation="border" role="status" variant="primary" />
					<p style={styles.loadingText}>Loading jobs...</p>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default AdminJobs
