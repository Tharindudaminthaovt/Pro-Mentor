import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import CustomTable from '../../../components/shared/custom-table/custom-table'
import PageHeader from '../../../components/shared/page-header/page-header'
import { useEffect, useState } from 'react'
import AddNewStaff, {
	FormData,
} from '../../../components/uni-admin/staff/add-new-staff/add-new-staff'
import DeactivateStaff, {
	DeactivateItem,
} from '../../../components/uni-admin/staff/deactivate-staff/deactivate-staff'
import { useCreateStaff } from '../../../hooks/uni-admin/staff/useCreateStaff'
import { toast } from 'react-toastify'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import { GetResourceManagersResponse } from '@promentor-app/shared-lib'
import { useUpdateStaff } from '../../../hooks/uni-admin/staff/useUpdateStaff'
import { useGetStaffById } from '../../../hooks/uni-admin/staff/useGetStaffById'
import { useForm } from 'react-hook-form'
import { useGetStaffTableDetails } from '../../../hooks/uni-admin/staff/useGetStaffTableDetails'
import { FiSearch, FiPlus, FiUserMinus, FiEdit } from 'react-icons/fi'

type StaffItem = {
	id: string
	name: string
	username: string
	email: string
	status: string
}

const tableHeaders = ['', 'Name', 'Username', 'Email', 'Status', '']

