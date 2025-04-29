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
const removeEvent = (modalCloseHandler: any) => {
	toast.success('Event Removed Successfully!')
	modalCloseHandler()
}

const RemoveEvent = ({
	isRemoveModalOpen,
	modalCloseHandler,
	removeConfirmHandler,
	removeList,
}: Props) => {
	console.log('>>>>> 999999999999999')
	console.log('>>>> removeList >>>', removeList)
	return (
		<Modal show={isRemoveModalOpen} onHide={modalCloseHandler}>
			<Modal.Header closeButton>
				<Modal.Title>Remove Events</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="">
					Are you sure you want to remove the following selected events?
				</div>
				<div className="mt-3">
					{removeList &&
						removeList.map((event, index) => (
							<div key={index} className="d-flex gap-2">
								<div className="">{event.name}</div>
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
					// onClick={() => removeConfirmHandler(removeList)}
					onClick={() => removeEvent(modalCloseHandler)}
				>
					Remove
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default RemoveEvent
