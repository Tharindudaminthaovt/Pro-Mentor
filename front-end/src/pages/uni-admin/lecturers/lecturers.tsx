import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import PageHeader from '../../../components/shared/page-header/page-header'
import CustomTable from '../../../components/shared/custom-table/custom-table'
import { useEffect, useState } from 'react'
import AddNewLecturer from '../../../components/uni-admin/lecturers/add-new-lecturer/add-new-lecturer'
import DeactivateLecturer, {
	DeactivateItem,
} from '../../../components/uni-admin/lecturers/deactivate-lecturer/deactivate-lecturer'
import { useCreateLecturer } from '../../../hooks/uni-admin/lecturers/useCreateLecturer'
import { useGetLecturersTableDetails } from '../../../hooks/uni-admin/lecturers/useGetLecturersTableDetails'
import { useUpdateLecturer } from '../../../hooks/uni-admin/lecturers/useUpdateLecturer'
import {
	GetLecturerResponse,
	LecturerCreateRequest,
} from '@promentor-app/shared-lib'
import { toast } from 'react-toastify'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import { useForm } from 'react-hook-form'
import { FiSearch, FiPlus, FiUserMinus } from 'react-icons/fi'

type LecturerItem = {
	id: string
	name: string
	username: string
	email: string
	status: string
}

const tableHeaders = ['', 'Name', 'Username', 'Email', 'Status']

