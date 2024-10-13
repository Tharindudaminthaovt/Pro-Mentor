import { Button, Modal } from 'react-bootstrap'

export type DeactivateItem = {
	name: string
	email: string
	id: string
}

type Props = {
	isDeactivateModalOpen: boolean
	modalCloseHandler: () => void
	deactivateConfirmHandler: (list: DeactivateItem[]) => void
	deactivateStaffList: DeactivateItem[]
}

const DeactivateStaff = ({
	isDeactivateModalOpen,
	modalCloseHandler,
	deactivateConfirmHandler,
	deactivateStaffList,
}: Props) => {
	return (
		<Modal show={isDeactivateModalOpen} onHide={modalCloseHandler}>
			<Modal.Header closeButton>
				<Modal.Title>Deactivate Staff Account</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="">
					Are you sure you want to deactive following selected staff accounts?
				</div>
				<div className="mt-4">
					{deactivateStaffList &&
						deactivateStaffList.map((staff, index) => (
							<div key={index} className="d-flex gap-2">
								<div className="">{staff.name}</div>
								<div className="">- {staff.email}</div>
							</div>
						))}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={modalCloseHandler}>
					Cancel
				</Button>
				<Button
					variant="primary"
					onClick={() => deactivateConfirmHandler(deactivateStaffList)}
				>
					Deactivate
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeactivateStaff
