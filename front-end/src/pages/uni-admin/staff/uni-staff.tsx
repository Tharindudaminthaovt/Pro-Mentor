/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl, Modal, Spinner } from 'react-bootstrap'
import CustomTable from '../../../components/shared/custom-table/custom-table'
import PageHeader from '../../../components/shared/page-header/page-header'
import './uni-staff.scss'
import { useGetStaffTableDetails } from '../../../hooks/uni-admin/staff/useGetStaffTableDetails'
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

	const searchHandler = (data: { search: string }) => {
		console.log(data)

		if (data.search !== null && data.search !== undefined) {
			setSearch_getStaff(data.search)
			mutate_getStaff()
		}
	}

	const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') handleSubmit(searchHandler)()
	}

	// open add new staff modal
	const addNewHandler = () => {
		setIsAddNewModalOpen(true)
	}

	// open deactivate staff modal
	const deactivateHandler = () => {
		deactivateListSetter(selectedStaffList)
		setIsDeactivateModalOpen(true)
	}

	// close both add and deactivate modals
	const modalCloseHandler = () => {
		setIsAddNewModalOpen(false)
		setIsDeactivateModalOpen(false)
		setIsEditModalOpen(false)
		setIsDeactivated(false)
		setEditStaffData(undefined)
	}

	// add new staff confirmed
	const addNewConfirmHandler = (data: FormData) => {
		// setIsLoading(true)
		setCreateStaffRequest(data)
		setIsRequestReady_createStaff(true)
		// setIsAddNewModalOpen(false)
	}

	// deactivate staff confirmed
	const deactivateConfirmHandler = (list: DeactivateItem[]) => {
		// console.log(list)
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

	// convert table row data into deactivate list data
	const deactivateListSetter = (list: StaffItem[]) => {
		const dList: DeactivateItem[] = list.map((item) => {
			return {
				id: item.id,
				email: item.email,
				name: item.name,
			}
		})
		// console.log(staffList)

		setDeactivateStaffList(dList)
	}

	// convert staff details response into table row data
	const staffTableDataSetter = (response: GetResourceManagersResponse[]) => {
		const staffList: StaffItem[] = response.map((item) => {
			return {
				id: item.id,
				name: item?.firstName + ' ' + item?.lastName || '-',
				username: item.username,
				email: item.email,
				status: item.enabled ? 'Active' : 'Inactive',
			}
		})
		setStaffTableList(staffList)
	}

	// select data row in the table
	const selectHandler = (item: StaffItem) => {
		if (selectedStaffList.some((selectedUser) => selectedUser.id === item.id)) {
			// If already selected, remove from list
			setSelectedStaffList(
				selectedStaffList.filter((selectedUser) => selectedUser.id !== item.id)
			)
		} else {
			// If not selected, add to list
			setSelectedStaffList([...selectedStaffList, item])
		}
	}

	// edit button clicked, open edit modal
	const editHandler = (item: StaffItem) => {
		// console.log(item)
		setStaffId(item.id)

		// get staff details by id
		setStaffById(item.id)
		mutate_getStaffById()
		setIsRequestReady_getStaffById(true)
	}

	// edit data
	const editConfirmHandler = (data: FormData) => {
		console.log(data)
		setUpdateStaffRequest(data)
		setIsRequestReady_updateStaff(true)
		mutate_updateStaff()
		// setIsRequestReady_getStaffById(false)
	}

	useEffect(() => {
		mutate_getStaff()
	}, [])

	useEffect(() => {
		// console.log(createStaffResponse)
		if (createStaffResponse) {
			toast.success('Staff created successfully.')
			mutate_getStaff()
			setIsAddNewModalOpen(false)
		}
	}, [createStaffResponse])

	useEffect(() => {
		// console.log(getStaffResponse)
		if (getStaffResponse && getStaffResponse.length > 0) {
			staffTableDataSetter(getStaffResponse)
		} else if (getStaffResponse && getStaffResponse.length === 0) {
			setStaffTableList([])
		}
	}, [getStaffResponse])

	useEffect(() => {
		if (getStaffByIdResponse) {
			// console.log(getStaffByIdResponse)
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
		if (
			isLoading_createStaff ||
			isLoading_getStaff ||
			isValidating_createStaff ||
			isValidating_getStaff ||
			isLoading_updateStaff ||
			isValidating_updateStaff ||
			isLoading_getStaffById ||
			isValidating_getStaffById
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_createStaff,
		isLoading_getStaff,
		isValidating_createStaff,
		isValidating_getStaff,
		isLoading_updateStaff,
		isValidating_updateStaff,
		isLoading_getStaffById,
		isValidating_getStaffById,
	])

	return (
		<>
			<div className="page uni-staff-page">
				<PageHeader title="Staff">
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
							disabled={!(selectedStaffList.length > 0)}
						>
							Deactivate
						</Button>
					</>
				</PageHeader>
				<div className=""></div>
				<div className="">
					{staffTableList && (
						<CustomTable<StaffItem>
							tableHeaders={tableHeaders}
							tableData={staffTableList}
							rowClickHandler={selectHandler}
							selectedDataRows={selectedStaffList}
							editClickHandler={editHandler}
						/>
					)}
				</div>
			</div>

			{/* add new modal */}
			{isAddNewModalOpen && (
				<AddNewStaff
					isAddNewModalOpen={isAddNewModalOpen}
					modalCloseHandler={modalCloseHandler}
					addNewConfirmHandler={addNewConfirmHandler}
				/>
			)}

			{/* edit modal */}
			{editStaffData?.username !== undefined && isEditModalOpen && (
				<AddNewStaff
					isAddNewModalOpen={isEditModalOpen}
					modalCloseHandler={modalCloseHandler}
					addNewConfirmHandler={editConfirmHandler}
					editData={editStaffData}
				/>
			)}

			{/* deactivate confirm modal */}
			<DeactivateStaff
				isDeactivateModalOpen={isDeactivateModalOpen}
				modalCloseHandler={modalCloseHandler}
				deactivateConfirmHandler={deactivateConfirmHandler}
				deactivateStaffList={deactivateStaffList}
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

export default UniStaff
