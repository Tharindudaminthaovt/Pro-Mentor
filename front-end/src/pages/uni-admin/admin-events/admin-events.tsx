// /* eslint-disable react-hooks/exhaustive-deps */
// import { Button, Form, FormControl, Modal, Spinner } from 'react-bootstrap'
// import PageHeader from '../../../components/shared/page-header/page-header'
// import CustomTable from '../../../components/shared/custom-table/custom-table'
// import { useEffect, useState } from 'react'
// // import AddNewEvent from '../../../components/web/events/add-new-event/add-new-event'
// // import DeactivateEvent, {
// // 	DeactivateItem,
// // } from '../../../components/web/events/deactivate-event/deactivate-event'
// import { useCreateEvent } from '../../../hooks/web/web-events/useCreateEvent'
// import { useGetEventList } from '../../../hooks/web/web-events/useGetEventList'
// // import { useUpdateEvent } from '../../../hooks/web/web-events/useUpdateEvent'
// import { GetEventResponse, EventCreateRequest } from '@promentor-app/shared-lib'
// import { toast } from 'react-toastify'
// import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
// import { useForm } from 'react-hook-form'
// import DeactivateLecturer from '../../../components/uni-admin/lecturers/deactivate-lecturer/deactivate-lecturer'
// import RemoveEvent from '../../../components/uni-admin/admin-events/remove-event/remove-event'

// type EventItem = {
// 	id: string
// 	title: string
// 	description: string
// 	location: string
// 	mode: string
// 	createdBy: string
// 	companyName: string
// }

// const tableHeaders = [
// 	'',
// 	'Title',
// 	'Description',
// 	'Location',
// 	'Mode',
// 	'Created By',
// 	'Company',
// ]

// const AdminEvents = () => {
// 	const [isLoading, setIsLoading] = useState(false)
// 	const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
// 	const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
// 	const [deactivateList, setDeactivateList] = useState<DeactivateItem[]>([])
// 	const [eventsTableList, setEventsTableList] = useState<EventItem[]>([])
// 	const [selectedEventList, setSelectedEventList] = useState<EventItem[]>([])
// 	const { register, handleSubmit } = useForm<{ search: string }>()

// 	const {
// 		setCreateEventRequest,
// 		createEventResponse,
// 		isLoading_createEvent,
// 		isValidating_createEvent,
// 		error_createEvent,
// 		setIsRequestReady_createEvent,
// 	} = useCreateEvent()

// 	const {
// 		getEventsListResponse,
// 		isLoading_getEvents,
// 		isValidating_getEvents,
// 		error_getEvents,
// 		mutate_getEvents,
// 		setSearch_getEvents,
// 		setLocationId_getEvents,
// 		setModeId_getEvents,
// 	} = useGetEventList()

// 	// const {
// 	// 	setUpdateEventRequest,
// 	// 	updateEventResponse,
// 	// 	isLoading_updateEvent,
// 	// 	isValidating_updateEvent,
// 	// 	error_updateEvent,
// 	// 	setEventId,
// 	// 	setIsRequestReady_updateEvent,
// 	// 	mutate_updateEvent,
// 	// } = useUpdateEvent()

// 	const searchHandler = (data: { search: string }) => {
// 		if (data.search !== null && data.search !== undefined) {
// 			setSearch_getEvents(data.search)
// 			mutate_getEvents()
// 		}
// 	}

// 	const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
// 		if (event.key === 'Enter') handleSubmit(searchHandler)()
// 	}

// 	// open add new event modal
// 	const addNewHandler = () => {
// 		setIsAddNewModalOpen(true)
// 	}

// 	// open deactivate event modal
// 	const deactivateHandler = () => {
// 		deactivateListSetter(selectedEventList)
// 		setIsDeactivateModalOpen(true)
// 	}

// 	// close both add and deactivate modals
// 	const modalCloseHandler = () => {
// 		setIsAddNewModalOpen(false)
// 		setIsDeactivateModalOpen(false)
// 	}

// 	// add new event confirmed
// 	const addNewConfirmHandler = (data: EventCreateRequest) => {
// 		setCreateEventRequest(data)
// 		setIsRequestReady_createEvent(true)
// 	}