const UniStaff = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
	const [isDeactivated, setIsDeactivated] = useState(false)
	const [deactivateStaffList, setDeactivateStaffList] = useState<
		DeactivateItem[]
	>([])
	const [staffTableList, setStaffTableList] = useState<StaffItem[]>([])
	const [selectedStaffList, setSelectedStaffList] = useState<StaffItem[]>([])
	const [editStaffData, setEditStaffData] = useState<FormData | undefined>(
		undefined
	)
	const { register, handleSubmit } = useForm<{ search: string }>()

	// Custom hooks
	const {
		setCreateStaffRequest,
		createStaffResponse,
		isLoading_createStaff,
		isValidating_createStaff,
		error_createStaff,
		setIsRequestReady_createStaff,
	} = useCreateStaff()

	const {
		getStaffResponse,
		isLoading_getStaff,
		isValidating_getStaff,
		error_getStaff,
		mutate_getStaff,
		setSearch_getStaff,
	} = useGetStaffTableDetails()

	const {
		getStaffByIdResponse,
		isLoading_getStaffById,
		isValidating_getStaffById,
		error_getStaffById,
		mutate_getStaffById,
		setStaffById,
		setIsRequestReady_getStaffById,
	} = useGetStaffById()

	const {
		setUpdateStaffRequest,
		updateStaffResponse,
		isLoading_updateStaff,
		isValidating_updateStaff,
		error_updateStaff,
		setStaffId,
		setIsRequestReady_updateStaff,
		mutate_updateStaff,
	} = useUpdateStaff()

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
			setSearch_getStaff(data.search)
			mutate_getStaff()
		}
	}

	const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') handleSubmit(searchHandler)()
	}

	const addNewHandler = () => setIsAddNewModalOpen(true)
	const deactivateHandler = () => {
		setDeactivateStaffList(
			selectedStaffList.map((staff) => ({
				id: staff.id,
				email: staff.email,
				name: staff.name,
			}))
		)
		setIsDeactivateModalOpen(true)
	}

	const modalCloseHandler = () => {
		setIsAddNewModalOpen(false)
		setIsDeactivateModalOpen(false)
		setIsEditModalOpen(false)
		setIsDeactivated(false)
		setEditStaffData(undefined)
	}

	const addNewConfirmHandler = (data: FormData) => {
		setCreateStaffRequest(data)
		setIsRequestReady_createStaff(true)
	}

	const deactivateConfirmHandler = (list: DeactivateItem[]) => {
		setIsDeactivated(true)
		list.forEach((item) => {
			setStaffId(item.id)
			setUpdateStaffRequest({
				enabled: false,
				email: item.email,
			})
			setIsRequestReady_updateStaff(true)
			mutate_updateStaff()
		})
		setIsDeactivateModalOpen(false)
	}

	const selectHandler = (item: StaffItem) => {
		setSelectedStaffList((prev) =>
			prev.some((staff) => staff.id === item.id)
				? prev.filter((staff) => staff.id !== item.id)
				: [...prev, item]
		)
	}

	const editHandler = (item: StaffItem) => {
		setStaffId(item.id)
		setStaffById(item.id)
		mutate_getStaffById()
		setIsRequestReady_getStaffById(true)
	}

	const editConfirmHandler = (data: FormData) => {
		setUpdateStaffRequest(data)
		setIsRequestReady_updateStaff(true)
		mutate_updateStaff()
	}

	const staffTableDataSetter = (response: GetResourceManagersResponse[]) => {
		setStaffTableList(
			response.map((item) => ({
				id: item.id,
				name: `${item.firstName || ''} ${item.lastName || ''}`.trim() || '-',
				username: item.username,
				email: item.email,
				status: item.enabled ? 'Active' : 'Inactive',
			}))
		)
	}

	// Effects
	useEffect(() => {
		mutate_getStaff()
	}, [])

	useEffect(() => {
		if (createStaffResponse) {
			toast.success('Staff created successfully.')
			mutate_getStaff()
			setIsAddNewModalOpen(false)
		}
	}, [createStaffResponse])

	useEffect(() => {
		if (getStaffResponse) {
			staffTableDataSetter(getStaffResponse)
		}
	}, [getStaffResponse])

	useEffect(() => {
		if (getStaffByIdResponse) {
			setEditStaffData({
				username: getStaffByIdResponse.username,
				firstName: getStaffByIdResponse.firstName || '',
				lastName: getStaffByIdResponse.lastName || '',
				contactNumber: getStaffByIdResponse.contactNumber,
				email: getStaffByIdResponse.email,
				enabled: getStaffByIdResponse.enabled,
			})
		}
	}, [getStaffByIdResponse])

	useEffect(() => {
		if (editStaffData?.username !== undefined) setIsEditModalOpen(true)
	}, [editStaffData])

	useEffect(() => {
		if (updateStaffResponse) {
			if (!isDeactivated) {
				toast.info('Selected staff account details updated successfully.')
				setIsEditModalOpen(false)
				setEditStaffData(undefined)
			} else {
				toast.info('Selected staff accounts deactivated successfully.')
				setSelectedStaffList([])
				setDeactivateStaffList([])
				setIsDeactivated(false)
			}
			mutate_getStaff()
		}
	}, [updateStaffResponse])

	useEffect(() => {
		errorDisplayHandler(error_createStaff)
		errorDisplayHandler(error_getStaff)
		errorDisplayHandler(error_updateStaff)
		errorDisplayHandler(error_getStaffById)
	}, [error_createStaff, error_getStaff, error_updateStaff, error_getStaffById])

	useEffect(() => {
		setIsLoading(
			isLoading_createStaff ||
				isLoading_getStaff ||
				isLoading_updateStaff ||
				isLoading_getStaffById ||
				isValidating_createStaff ||
				isValidating_getStaff ||
				isValidating_updateStaff ||
				isValidating_getStaffById
		)
	}, [
		isLoading_createStaff,
		isLoading_getStaff,
		isLoading_updateStaff,
		isLoading_getStaffById,
		isValidating_createStaff,
		isValidating_getStaff,
		isValidating_updateStaff,
		isValidating_getStaffById,
	])

	return (
		<div style={styles.page}>
			<div style={styles.headerContainer}>
				<PageHeader title="Staff">
					<div style={styles.headerActions}>
						<Form
							onSubmit={handleSubmit(searchHandler)}
							style={styles.searchForm}
						>
							<div style={styles.searchInputContainer}>
								<FiSearch style={styles.searchIcon} />
								<Form.Control
									type="text"
									placeholder="Search staff..."
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
								disabled={!selectedStaffList.length}
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
				<CustomTable<StaffItem>
					tableHeaders={tableHeaders}
					tableData={staffTableList}
					rowClickHandler={selectHandler}
					selectedDataRows={selectedStaffList}
					editClickHandler={editHandler}
				/>
			</div>

			{/* Add New Staff Modal */}
			<AddNewStaff
				isAddNewModalOpen={isAddNewModalOpen}
				modalCloseHandler={modalCloseHandler}
				addNewConfirmHandler={addNewConfirmHandler}
				isFormReset={!!createStaffResponse}
			/>

			{/* Edit Staff Modal */}
			{editStaffData && (
				<AddNewStaff
					isAddNewModalOpen={isEditModalOpen}
					modalCloseHandler={modalCloseHandler}
					addNewConfirmHandler={editConfirmHandler}
					editData={editStaffData}
				/>
			)}

			{/* Deactivate Staff Modal */}
			<DeactivateStaff
				isDeactivateModalOpen={isDeactivateModalOpen}
				modalCloseHandler={modalCloseHandler}
				deactivateConfirmHandler={deactivateConfirmHandler}
				deactivateStaffList={deactivateStaffList}
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
					<p style={styles.loadingText}>Loading staff data...</p>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default UniStaff
