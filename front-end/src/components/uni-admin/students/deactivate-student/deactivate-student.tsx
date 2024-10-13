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
	deactivateList: DeactivateItem[]
}

const DeactivateStudent = ({
	isDeactivateModalOpen,
	modalCloseHandler,
	deactivateConfirmHandler,
	deactivateList,
}: Props) => {
	return (
		<Modal show={isDeactivateModalOpen} onHide={modalCloseHandler}>
			<Modal.Header closeButton>
				<Modal.Title>Deactivate Student Account</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="">
					Are you sure you want to deactive following selected student accounts?
				</div>
				<div className="">
					{deactivateList &&
						deactivateList.map((lec, index) => (
							<div key={index} className="d-flex gap-2">
								<div className="">{lec.name}</div>
								<div className="">{lec.email}</div>
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
					onClick={() => deactivateConfirmHandler(deactivateList)}
				>
					Deactivate
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeactivateStudent
