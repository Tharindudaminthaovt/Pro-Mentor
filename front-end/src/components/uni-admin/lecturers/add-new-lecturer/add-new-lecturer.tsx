/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useGetSchoolsGroupList } from '../../../../hooks/uni-admin/lecturers/useGetSchoolsGroupList'
import { useEffect, useState } from 'react'
import { errorDisplayHandler } from '../../../../utils/errorDisplayHandler'
import { Group, LecturerCreateRequest } from '@promentor-app/shared-lib'
import { useGetDegreesGroupList } from '../../../../hooks/uni-admin/lecturers/useGetDegreesGroupList'
import { useGetClassesGroupList } from '../../../../hooks/uni-admin/lecturers/useGetClassesGroupList'

type Props = {
	isAddNewModalOpen: boolean
	modalCloseHandler: () => void
	addNewConfirmHandler: (data: LecturerCreateRequest) => void
	isFormReset: boolean
}

export interface AddLecturerFormData {
	username: string
	email: string
	firstName: string
	lastName: string
	contactNumber?: string
	assignedSchools?: any | Group[]
	assignedClasses?: any | Group[]
	assignedDegrees?: any | Group[]
}

const schema = yup.object().shape({
	username: yup.string().required('Username is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	contactNumber: yup
		.string()
		.matches(/^\+?\d+$/, 'Contact number must contain only digits'),
})

const AddNewLecturer = ({
	isAddNewModalOpen,
	modalCloseHandler,
	addNewConfirmHandler,
	isFormReset,
}: Props) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<AddLecturerFormData>({
		resolver: yupResolver(schema),
	})
	const [isLoading, setIsLoading] = useState(false)
	const [schoolsList, setSchoolsList] = useState<Group[]>([])
	const [degreesList, setDegreesList] = useState<Group[]>([])
	const [classesList, setClassesList] = useState<Group[]>([])
	const {
		getSchoolsGroupsListResponse,
		error_getSchoolsGroups,
		isLoading_getSchoolsGroups,
		isValidating_getSchoolsGroups,
		mutate_getSchoolsGroups,
	} = useGetSchoolsGroupList()

	const {
		getDegreesGroupsListResponse,
		error_getDegreesGroups,
		isLoading_getDegreesGroups,
		isValidating_getDegreesGroups,
		mutate_getDegreesGroups,
	} = useGetDegreesGroupList()

	const {
		getClassesGroupsListResponse,
		error_getClassesGroups,
		isLoading_getClassesGroups,
		isValidating_getClassesGroups,
		mutate_getClassesGroups,
	} = useGetClassesGroupList()

	useEffect(() => {
		mutate_getSchoolsGroups()
		mutate_getDegreesGroups()
		mutate_getClassesGroups()
	}, [])

	useEffect(() => {
		if (getSchoolsGroupsListResponse) {
			setSchoolsList(getSchoolsGroupsListResponse.subGroups)
		}
	}, [getSchoolsGroupsListResponse])

	useEffect(() => {
		if (getDegreesGroupsListResponse) {
			setDegreesList(getDegreesGroupsListResponse.subGroups)
		}
	}, [getDegreesGroupsListResponse])

	useEffect(() => {
		if (getClassesGroupsListResponse) {
			setClassesList(getClassesGroupsListResponse.subGroups)
		}
	}, [getClassesGroupsListResponse])

	useEffect(() => {
		if (
			isLoading_getSchoolsGroups ||
			isValidating_getSchoolsGroups ||
			isLoading_getDegreesGroups ||
			isValidating_getDegreesGroups ||
			isLoading_getClassesGroups ||
			isValidating_getClassesGroups
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_getSchoolsGroups,
		isValidating_getSchoolsGroups,
		isLoading_getDegreesGroups,
		isValidating_getDegreesGroups,
		isLoading_getClassesGroups,
		isValidating_getClassesGroups,
	])

	useEffect(() => {
		errorDisplayHandler(error_getSchoolsGroups)
		errorDisplayHandler(error_getDegreesGroups)
		errorDisplayHandler(error_getClassesGroups)
	}, [error_getSchoolsGroups, error_getDegreesGroups, error_getClassesGroups])

	useEffect(() => {
		if (isFormReset) reset()
	}, [isFormReset])

	const mapSelectedGroups = (
		selectedGroups: { [key: string]: boolean } | null,
		groups: Group[]
	) => {
		if (selectedGroups === null) return []
		else
			return groups
				.filter((group) => selectedGroups[group.id])
				.map((cls) => cls.name)
	}

	const formDataConverter = (formData: AddLecturerFormData) => {
		const selectedClasses = mapSelectedGroups(
			formData?.assignedClasses || null,
			classesList
		)
		const selectedDegrees = mapSelectedGroups(
			formData?.assignedDegrees || null,
			degreesList
		)
		const selectedSchools = mapSelectedGroups(
			formData?.assignedSchools || null,
			schoolsList
		)
		formData.assignedClasses = selectedClasses
		formData.assignedDegrees = selectedDegrees
		formData.assignedSchools = selectedSchools

		const data: LecturerCreateRequest = {
			email: formData.email,
			username: formData.username,
			contactNumber: formData.contactNumber,
			firstName: formData.firstName,
			lastName: formData.lastName,
			degreeProgram: selectedDegrees,
			school: selectedSchools,
			studentClass: selectedClasses,
		}
		addNewConfirmHandler(data)
	}

	return (
		<>
			<Modal show={isAddNewModalOpen} onHide={modalCloseHandler}>
				<Form onSubmit={handleSubmit(formDataConverter)}>
					{/* <Form
					onSubmit={handleSubmit((data) => {
						console.log(data)
						console.log(mapSelectedGroups(data.assignedClasses, classesList))
					})}
				> */}
					<Modal.Header closeButton>
						<Modal.Title>Add Lecturer</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="">
							<div className="">General Details</div>
							<Form.Group controlId="firstName">
								<Form.Label>First Name</Form.Label>
								<Controller
									name="firstName"
									control={control}
									defaultValue=""
									render={({ field }) => <Form.Control {...field} />}
								/>
								<Form.Text className="text-danger">
									{errors.firstName?.message}
								</Form.Text>
							</Form.Group>

							<Form.Group controlId="lastName">
								<Form.Label>Last Name</Form.Label>
								<Controller
									name="lastName"
									control={control}
									defaultValue=""
									render={({ field }) => <Form.Control {...field} />}
								/>
								<Form.Text className="text-danger">
									{errors.lastName?.message}
								</Form.Text>
							</Form.Group>

							<Form.Group controlId="username">
								<Form.Label>Username</Form.Label>
								<Controller
									name="username"
									control={control}
									defaultValue=""
									render={({ field }) => <Form.Control {...field} />}
								/>
								<Form.Text className="text-danger">
									{errors.username?.message}
								</Form.Text>
							</Form.Group>

							<Form.Group controlId="email">
								<Form.Label>Email</Form.Label>
								<Controller
									name="email"
									control={control}
									defaultValue=""
									render={({ field }) => <Form.Control {...field} />}
								/>
								<Form.Text className="text-danger">
									{errors.email?.message}
								</Form.Text>
							</Form.Group>

							<Form.Group controlId="contactNumber">
								<Form.Label>Contact No.</Form.Label>
								<Controller
									name="contactNumber"
									control={control}
									defaultValue=""
									render={({ field }) => <Form.Control {...field} />}
								/>
								<Form.Text className="text-danger">
									{errors.contactNumber?.message}
								</Form.Text>
							</Form.Group>
						</div>
						<div className="">
							<div className="">Faculty Details</div>

							<Form.Group controlId="schools">
								<Form.Label>Schools</Form.Label>
								{schoolsList &&
									schoolsList.map((school) => (
										<Form.Check
											key={school.id}
											type="checkbox"
											label={school.name}
											{...control.register(`assignedSchools.${school.id}`)}
										/>
									))}
							</Form.Group>

							<Form.Group controlId="degrees">
								<Form.Label>Degree Programs</Form.Label>
								{degreesList &&
									degreesList.map((degree) => (
										<Form.Check
											key={degree.id}
											type="checkbox"
											label={degree.name}
											{...control.register(`assignedDegrees.${degree.id}`)}
										/>
									))}
							</Form.Group>

							<Form.Group controlId="classes">
								<Form.Label>Classes</Form.Label>
								{classesList &&
									classesList.map((class1) => (
										<Form.Check
											key={class1.id}
											type="checkbox"
											label={class1.name}
											{...control.register(`assignedClasses.${class1.id}`)}
										/>
									))}
							</Form.Group>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={modalCloseHandler}>
							Close
						</Button>
						<Button variant="primary" type="submit">
							Add Lecturer
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>

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

export default AddNewLecturer
