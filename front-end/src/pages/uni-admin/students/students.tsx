import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import PageHeader from '../../../components/shared/page-header/page-header'
import { useEffect, useState } from 'react'
import CustomTable from '../../../components/shared/custom-table/custom-table'
import AddNewStudents, {
	FormData,
} from '../../../components/uni-admin/students/add-new-students/add-new-students'
import {
	GetStudentsResponse,
	StudentCreateRequest,
	StudentUpdateRequest,
} from '@promentor-app/shared-lib'
import { useCreateStudent } from '../../../hooks/uni-admin/students/useCreateStudent'
import { useGetStudentsTableDetails } from '../../../hooks/uni-admin/students/useGetStudentsTableDetails'
import { useUpdateStudent } from '../../../hooks/uni-admin/students/useUpdateStudent'
import { toast } from 'react-toastify'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import { useForm } from 'react-hook-form'
import DeactivateStudent, {
	DeactivateItem,
} from '../../../components/uni-admin/students/deactivate-student/deactivate-student'
import { useGetStudentById } from '../../../hooks/uni-admin/students/useGetStudentById'
import { FiSearch, FiPlus, FiUserMinus } from 'react-icons/fi'

type StudentItem = {
	id: string
	name: string
	username: string
	email: string
	status: string
}

const tableHeaders = ['', 'Name', 'Username', 'Email', 'Status', '']

