/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl, Modal, Spinner } from 'react-bootstrap'
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

	return (
		<>
			<div className="page uni-students-page">
				<PageHeader title="Students">
					<>
						<Form onSubmit={handleSubmit(searchHandler)}>
							<FormControl
								type="text"
								placeholder="Search"
								className="mr-sm-2"
								{...register('search')}
								onKeyDown={keyDownHandler} // Listen for Enter key press
							/>
						</Form>
						<Button variant="primary" onClick={addNewHandler}>
							Add New
						</Button>
						<Button
							variant="primary"
							onClick={deactivateHandler}
							disabled={!(selectedStudentsList.length > 0)}
						>
							Deactivate
						</Button>
					</>
				</PageHeader>
				<div className="">
					<CustomTable<StudentItem>
						tableHeaders={tableHeaders}
						tableData={studentsTableList}
						rowClickHandler={selectHandler}
						selectedDataRows={selectedStudentsList}
						editClickHandler={editHandler}
					/>
				</div>
			</div>

			{/* add new modal */}
			{isAddNewModalOpen && (
				<AddNewStudents
					isAddNewModalOpen={isAddNewModalOpen}
					modalCloseHandler={modalCloseHandler}
					addNewConfirmHandler={addNewConfirmHandler}
					isFormReset={createStudentResponse ? true : false}
				/>
			)}

			{/* edit modal */}
			{editStudentData?.username !== undefined && isEditModalOpen && (
				<AddNewStudents
					isAddNewModalOpen={isEditModalOpen}
					modalCloseHandler={modalCloseHandler}
					addNewConfirmHandler={editConfirmHandler}
					isFormReset={editStudentData === undefined ? true : false}
					editData={editStudentData}
				/>
			)}

			{/* deactivate confirm modal */}
			<DeactivateStudent
				isDeactivateModalOpen={isDeactivateModalOpen}
				modalCloseHandler={modalCloseHandler}
				deactivateConfirmHandler={deactivateConfirmHandler}
				deactivateList={deactivateList}
			/>

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

export default Students
