import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'

export type RemoveItem = {
	name: string
	id: string
}

type Props = {
	isRemoveModalOpen: boolean
	modalCloseHandler: () => void
	removeConfirmHandler: (list: RemoveItem[]) => void
	removeList: RemoveItem[]
}

const removeJob = (modalCloseHandler: () => void) => {
	toast.success('Job Removed Successfully!')
	modalCloseHandler()
}

const RemoveJob = ({
	isRemoveModalOpen,
	modalCloseHandler,
	removeConfirmHandler,
	removeList,
}: Props) => {
	return (
		<Modal show={isRemoveModalOpen} onHide={modalCloseHandler}>
			<Modal.Header closeButton>
				<Modal.Title>Remove Jobs</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="">
					Are you sure you want to remove the following selected jobs?
				</div>
				<div className="mt-3">
					{removeList &&
						removeList.map((job, index) => (
							<div key={index} className="d-flex gap-2">
								<div className="">{job.name}</div>
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
					onClick={() => removeJob(modalCloseHandler)}
					// Alternatively, you can use:
					// onClick={() => removeConfirmHandler(removeList)}
				>
					Remove
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default RemoveJob
