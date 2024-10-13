/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl, Modal, Spinner } from 'react-bootstrap'
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

	return (
		<>
			<div className="page uni-lecturer-page">
				<PageHeader title="Lecturers">
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
							disabled={!(selectedLecturerList.length > 0)}
						>
							Deactivate
						</Button>
					</>
				</PageHeader>
				<div className="">
					<CustomTable<LecturerItem>
						tableHeaders={tableHeaders}
						tableData={lecturersTableList}
						rowClickHandler={selectHandler}
						selectedDataRows={selectedLecturerList}
					/>
				</div>
			</div>

			{/* add new modal */}
			<AddNewLecturer
				isAddNewModalOpen={isAddNewModalOpen}
				modalCloseHandler={modalCloseHandler}
				addNewConfirmHandler={addNewConfirmHandler}
				isFormReset={createLecturerResponse ? true : false}
			/>

			{/* deactivate confirm modal */}
			<DeactivateLecturer
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

export default Lecturers
