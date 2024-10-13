import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Modal } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

type Props = {
	isAddNewModalOpen: boolean
	modalCloseHandler: () => void
	addNewConfirmHandler: (data: FormData) => void
	editData?: FormData
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

export interface FormData {
	username: string
	email: string
	firstName: string
	lastName: string
	contactNumber?: string
	enabled?: boolean
}

const AddNewStaff = ({
	isAddNewModalOpen,
	modalCloseHandler,
	addNewConfirmHandler,
	editData,
}: Props) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormData>({
		resolver: editData === undefined ? yupResolver(schema) : undefined,
		defaultValues: editData || undefined,
	})

	// if (editData) console.log(editData.username)

	const closeHandler = () => {
		if (editData) editData = undefined
		modalCloseHandler()
	}

	const submitHandler = (data: FormData) => {
		// if (editData) addNewConfirmHandler(data, )
		if (editData) editData = undefined
		addNewConfirmHandler(data)
	}

	return (
		<Modal show={isAddNewModalOpen} onHide={() => closeHandler()}>
			<Form onSubmit={handleSubmit(submitHandler)}>
				{/* <Form onSubmit={handleSubmit((data) => console.log(data))}> */}
				<Modal.Header closeButton>
					<Modal.Title>
						{editData ? 'Edit Staff Member Details' : 'Add Staff Member'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="firstName">
						<Form.Label>First Name</Form.Label>
						<Controller
							name="firstName"
							control={control}
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
							render={({ field }) => (
								<Form.Control
									{...field}
									readOnly={!!editData}
									disabled={editData ? true : false}
								/>
							)}
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
							render={({ field }) => (
								<Form.Control
									{...field}
									readOnly={!!editData}
									disabled={editData ? true : false}
								/>
							)}
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
							render={({ field }) => <Form.Control {...field} />}
						/>
						<Form.Text className="text-danger">
							{errors.contactNumber?.message}
						</Form.Text>
					</Form.Group>

					{editData && (
						<Form.Group controlId="enabled">
							{/* <Form.Label>Account Status</Form.Label> */}
							<Controller
								name="enabled"
								control={control}
								render={({ field }) => (
									<Form.Check
										{...field}
										type="switch"
										id="enabled"
										label="Account Active"
										// value={field.value ? 'true' : 'false'}
										checked={field.value}
										onChange={(e) => field.onChange(e.target.checked)}
										value={undefined}
									/>
								)}
							/>
						</Form.Group>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => closeHandler()}>
						Close
					</Button>
					<Button type="submit" variant="primary">
						{editData ? 'Edit' : 'Add'}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddNewStaff
