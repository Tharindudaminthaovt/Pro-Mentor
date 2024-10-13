import { Button, Modal } from "react-bootstrap"
import { CareerGuideResponse } from "../../../../hooks/web/career-guide/usePostCareerGuide"
import "./display-guide.scss"

type Props = {
	isDisplayGuide: boolean
    modalCloseHandler: () => void
    title: string,
    guides: CareerGuideResponse[]
}

const DisplayGuide = ({
    isDisplayGuide,
    modalCloseHandler,
    title,
    guides
}: Props) => {

    return (
        <>
            <Modal show={isDisplayGuide} onHide={modalCloseHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {
                            guides && guides.length > 0 
                                ?
                                (
                                    <ul>
                                        {
                                            guides.map(item => <li className={item.needToImprove ? "hilight-yellow" : ''}>{item.value}</li>)
                                        }
                                    </ul>
                                )
                                :
                                <div>No guides</div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
						<Button variant="secondary" onClick={modalCloseHandler}>
							Close
						</Button>
						<Button variant="primary" onClick={modalCloseHandler}>
							Ok
						</Button>
					</Modal.Footer>
            </Modal>
        </>
    )

}

export default DisplayGuide