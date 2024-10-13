/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Modal, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './web-dashboard.scss'
import { useGetPostsList } from '../../../hooks/web/posts/useGetPostsList'
import { useEffect, useState } from 'react'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import PostsList from '../../../components/web/posts/posts-list/posts-list'
import JobsItem from '../../../components/web/jobs/jobs-item/jobs-item'
import {
	GetJobListResponse,
	useGetJobList,
} from '../../../hooks/web/jobs/useGetJobList'

const WebDashboard = () => {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const {
		getPostsListResponse,
		isLoading_getPostsList,
		isValidating_getPostsList,
		error_getPostsList,
		mutate_getPostsList,
	} = useGetPostsList()
	const {
		isLoading_getJobs,
		isValidating_getJobs,
		error_getJobs,
		mutate_getJobs,
		getJobsListResponse,
		setSize_getJobs,
	} = useGetJobList()

	const jobSelectHandler = (job: GetJobListResponse) => {
		navigate('/jobs/' + job.id)
	}

	useEffect(() => {
		setSize_getJobs('3')
		mutate_getJobs()
		mutate_getPostsList()
	}, [])

	useEffect(() => {
		if (
			isLoading_getPostsList ||
			isValidating_getPostsList ||
			isLoading_getJobs ||
			isValidating_getJobs
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_getPostsList,
		isValidating_getPostsList,
		isLoading_getJobs,
		isValidating_getJobs,
	])

	useEffect(() => {
		errorDisplayHandler(error_getPostsList)
		errorDisplayHandler(error_getJobs)
	}, [error_getPostsList, error_getJobs])

	return (
		<>
			<div className="page web-dashboard-page">
				<div className="col1">
					{getPostsListResponse && getPostsListResponse.length > 0 && (
						<PostsList
							list={getPostsListResponse}
							mutateList={mutate_getPostsList}
						/>
					)}

					{getPostsListResponse && getPostsListResponse.length === 0 && (
						<div className="">No Posts Found!</div>
					)}
				</div>
				<div className="col2">
					<div className="col2-container">
						<Container className="create-btn-container">
							<Button onClick={() => navigate('/create-post')}>
								Create a Post
							</Button>
						</Container>

						<div className="latest-container">
							<div className="title-header">
								<div className="title">Latest Events</div>
								<div className="see-more" onClick={() => navigate('/events')}>
									see more &gt;&gt;&gt;
								</div>
							</div>
							<div className="div">
								{getJobsListResponse &&
									getJobsListResponse.map((job) => {
										return (
											<JobsItem
												item={job}
												key={job.id}
												setSelectedJob={jobSelectHandler}
											/>
										)
									})}
							</div>
						</div>
						<div className="latest-container">
							<div className="title-header">
								<div className="title">Latest Jobs</div>
								<div className="see-more" onClick={() => navigate('/jobs')}>
									see more &gt;&gt;&gt;
								</div>
							</div>
							<div className="div">
								{getJobsListResponse &&
									getJobsListResponse.map((job) => {
										return (
											<JobsItem
												item={job}
												key={job.id}
												setSelectedJob={jobSelectHandler}
											/>
										)
									})}
							</div>
						</div>
					</div>
				</div>
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

export default WebDashboard
