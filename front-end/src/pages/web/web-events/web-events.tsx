/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Button, Form, FormControl, Modal, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import {
	GetModeListResponse,
	useGetModeList,
} from '../../../hooks/web/web-events/useGetModeList'
import { useGetEvent } from '../../../hooks/web/web-events/useGetEvent'
import {
	GetEventListResponse,
	useGetEventList,
} from '../../../hooks/web/web-events/useGetEventList'
import EventsItem from '../../../components/web/web-events/events-item/events-item'
import EventsDetailItem from '../../../components/web/web-events/events-detail-item/events-detail-item'
import './web-events.scss'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import {
	GetLocationListResponse,
	useGetLocationList,
} from '../../../hooks/web/jobs/useGetLocationList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-dropdown-select'

interface FormData {
	search?: string
	selectedModes?: GetModeListResponse[]
	selectedLocations?: GetLocationListResponse[]
}

const WebEvents = () => {
	const { eventId } = useParams()
	const navigate = useNavigate()
	const { handleSubmit, register, setValue } = useForm<FormData>({
		resolver: undefined,
	})
	const [isLoading, setIsLoading] = useState(false)
	const [manuallySelected, setManuallySelected] = useState(false)
	const [filtered, setFiltered] = useState(false)
	const [selectedEvent, setSelectedEvent] = useState<GetEventListResponse>()
	const [locationList, setLocationList] = useState<GetLocationListResponse[]>(
		[]
	)
	const [modeList, setModeList] = useState<GetModeListResponse[]>([])

	const {
		isLoading_getEvent,
		isValidating_getEvent,
		error_getEvent,
		getEventResponse,
		setEventId_getEvent,
		mutate_getEvent,
	} = useGetEvent()
	const {
		isLoading_getEvents,
		isValidating_getEvents,
		error_getEvents,
		getEventsListResponse,
		mutate_getEvents,
		setLocationId_getEvents,
		setModeId_getEvents,
		setSearch_getEvents,
	} = useGetEventList()
	const {
		isLoading_getLocations,
		isValidating_getLocations,
		error_getLocations,
		mutate_getLocations,
		getLocationsListResponse,
	} = useGetLocationList()
	const {
		isLoading_getMode,
		isValidating_getMode,
		error_getMode,
		mutate_getMode,
		getModeListResponse,
	} = useGetModeList()

	const eventItemSelectHandler = (item: GetEventListResponse) => {
		setManuallySelected(true)
		setFiltered(false)
		setSelectedEvent(item)
		navigate(`/events/${item.id}`)
	}

	const filterSubmitHandler = (data: FormData) => {
		// console.log(data)
		setFiltered(true)
		setManuallySelected(false)
		setLocationId_getEvents(data.selectedLocations?.map((x) => x.id) || [''])
		setModeId_getEvents(data.selectedModes?.map((x) => x.id) || [''])
		setSearch_getEvents(data?.search || '')

		// console.log('send filters ===>')
		mutate_getEvents()
	}

	useEffect(() => {
		mutate_getEvents()
		mutate_getLocations()
		mutate_getMode()
	}, [])

	useEffect(() => {
		if (eventId) {
			// console.log('got event id')
			setEventId_getEvent(eventId)
			mutate_getEvent()
		}
	}, [eventId])

	useEffect(() => {
		if (getEventResponse && !manuallySelected) {
			// console.log('got data ===>')
			setSelectedEvent(getEventResponse)
		}
	}, [getEventResponse])

	useEffect(() => {
		if (getEventsListResponse && getEventsListResponse.length === 0) {
			return
		}
		if (getEventsListResponse && filtered) {
			eventItemSelectHandler(getEventsListResponse[0])
		}
		if (getEventsListResponse && !eventId) {
			setSelectedEvent(getEventsListResponse[0])
			navigate(`/events/${getEventsListResponse[0].id}`)
		}
	}, [getEventsListResponse])

	useEffect(() => {
		setModeList(getModeListResponse || [])
	}, [getModeListResponse])

	useEffect(() => {
		setLocationList(getLocationsListResponse || [])
	}, [getLocationsListResponse])

	useEffect(() => {
		if (
			isLoading_getEvent ||
			isLoading_getEvents ||
			isLoading_getLocations ||
			isLoading_getMode ||
			isValidating_getEvent ||
			isValidating_getEvents ||
			isValidating_getLocations ||
			isValidating_getMode
		) {
			setIsLoading(true)
		} else setIsLoading(false)
	}, [
		isLoading_getEvent,
		isLoading_getEvents,
		isLoading_getLocations,
		isLoading_getMode,
		isValidating_getEvent,
		isValidating_getEvents,
		isValidating_getLocations,
		isValidating_getMode,
	])

	useEffect(() => {
		errorDisplayHandler(error_getEvent)
		errorDisplayHandler(error_getEvents)
		errorDisplayHandler(error_getLocations)
		errorDisplayHandler(error_getMode)
	}, [error_getEvent, error_getEvents, error_getLocations, error_getMode])

	return (
		<>
			<div className="page events-page">
				<Form className="top-row" onSubmit={handleSubmit(filterSubmitHandler)}>
					<Form.Group className="filter">
						<Form.Label>Search</Form.Label>
						<FormControl
							type="text"
							placeholder="Search"
							className="mr-sm-2"
							{...register('search')}
						/>
					</Form.Group>

					<Form.Group className="filter">
						<Form.Label>Mode</Form.Label>
						{modeList && (
							<Select
								options={modeList.map((type) => ({
									value: type.id,
									label: type.key,
								}))}
								values={[]}
								name="select"
								multi
								onChange={(val) => {
									setValue(
										'selectedModes',
										val.map((v) => ({
											id: v.value,
											key: v.label,
										}))
									)
								}}
								clearable
							/>
						)}
					</Form.Group>

					<Form.Group className="filter">
						<Form.Label>Location</Form.Label>
						{locationList && (
							<Select
								options={locationList.map((type) => ({
									value: type.id,
									label: type.location,
								}))}
								values={[]}
								name="select"
								multi
								onChange={(val) => {
									setValue(
										'selectedLocations',
										val.map((v) => ({
											id: v.value,
											location: v.label,
										}))
									)
								}}
								clearable
							/>
						)}
					</Form.Group>

					<button className="filter-btn" type="submit">
						<FontAwesomeIcon
							icon={faFilter}
							className="px-2"
							style={{ color: '#35314e' }}
							fontSize={18}
						/>
					</button>

					<Button
						className="create-btn"
						onClick={() => navigate('/create-event')}
					>
						Create Event
					</Button>
				</Form>
				<div className=""></div>

				{getEventsListResponse && getEventsListResponse.length > 0 ? (
					<div className="content">
						<div className="latest-list">
							{getEventsListResponse &&
								getEventsListResponse.map((event) => {
									return (
										<EventsItem
											item={event}
											setSelectedEvent={eventItemSelectHandler}
											key={event.id}
										/>
									)
								})}
						</div>

						{selectedEvent && <EventsDetailItem eventDetails={selectedEvent} />}
					</div>
				) : (
					<div className="no-data">No Data Found</div>
				)}
			</div>

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

export default WebEvents
