import { Button, Modal } from 'react-bootstrap'

type Props = {
	deleteConfirmHandler: () => void
	isDeleteModalOpen: boolean
	modalCloseHandler: () => void
}

function PostDelete({
	deleteConfirmHandler,
	isDeleteModalOpen,
	modalCloseHandler,
}: Props) {
	return (
		<Modal show={isDeleteModalOpen} onHide={modalCloseHandler}>
			{/* <Modal.Header closeButton>
				<Modal.Title>Delete Staff Account</Modal.Title>
			</Modal.Header> */}
			<Modal.Body>
				<div className="">Are you sure you want to delete this post?</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={modalCloseHandler}>
					Cancel
				</Button>
				<Button variant="primary" onClick={() => deleteConfirmHandler()}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default PostDelete