// 	// deactivate event confirmed
// 	// const deactivateConfirmHandler = (list: DeactivateItem[]) => {
// 	// 	list.forEach((item) => {
// 	// 		setEventId(item.id)
// 	// 		setUpdateEventRequest({
// 	// 			active: false,
// 	// 		})
// 	// 		setIsRequestReady_updateEvent(true)
// 	// 		mutate_updateEvent()
// 	// 	})

// 	// 	setIsDeactivateModalOpen(false)
// 	// }

// 	// convert table row data into deactivate list data
// 	const deactivateListSetter = (list: EventItem[]) => {
// 		// const dList: DeactivateItem[] = list.map((item) => {
// 		// 	return {
// 		// 		id: item.id,
// 		// 		name: item.title,
// 		// 	}
// 		// })
// 		// setDeactivateList(dList)
// 	}

// 	// convert events details response into table row data
// 	const eventsTableDataSetter = (response: GetEventResponse[]) => {
// 		const evtList: EventItem[] = response.map((item) => {
// 			return {
// 				id: item.id,
// 				title: item.title || '-',
// 				description: item.description || '-',
// 				location: item.location?.location || '-',
// 				mode: item.mode?.key || '-',
// 				createdBy: item.createdBy || '',
// 				companyName: item.companyName || '',
// 			}
// 		})
// 		setEventsTableList(evtList)
// 	}

// 	// select data row in the table
// 	const selectHandler = (item: EventItem) => {
// 		if (
// 			selectedEventList.some((selectedEvent) => selectedEvent.id === item.id)
// 		) {
// 			// If already selected, remove from list
// 			setSelectedEventList(
// 				selectedEventList.filter(
// 					(selectedEvent) => selectedEvent.id !== item.id
// 				)
// 			)
// 		} else {
// 			// If not selected, add to list
// 			setSelectedEventList([...selectedEventList, item])
// 		}
// 	}

// 	useEffect(() => {
// 		mutate_getEvents()
// 	}, [])

// 	useEffect(() => {
// 		if (createEventResponse) {
// 			toast.success('Event created successfully.')
// 			mutate_getEvents()
// 			setIsAddNewModalOpen(false)
// 		}
// 	}, [createEventResponse])

// 	useEffect(() => {
// 		if (getEventsListResponse && getEventsListResponse.length > 0) {
// 			eventsTableDataSetter(getEventsListResponse)
// 		} else if (getEventsListResponse && getEventsListResponse.length === 0) {
// 			setEventsTableList([])
// 		}
// 	}, [getEventsListResponse])

// 	// useEffect(() => {
// 	// 	if (updateEventResponse) {
// 	// 		toast.info('Selected events deactivated successfully.')
// 	// 		setSelectedEventList([])
// 	// 		setDeactivateList([])
// 	// 		mutate_getEvents()
// 	// 	}
// 	// }, [updateEventResponse])

// 	useEffect(() => {
// 		errorDisplayHandler(error_createEvent)
// 		errorDisplayHandler(error_getEvents)
// 		// errorDisplayHandler(error_updateEvent)
// 	}, [error_createEvent, error_getEvents])

// 	useEffect(() => {
// 		if (
// 			isLoading_createEvent ||
// 			isLoading_getEvents ||
// 			// isLoading_updateEvent ||
// 			isValidating_createEvent ||
// 			isValidating_getEvents
// 			// ||
// 			// isValidating_updateEvent
// 		) {
// 			setIsLoading(true)
// 		} else {
// 			setIsLoading(false)
// 		}
// 	}, [
// 		isLoading_createEvent,
// 		isLoading_getEvents,
// 		// isLoading_updateEvent,
// 		isValidating_createEvent,
// 		isValidating_getEvents,
// 		// isValidating_updateEvent,
// 	])