const Students = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
	const [deactivateList, setDeactivateList] = useState<DeactivateItem[]>([])
	const [isDeactivated, setIsDeactivated] = useState(false)
	const [studentsTableList, setStudentsTableList] = useState<StudentItem[]>([])
	const [selectedStudentsList, setSelectedStudentsList] = useState<
		StudentItem[]
	>([])
	const [editStudentData, setEditStudentData] = useState<FormData | undefined>(
		undefined
	)
	const { register, handleSubmit } = useForm<{ search: string }>()

	const {
		setCreateStudentRequest,
		createStudentResponse,
		isLoading_createStudent,
		isValidating_createStudent,
		error_createStudent,
		setIsRequestReady_createStudent,
	} = useCreateStudent()

	const {
		getStudentsResponse,
		isLoading_getStudents,
		isValidating_getStudents,
		error_getStudents,
		mutate_getStudents,
		setSearch_getStudents,
	} = useGetStudentsTableDetails()

	const {
		setUpdateStudentsRequest,
		updateStudentsResponse,
		isLoading_updateStudent,
		isValidating_updateStudent,
		error_updateStudent,
		setStudentId,
		setIsRequestReady_updateStudent,
		mutate_updateStudent,
	} = useUpdateStudent()

	const {
		getStudentByIdResponse,
		isLoading_getStudentById,
		isValidating_getStudentById,
		error_getStudentById,
		mutate_getStudentById,
		setStudentById,
		setIsRequestReady_getStudentById,
	} = useGetStudentById()

	const searchHandler = (data: { search: string }) => {
		console.log(data)

		if (data.search !== null && data.search !== undefined) {
			setSearch_getStudents(data.search)
			mutate_getStudents()
		}
	}

	const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') handleSubmit(searchHandler)()
	}

	// open add new student modal
	const addNewHandler = () => {
		setIsAddNewModalOpen(true)
	}

	// close both add and deactivate modals
	const modalCloseHandler = () => {
		setIsAddNewModalOpen(false)
		setIsDeactivateModalOpen(false)
		setIsEditModalOpen(false)
		setIsDeactivated(false)
		setEditStudentData(undefined)
	}

	// open deactivate student modal
	const deactivateHandler = () => {
		deactivateListSetter(selectedStudentsList)
		setIsDeactivateModalOpen(true)
	}

	// deactivate staff confirmed
	const deactivateConfirmHandler = (list: DeactivateItem[]) => {
		// console.log(list)
		setIsDeactivated(true)

		list.forEach((item) => {
			setStudentId(item.id)
			setUpdateStudentsRequest({
				enabled: false,
				email: item.email,
			})
			setIsRequestReady_updateStudent(true)
			mutate_updateStudent()
		})

		setIsDeactivateModalOpen(false)
	}

	// convert table row data into deactivate list data
	const deactivateListSetter = (list: StudentItem[]) => {
		const dList: DeactivateItem[] = list.map((item) => {
			return {
				id: item.id,
				email: item.email,
				name: item.name,
			}
		})

		setDeactivateList(dList)
	}

	// select data row in the table
	const selectHandler = (item: StudentItem) => {
		if (
			selectedStudentsList.some((selectedUser) => selectedUser.id === item.id)
		) {
			// If already selected, remove from list
			setSelectedStudentsList(
				selectedStudentsList.filter(
					(selectedUser) => selectedUser.id !== item.id
				)
			)
		} else {
			// If not selected, add to list
			setSelectedStudentsList([...selectedStudentsList, item])
		}
	}

	// add new student confirmed
	const addNewConfirmHandler = (data: StudentCreateRequest) => {
		console.log(data)
		setCreateStudentRequest(data)
		setIsRequestReady_createStudent(true)
	}

	// convert students details response into table row data
	const studentsTableDataSetter = (response: GetStudentsResponse[]) => {
		const lecList: StudentItem[] = response.map((item) => {
			return {
				id: item.id,
				name: item?.firstName + ' ' + item?.lastName || '-',
				username: item.username,
				email: item.email,
				status: item.enabled ? 'Active' : 'Inactive',
			}
		})
		setStudentsTableList(lecList)
	}

	// edit button clicked, open edit modal
	const editHandler = (item: StudentItem) => {
		// console.log(item)
		setStudentId(item.id)

		// get staff details by id
		setStudentById(item.id)
		mutate_getStudentById()
		setIsRequestReady_getStudentById(true)
	}

	// edit data
	const editConfirmHandler = (data: any) => {
		console.log(data)
		setUpdateStudentsRequest(data as StudentUpdateRequest)
		setIsRequestReady_updateStudent(true)
		mutate_updateStudent()

		// setIsRequestReady_getStaffById(false)
	}

	useEffect(() => {
		mutate_getStudents()
	}, [])

	useEffect(() => {
		if (createStudentResponse) {
			toast.success('Student created successfully.')
			mutate_getStudents()
			setIsAddNewModalOpen(false)
		}
	}, [createStudentResponse])

	useEffect(() => {
		if (getStudentsResponse && getStudentsResponse.length > 0) {
			studentsTableDataSetter(getStudentsResponse)
		} else if (getStudentsResponse && getStudentsResponse.length === 0) {
			setStudentsTableList([])
		}
	}, [getStudentsResponse])

	useEffect(() => {
		if (getStudentByIdResponse) {
			console.log(getStudentByIdResponse)
			setEditStudentData({
				username: getStudentByIdResponse.username,
				firstName: getStudentByIdResponse.firstName || '',
				lastName: getStudentByIdResponse.lastName || '',
				contactNumber: getStudentByIdResponse.contactNumber,
				email: getStudentByIdResponse.email,
				enabled: getStudentByIdResponse.enabled,
			})
		}
	}, [getStudentByIdResponse])

	useEffect(() => {
		if (editStudentData?.username !== undefined) setIsEditModalOpen(true)
	}, [editStudentData])

	useEffect(() => {
		if (updateStudentsResponse) {
			if (!isDeactivated) {
				toast.info('Selected student account details updated successfully.')
				setIsEditModalOpen(false)
				setEditStudentData(undefined)
			} else {
				toast.info('Selected student accounts deactivated successfully.')
				setSelectedStudentsList([])
				setDeactivateList([])
				setIsDeactivated(false)
			}

			mutate_getStudents()
		}
	}, [updateStudentsResponse])

	useEffect(() => {
		errorDisplayHandler(error_createStudent)
		errorDisplayHandler(error_getStudents)
		errorDisplayHandler(error_updateStudent)
		errorDisplayHandler(error_getStudentById)
	}, [
		error_createStudent,
		error_getStudents,
		error_updateStudent,
		error_getStudentById,
	])

	useEffect(() => {
		if (
			isLoading_createStudent ||
			isLoading_getStudents ||
			isLoading_updateStudent ||
			isLoading_getStudentById ||
			isValidating_createStudent ||
			isValidating_getStudents ||
			isValidating_updateStudent ||
			isValidating_getStudentById
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_createStudent,
		isLoading_getStudents,
		isLoading_updateStudent,
		isValidating_createStudent,
		isValidating_getStudents,
		isValidating_updateStudent,
		isLoading_getStudentById,
		isValidating_getStudentById,
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

	return (
		<>
			<div style={styles.page}>
				<div style={styles.headerContainer}>
					<PageHeader title="Students">
						<div style={styles.headerActions}>
							<Form
								onSubmit={handleSubmit(searchHandler)}
								style={styles.searchForm}
							>
								<div style={styles.searchInputContainer}>
									<FiSearch style={styles.searchIcon} />
									<Form.Control
										type="text"
										placeholder="Search students..."
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
									disabled={!(selectedStudentsList.length > 0)}
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
					<CustomTable<StudentItem>
						tableHeaders={tableHeaders}
						tableData={studentsTableList}
						rowClickHandler={selectHandler}
						selectedDataRows={selectedStudentsList}
						editClickHandler={editHandler}
					/>
				</div>
			</div>

			{/* Modals (keep existing modal code exactly the same) */}
			{isAddNewModalOpen && (
				<AddNewStudents
					isAddNewModalOpen={isAddNewModalOpen}
					modalCloseHandler={modalCloseHandler}
					addNewConfirmHandler={addNewConfirmHandler}
					isFormReset={createStudentResponse ? true : false}
				/>
			)}

			{editStudentData?.username !== undefined && isEditModalOpen && (
				<AddNewStudents
					isAddNewModalOpen={isEditModalOpen}
					modalCloseHandler={modalCloseHandler}
					addNewConfirmHandler={editConfirmHandler}
					isFormReset={editStudentData === undefined ? true : false}
					editData={editStudentData}
				/>
			)}

			<DeactivateStudent
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
					<p style={styles.loadingText}>Loading students data...</p>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default Students
