/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl, Modal, Spinner } from 'react-bootstrap'
import PageHeader from '../../../components/shared/page-header/page-header'
import CustomTable from '../../../components/shared/custom-table/custom-table'
import { useEffect, useState } from 'react'
import { useCreateJob } from '../../../hooks/web/jobs/useCreateJob'
import { useGetJobList } from '../../../hooks/web/jobs/useGetJobList'
import { GetJobResponse, JobCreateRequest } from '@promentor-app/shared-lib'
import { toast } from 'react-toastify'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import { useForm } from 'react-hook-form'
import RemoveJob from '../../../components/uni-admin/admin-jobs/remove-job/remove-job'
// import RemoveJob from '../../../components/uni-admin/admin-jobs/remove-job/remove-job'

type JobItem = {
	id: string
	title: string
	description: string
	location: string
	modality: string
	type: string
	createdBy: string
	companyName: string
}

const tableHeaders = [
	'',
	'Title',
	'Description',
	'Location',
	'Modality',
	'Type',
	'Created By',
	'Company',
]

const AdminJobs = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
	const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
	const [removeList, setRemoveList] = useState<{ id: string; name: string }[]>(
		[]
	)
	const [jobsTableList, setJobsTableList] = useState<JobItem[]>([])
	const [selectedJobList, setSelectedJobList] = useState<JobItem[]>([])
	const { register, handleSubmit } = useForm<{ search: string }>()

	const {
		setCreateJobRequest,
		createJobResponse,
		isLoading_createJob,
		isValidating_createJob,
		error_createJob,
		setIsRequestReady_createJob,
	} = useCreateJob()

	const {
		isLoading_getJobs,
		isValidating_getJobs,
		error_getJobs,
		setLocationId_getJobs,
		setSearch_getJobs,
		setModalityId_getJobs,
		setTypeId_getJobs,
		mutate_getJobs,
		getJobsListResponse,
	} = useGetJobList()

	const searchHandler = (data: { search: string }) => {
		if (data.search !== null && data.search !== undefined) {
			setSearch_getJobs(data.search)
			mutate_getJobs()
		}
	}

	const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') handleSubmit(searchHandler)()
	}

	// open add new job modal
	const addNewHandler = () => {
		setIsAddNewModalOpen(true)
	}

	// open remove job modal
	const removeHandler = () => {
		removeListSetter(selectedJobList)
		setIsRemoveModalOpen(true)
	}

	// close both add and remove modals
	const modalCloseHandler = () => {
		setIsAddNewModalOpen(false)
		setIsRemoveModalOpen(false)
	}

	// add new job confirmed
	const addNewConfirmHandler = (data: JobCreateRequest) => {
		setCreateJobRequest(data)
		setIsRequestReady_createJob(true)
	}

	// remove job confirmed
	const removeConfirmHandler = (list: { id: string; name: string }[]) => {
		// TODO: Implement job removal logic
		console.log('Jobs to remove:', list)
		setIsRemoveModalOpen(false)
		setSelectedJobList([])
		setRemoveList([])
		mutate_getJobs()
	}

	// convert table row data into remove list data
	const removeListSetter = (list: JobItem[]) => {
		const rList = list.map((item) => {
			return {
				id: item.id,
				name: item.title,
			}
		})
		setRemoveList(rList)
	}

	// convert jobs details response into table row data
	const jobsTableDataSetter = (response: GetJobResponse[]) => {
		const jobList: JobItem[] = response.map((item) => {
			return {
				id: item.id,
				title: item.title || '-',
				description: item.description || '-',
				location: item.location?.location || '-',
				modality: item.modality?.key || '-',
				type: item.type?.key || '-',
				createdBy: item.createdBy || '',
				companyName: item.companyName || '',
			}
		})
		setJobsTableList(jobList)
	}

	// select data row in the table
	const selectHandler = (item: JobItem) => {
		if (selectedJobList.some((selectedJob) => selectedJob.id === item.id)) {
			// If already selected, remove from list
			setSelectedJobList(
				selectedJobList.filter((selectedJob) => selectedJob.id !== item.id)
			)
		} else {
			// If not selected, add to list
			setSelectedJobList([...selectedJobList, item])
		}
	}

	useEffect(() => {
		mutate_getJobs()
	}, [])

	useEffect(() => {
		if (createJobResponse) {
			toast.success('Job created successfully.')
			mutate_getJobs()
			setIsAddNewModalOpen(false)
		}
	}, [createJobResponse])

	useEffect(() => {
		if (getJobsListResponse && getJobsListResponse.length > 0) {
			jobsTableDataSetter(getJobsListResponse)
		} else if (getJobsListResponse && getJobsListResponse.length === 0) {
			setJobsTableList([])
		}
	}, [getJobsListResponse])

	useEffect(() => {
		errorDisplayHandler(error_createJob)
		errorDisplayHandler(error_getJobs)
	}, [error_createJob, error_getJobs])

	useEffect(() => {
		if (
			isLoading_createJob ||
			isLoading_getJobs ||
			isValidating_createJob ||
			isValidating_getJobs
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_createJob,
		isLoading_getJobs,
		isValidating_createJob,
		isValidating_getJobs,
	])

	return (
		<>
			<div className="page uni-jobs-page">
				<PageHeader title="Jobs">
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
							disabled={!(selectedJobList.length > 0)}
						>
							Remove
						</Button>
					</>
				</PageHeader>
				<div className="">
					<CustomTable<JobItem>
						tableHeaders={tableHeaders}
						tableData={jobsTableList}
						rowClickHandler={selectHandler}
						selectedDataRows={selectedJobList}
					/>
				</div>
			</div>

			{/* TODO: Add New Job modal component */}
			{/* <AddNewJob
        isAddNewModalOpen={isAddNewModalOpen}
        modalCloseHandler={modalCloseHandler}
        addNewConfirmHandler={addNewConfirmHandler}
        isFormReset={createJobResponse ? true : false}
      /> */}

			{/* Remove confirm modal */}
			<RemoveJob
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

export default AdminJobs