// 	return (
// 		<>
// 			<div className="page uni-events-page">
// 				<PageHeader title="Events">
// 					<>
// 						<Form onSubmit={handleSubmit(searchHandler)}>
// 							<FormControl
// 								type="text"
// 								placeholder="Search"
// 								className="mr-sm-2"
// 								{...register('search')}
// 								onKeyDown={keyDownHandler}
// 							/>
// 						</Form>
// 						<Button variant="primary" onClick={addNewHandler}>
// 							Add New
// 						</Button>
// 						<Button
// 							variant="primary"
// 							onClick={deactivateHandler}
// 							disabled={!(selectedEventList.length > 0)}
// 						>
// 							Remove
// 						</Button>
// 					</>
// 				</PageHeader>
// 				<div className="">
// 					<CustomTable<EventItem>
// 						tableHeaders={tableHeaders}
// 						tableData={eventsTableList}
// 						rowClickHandler={selectHandler}
// 						selectedDataRows={selectedEventList}
// 					/>
// 				</div>
// 			</div>

// 			{/* add new modal */}
// 			{/* <AddNewEvent
// 				isAddNewModalOpen={isAddNewModalOpen}
// 				modalCloseHandler={modalCloseHandler}
// 				addNewConfirmHandler={addNewConfirmHandler}
// 				isFormReset={createEventResponse ? true : false}
// 			/> */}

// 			{/* deactivate confirm modal */}
// 			<RemoveEvent
// 				isRemoveModalOpen={isDeactivateModalOpen}
// 				modalCloseHandler={modalCloseHandler}
// 				// deactivateConfirmHandler={deactivateConfirmHandler}
// 				removeList={deactivateList}
// 			/>

// 			{/* Loader overlay */}
// 			<Modal show={isLoading} backdrop="static" keyboard={false} centered>
// 				<Modal.Body className="text-center">
// 					<Spinner animation="border" role="status" />
// 				</Modal.Body>
// 			</Modal>
// 		</>
// 	)
// }

// export default AdminEvents

/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl, Modal, Spinner } from 'react-bootstrap'
import PageHeader from '../../../components/shared/page-header/page-header'
import CustomTable from '../../../components/shared/custom-table/custom-table'
import { useEffect, useState } from 'react'
// import AddNewEvent from '../../../components/web/events/add-new-event/add-new-event'
import { useCreateEvent } from '../../../hooks/web/web-events/useCreateEvent'
import { useGetEventList } from '../../../hooks/web/web-events/useGetEventList'
import { GetEventResponse, EventCreateRequest } from '@promentor-app/shared-lib'
import { toast } from 'react-toastify'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import { useForm } from 'react-hook-form'
import RemoveEvent from '../../../components/uni-admin/admin-events/remove-event/remove-event'

type EventItem = {
	id: string
	title: string
	description: string
	location: string
	mode: string
	createdBy: string
	companyName: string
}

const tableHeaders = [
	'',
	'Title',
	'Description',
	'Location',
	'Mode',
	'Created By',
	'Company',
]