const Lecturers = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
	const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
	const [deactivateList, setDeactivateList] = useState<DeactivateItem[]>([])
	const [lecturersTableList, setLecturersTableList] = useState<LecturerItem[]>(
		[]
	)
	const [selectedLecturerList, setSelectedLecturerList] = useState<
		LecturerItem[]
	>([])
	const { register, handleSubmit } = useForm<{ search: string }>()
	const {
		setCreateLecturerRequest,
		createLecturerResponse,
		isLoading_createLecturer,
		isValidating_createLecturer,
		error_createLecturer,
		setIsRequestReady_createLecturer,
	} = useCreateLecturer()

	const {
		getLecturersResponse,
		isLoading_getLecturers,
		isValidating_getLecturers,
		error_getLecturers,
		mutate_getLecturers,
		setSearch_getLecturers,
	} = useGetLecturersTableDetails()

	const {
		setUpdateLecturersRequest,
		updateLecturersResponse,
		isLoading_updateLecturer,
		isValidating_updateLecturer,
		error_updateLecturer,
		setLecId,
		setIsRequestReady_updateLecturer,
		mutate_updateLecturer,
	} = useUpdateLecturer()

	const searchHandler = (data: { search: string }) => {
		console.log(data)

		if (data.search !== null && data.search !== undefined) {
			setSearch_getLecturers(data.search)
			mutate_getLecturers()
		}
	}

	const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') handleSubmit(searchHandler)()
	}

	// open add new lecturer modal
	const addNewHandler = () => {
		setIsAddNewModalOpen(true)
	}

	// open deactivate lecturer modal
	const deactivateHandler = () => {
		deactivateListSetter(selectedLecturerList)
		setIsDeactivateModalOpen(true)
	}

	// close both add and deactivate modals
	const modalCloseHandler = () => {
		setIsAddNewModalOpen(false)
		setIsDeactivateModalOpen(false)
	}

	// add new lecturer confirmed
	const addNewConfirmHandler = (data: LecturerCreateRequest) => {
		console.log(data)
		setCreateLecturerRequest(data)
		setIsRequestReady_createLecturer(true)
	}

	// deactivate lecturer confirmed
	const deactivateConfirmHandler = (list: DeactivateItem[]) => {
		list.forEach((item) => {
			setLecId(item.id)
			setUpdateLecturersRequest({
				enabled: false,
				email: item.email,
			})
			setIsRequestReady_updateLecturer(true)
			mutate_updateLecturer()
		})

		setIsDeactivateModalOpen(false)
	}

	// convert table row data into deactivate list data
	const deactivateListSetter = (list: LecturerItem[]) => {
		const dList: DeactivateItem[] = list.map((item) => {
			return {
				id: item.id,
				email: item.email,
				name: item.name,
			}
		})

		setDeactivateList(dList)
	}

	// convert lecturers details response into table row data
	const lecturersTableDataSetter = (response: GetLecturerResponse[]) => {
		const lecList: LecturerItem[] = response.map((item) => {
			return {
				id: item.id,
				name: item?.firstName + ' ' + item?.lastName || '-',
				username: item.username,
				email: item.email,
				status: item.enabled ? 'Active' : 'Inactive',
			}
		})
		setLecturersTableList(lecList)
	}

	// select data row in the table
	const selectHandler = (item: LecturerItem) => {
		if (
			selectedLecturerList.some((selectedUser) => selectedUser.id === item.id)
		) {
			// If already selected, remove from list
			setSelectedLecturerList(
				selectedLecturerList.filter(
					(selectedUser) => selectedUser.id !== item.id
				)
			)
		} else {
			// If not selected, add to list
			setSelectedLecturerList([...selectedLecturerList, item])
		}
	}

	useEffect(() => {
		mutate_getLecturers()
	}, [])

	useEffect(() => {
		if (createLecturerResponse) {
			toast.success('Lecturer created successfully.')
			mutate_getLecturers()
			setIsAddNewModalOpen(false)
		}
	}, [createLecturerResponse])

	useEffect(() => {
		if (getLecturersResponse && getLecturersResponse.length > 0) {
			lecturersTableDataSetter(getLecturersResponse)
		} else if (getLecturersResponse && getLecturersResponse.length === 0) {
			setLecturersTableList([])
		}
	}, [getLecturersResponse])

	useEffect(() => {
		if (updateLecturersResponse) {
			toast.info('Selected lecturer accounts deactivated successfully.')
			setSelectedLecturerList([])
			setDeactivateList([])
			mutate_getLecturers()
		}
	}, [updateLecturersResponse])

	useEffect(() => {
		errorDisplayHandler(error_createLecturer)
		errorDisplayHandler(error_getLecturers)
		errorDisplayHandler(error_updateLecturer)
	}, [error_createLecturer, error_getLecturers, error_updateLecturer])

	useEffect(() => {
		if (
			isLoading_createLecturer ||
			isLoading_getLecturers ||
			isLoading_updateLecturer ||
			isValidating_createLecturer ||
			isValidating_getLecturers ||
			isValidating_updateLecturer
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_createLecturer,
		isLoading_getLecturers,
		isLoading_updateLecturer,
		isValidating_createLecturer,
		isValidating_getLecturers,
		isValidating_updateLecturer,
	])
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

	// ... (keep all existing hooks and logic exactly the same)

	return (
		<>
			<div style={styles.page}>
				<div style={styles.headerContainer}>
					<PageHeader title="Lecturers">
						<div style={styles.headerActions}>
							<Form
								onSubmit={handleSubmit(searchHandler)}
								style={styles.searchForm}
							>
								<div style={styles.searchInputContainer}>
									<FiSearch style={styles.searchIcon} />
									<Form.Control
										type="text"
										placeholder="Search lecturers..."
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
									onClick={deactivateHandler}
									disabled={!(selectedLecturerList.length > 0)}
									style={styles.actionButton}
								>
									<FiUserMinus style={{ fontSize: '16px' }} />
									Deactivate
								</Button>
							</div>
						</div>
					</PageHeader>
				</div>

				<div style={styles.tableContainer}>
					<CustomTable<LecturerItem>
						tableHeaders={tableHeaders}
						tableData={lecturersTableList}
						rowClickHandler={selectHandler}
						selectedDataRows={selectedLecturerList}
					/>
				</div>
			</div>

			{/* Modals */}
			<AddNewLecturer
				isAddNewModalOpen={isAddNewModalOpen}
				modalCloseHandler={modalCloseHandler}
				addNewConfirmHandler={addNewConfirmHandler}
				isFormReset={createLecturerResponse ? true : false}
			/>

			<DeactivateLecturer
				isDeactivateModalOpen={isDeactivateModalOpen}
				modalCloseHandler={modalCloseHandler}
				deactivateConfirmHandler={deactivateConfirmHandler}
				deactivateList={deactivateList}
			/>

			<Modal
				show={isLoading}
				backdrop="static"
				keyboard={false}
				centered
				style={styles.loadingModal}
			>
				<Modal.Body style={styles.loadingContent}>
					<Spinner animation="border" role="status" variant="primary" />
					<p style={styles.loadingText}>Loading lecturers data...</p>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default Lecturers
