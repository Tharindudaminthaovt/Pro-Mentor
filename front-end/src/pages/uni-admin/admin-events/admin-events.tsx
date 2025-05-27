import { Button, Form, Modal, Spinner } from 'react-bootstrap'
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
import { FiSearch, FiPlus, FiTrash2 } from 'react-icons/fi'

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

	// Custom hooks for API calls
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

	// Styles
	const styles = {
		page: {
			padding: '24px',
			backgroundColor: '#f8f9fa',
			minHeight: 'calc(100vh - 56px)',
		},
		headerContainer: {
			background: 'white',
			borderRadius: '12px',
			padding: '24px',
			marginBottom: '24px',
			boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
		},
		headerActions: {
			display: 'flex',
			alignItems: 'center',
			gap: '16px',
			width: '100%',
		},
		searchForm: {
			flexGrow: 1,
		},
		searchInputContainer: {
			position: 'relative',
			display: 'flex',
			alignItems: 'center',
		},
		searchIcon: {
			position: 'absolute',
			left: '12px',
			color: '#6c757d',
		},
		searchInput: {
			paddingLeft: '40px',
			borderRadius: '8px',
			border: '1px solid #e9ecef',
			height: '40px',
		},
		actionButtons: {
			display: 'flex',
			gap: '12px',
		},
		actionButton: {
			display: 'flex',
			alignItems: 'center',
			gap: '8px',
			padding: '8px 16px',
			borderRadius: '8px',
			fontWeight: '500',
		},
		tableContainer: {
			background: 'white',
			borderRadius: '12px',
			padding: '24px',
			boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
		},
		loadingModal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		loadingContent: {
			background: 'rgba(255, 255, 255, 0.9)',
			border: 'none',
			padding: '32px',
			borderRadius: '12px',
			textAlign: 'center' as const,
		},
		loadingText: {
			marginTop: '16px',
			color: '#111827',
			fontWeight: '500',
		},
	}

	const searchHandler = (data: { search: string }) => {
		if (data.search !== null && data.search !== undefined) {
			setSearch_getEvents(data.search)
			mutate_getEvents()
		}
	}

	const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') handleSubmit(searchHandler)()
	}

	// Event handlers
	const addNewHandler = () => setIsAddNewModalOpen(true)
	const removeHandler = () => {
		removeListSetter(selectedEventList)
		setIsRemoveModalOpen(true)
	}

	const modalCloseHandler = () => {
		setIsAddNewModalOpen(false)
		setIsRemoveModalOpen(false)
	}

	const addNewConfirmHandler = (data: EventCreateRequest) => {
		setCreateEventRequest(data)
		setIsRequestReady_createEvent(true)
	}

	const removeConfirmHandler = (list: { id: string; name: string }[]) => {
		// TODO: Implement actual removal logic
		console.log('Events to remove:', list)
		setIsRemoveModalOpen(false)
		setSelectedEventList([])
		setRemoveList([])
		mutate_getEvents()
	}

	const removeListSetter = (list: EventItem[]) => {
		setRemoveList(list.map((item) => ({ id: item.id, name: item.title })))
	}

	const eventsTableDataSetter = (response: GetEventResponse[]) => {
		setEventsTableList(
			response.map((item) => ({
				id: item.id,
				title: item.title || '-',
				description: item.description || '-',
				location: item.location?.location || '-',
				mode: item.mode?.key || '-',
				createdBy: item.createdBy || '',
				companyName: item.companyName || '',
			}))
		)
	}

	const selectHandler = (item: EventItem) => {
		setSelectedEventList((prev) =>
			prev.some((selected) => selected.id === item.id)
				? prev.filter((selected) => selected.id !== item.id)
				: [...prev, item]
		)
	}

	// Effects
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
		if (getEventsListResponse) {
			eventsTableDataSetter(getEventsListResponse)
		}
	}, [getEventsListResponse])

	useEffect(() => {
		errorDisplayHandler(error_createEvent)
		errorDisplayHandler(error_getEvents)
	}, [error_createEvent, error_getEvents])

	useEffect(() => {
		setIsLoading(
			isLoading_createEvent ||
				isLoading_getEvents ||
				isValidating_createEvent ||
				isValidating_getEvents
		)
	}, [
		isLoading_createEvent,
		isLoading_getEvents,
		isValidating_createEvent,
		isValidating_getEvents,
	])

	return (
		<div style={styles.page}>
			<div style={styles.headerContainer}>
				<PageHeader title="Events">
					<div style={styles.headerActions}>
						<Form
							onSubmit={handleSubmit(searchHandler)}
							style={styles.searchForm}
						>
							<div style={styles.searchInputContainer}>
								<FiSearch style={styles.searchIcon} />
								<Form.Control
									type="text"
									placeholder="Search events..."
									{...register('search')}
									onKeyDown={keyDownHandler}
									style={styles.searchInput}
								/>
							</div>
						</Form>
						<div style={styles.actionButtons}>
							<Button
								variant="primary"
								onClick={addNewHandler}
								style={styles.actionButton}
							>
								<FiPlus style={{ fontSize: '16px' }} />
								Add New
							</Button>
							<Button
								variant="outline-danger"
								onClick={removeHandler}
								disabled={!selectedEventList.length}
								style={styles.actionButton}
							>
								<FiTrash2 style={{ fontSize: '16px' }} />
								Remove
							</Button>
						</div>
					</div>
				</PageHeader>
			</div>

			<div style={styles.tableContainer}>
				<CustomTable<EventItem>
					tableHeaders={tableHeaders}
					tableData={eventsTableList}
					rowClickHandler={selectHandler}
					selectedDataRows={selectedEventList}
				/>
			</div>

			{/* Add New Event Modal */}
			{/* <AddNewEvent
				isAddNewModalOpen={isAddNewModalOpen}
				modalCloseHandler={modalCloseHandler}
				addNewConfirmHandler={addNewConfirmHandler}
				isFormReset={!!createEventResponse}
			/> */}

			{/* Remove Event Confirmation Modal */}
			<RemoveEvent
				isRemoveModalOpen={isRemoveModalOpen}
				modalCloseHandler={modalCloseHandler}
				removeConfirmHandler={removeConfirmHandler}
				removeList={removeList}
			/>

			{/* Loading Modal */}
			<Modal
				show={isLoading}
				backdrop="static"
				keyboard={false}
				centered
				style={styles.loadingModal}
			>
				<Modal.Body style={styles.loadingContent}>
					<Spinner animation="border" role="status" variant="primary" />
					<p style={styles.loadingText}>Loading events...</p>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default AdminEvents