const AdminEvents = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
	const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
	const [removeList, setRemoveList] = useState<{ id: string; name: string }[]>(
		[]
	)
	const [eventsTableList, setEventsTableList] = useState<EventItem[]>([])
	const [selectedEventList, setSelectedEventList] = useState<EventItem[]>([])
	const { register, handleSubmit } = useForm<{ search: string }>()

	const {
		setCreateEventRequest,
		createEventResponse,
		isLoading_createEvent,
		isValidating_createEvent,
		error_createEvent,
		setIsRequestReady_createEvent,
	} = useCreateEvent()

	const {
		getEventsListResponse,
		isLoading_getEvents,
		isValidating_getEvents,
		error_getEvents,
		mutate_getEvents,
		setSearch_getEvents,
	} = useGetEventList()

	const searchHandler = (data: { search: string }) => {
		if (data.search !== null && data.search !== undefined) {
			setSearch_getEvents(data.search)
			mutate_getEvents()
		}
	}

	const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') handleSubmit(searchHandler)()
	}

	// open add new event modal
	const addNewHandler = () => {
		setIsAddNewModalOpen(true)
	}

	// open remove event modal
	const removeHandler = () => {
		removeListSetter(selectedEventList)
		setIsRemoveModalOpen(true)
	}

	// close both add and remove modals
	const modalCloseHandler = () => {
		setIsAddNewModalOpen(false)
		setIsRemoveModalOpen(false)
	}

	// add new event confirmed
	const addNewConfirmHandler = (data: EventCreateRequest) => {
		setCreateEventRequest(data)
		setIsRequestReady_createEvent(true)
	}

	// remove event confirmed
	const removeConfirmHandler = (list: { id: string; name: string }[]) => {
		// TODO: Implement event removal logic
		console.log('Events to remove:', list)
		setIsRemoveModalOpen(false)
		setSelectedEventList([])
		setRemoveList([])
		mutate_getEvents()
	}

	// convert selected events into remove list
	const removeListSetter = (list: EventItem[]) => {
		const rList = list.map((item) => {
			return {
				id: item.id,
				name: item.title,
			}
		})
		setRemoveList(rList)
	}

	// convert events details response into table row data
	const eventsTableDataSetter = (response: GetEventResponse[]) => {
		const eventList: EventItem[] = response.map((item) => {
			return {
				id: item.id,
				title: item.title || '-',
				description: item.description || '-',
				location: item.location?.location || '-',
				mode: item.mode?.key || '-',
				createdBy: item.createdBy || '',
				companyName: item.companyName || '',
			}
		})
		setEventsTableList(eventList)
	}

	// select data row in the table
	const selectHandler = (item: EventItem) => {
		if (selectedEventList.some((selected) => selected.id === item.id)) {
			setSelectedEventList(
				selectedEventList.filter((selected) => selected.id !== item.id)
			)
		} else {
			setSelectedEventList([...selectedEventList, item])
		}
	}

	useEffect(() => {
		mutate_getEvents()
	}, [])

	useEffect(() => {
		if (createEventResponse) {
			toast.success('Event created successfully.')
			mutate_getEvents()
			setIsAddNewModalOpen(false)
		}
	}, [createEventResponse])

	useEffect(() => {
		if (getEventsListResponse && getEventsListResponse.length > 0) {
			eventsTableDataSetter(getEventsListResponse)
		} else if (getEventsListResponse && getEventsListResponse.length === 0) {
			setEventsTableList([])
		}
	}, [getEventsListResponse])

	useEffect(() => {
		errorDisplayHandler(error_createEvent)
		errorDisplayHandler(error_getEvents)
	}, [error_createEvent, error_getEvents])

	useEffect(() => {
		if (
			isLoading_createEvent ||
			isLoading_getEvents ||
			isValidating_createEvent ||
			isValidating_getEvents
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_createEvent,
		isLoading_getEvents,
		isValidating_createEvent,
		isValidating_getEvents,
	])

	return (
		<>
			<div className="page uni-events-page">
				<PageHeader title="Events">
					<>
						<Form onSubmit={handleSubmit(searchHandler)}>
							<FormControl
								type="text"
								placeholder="Search"
								className="mr-sm-2"
								{...register('search')}
								onKeyDown={keyDownHandler}
							/>
						</Form>
						<Button variant="primary" onClick={addNewHandler}>
							Add New
						</Button>
						<Button
							variant="primary"
							onClick={removeHandler}
							disabled={!(selectedEventList.length > 0)}
						>
							Remove
						</Button>
					</>
				</PageHeader>
				<div className="">
					<CustomTable<EventItem>
						tableHeaders={tableHeaders}
						tableData={eventsTableList}
						rowClickHandler={selectHandler}
						selectedDataRows={selectedEventList}
					/>
				</div>
			</div>

			{/* TODO: Add New Event modal component */}
			{/* <AddNewEvent
        isAddNewModalOpen={isAddNewModalOpen}
        modalCloseHandler={modalCloseHandler}
        addNewConfirmHandler={addNewConfirmHandler}
        isFormReset={createEventResponse ? true : false}
      /> */}

			{/* Remove confirm modal */}
			<RemoveEvent
				isRemoveModalOpen={isRemoveModalOpen}
				modalCloseHandler={modalCloseHandler}
				removeConfirmHandler={removeConfirmHandler}
				removeList={removeList}
			/>

			{/* Loader overlay */}
			<Modal show={isLoading} backdrop="static" keyboard={false} centered>
				<Modal.Body className="text-center">
					<Spinner animation="border" role="status" />
				</Modal.Body>
			</Modal>
		</>
	)
}

export default AdminEvents
