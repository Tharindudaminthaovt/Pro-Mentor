import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Card, Form, Spinner } from 'react-bootstrap'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import PageHeader from '../../../../components/shared/page-header/page-header'
import { useUploadPost } from '../../../../hooks/web/posts/useUploadPost'
import { useCreatePost } from '../../../../hooks/web/posts/useCreatePost'
import { useGetPost } from '../../../../hooks/web/posts/useGetPost'
import { useEditPost } from '../../../../hooks/web/posts/useEditPost'
import { errorDisplayHandler } from '../../../../utils/errorDisplayHandler'
import { FiUpload, FiEdit2, FiX } from 'react-icons/fi'

const schema = yup.object().shape({
	description: yup.string().required('Description is required'),
})

interface FormData {
	description: string
}

const CreatePost = () => {
	const navigate = useNavigate()
	const { postId } = useParams()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	})

	const [isLoading, setIsLoading] = useState(false)
	const [selectedImage, setSelectedImage] = useState<string | null>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [isUploadingImage, setIsUploadingImage] = useState(false)

	// Hooks
	const {
		setUploadPostRequest,
		setIsRequestReady_uploadPost,
		uploadPostResponse,
		isLoading_uploadPost,
		error_uploadPost,
	} = useUploadPost()
	const {
		setCreatePostRequest,
		setIsRequestReady_createPost,
		createPostResponse,
		isLoading_createPost,
		error_createPost,
	} = useCreatePost()
	const {
		getPostResponse,
		setPostId_getPost,
		mutate_getPost,
		isLoading_getPost,
		error_getPost,
	} = useGetPost()
	const {
		setPostId_editPost,
		setIsRequestReady_editPost,
		setEditPostRequest,
		mutate_editPost,
		editPostResponse,
		isLoading_editPost,
		error_editPost,
	} = useEditPost()

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		if (!postId && !selectedImage) {
			toast.error('Image is required')
			return
		}

		if (postId) {
			setPostId_editPost(postId)
			setEditPostRequest({
				imageUrl: selectedImage || '',
				description: data.description,
			})
			setIsRequestReady_editPost(true)
			mutate_editPost()
		} else {
			setCreatePostRequest({
				imageUrl: selectedImage || '',
				description: data.description,
			})
			setIsRequestReady_createPost(true)
		}
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files && files.length > 0) {
			uploadImage(files[0])
		}
	}

	const uploadImage = (file: File) => {
		setIsUploadingImage(true)
		const formData = new FormData()
		formData.append('image', file)
		setUploadPostRequest(formData)
		setIsRequestReady_uploadPost(true)
	}

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = () => {
		setIsDragging(false)
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)
		const files = e.dataTransfer.files
		if (files && files.length > 0) {
			uploadImage(files[0])
		}
	}

	const removeImage = () => {
		setSelectedImage(null)
	}

	useEffect(() => {
		if (postId) {
			setPostId_getPost(postId)
			mutate_getPost()
		}
	}, [postId])

	useEffect(() => {
		if (getPostResponse) {
			reset({
				description: getPostResponse.description,
			})
			setSelectedImage(getPostResponse.imageUrl)
		}
	}, [getPostResponse])

	useEffect(() => {
		if (uploadPostResponse) {
			setSelectedImage(import.meta.env.VITE_CDN_URL + uploadPostResponse.path)
			setIsUploadingImage(false)
			// toast.success('Image uploaded successfully!')
			console.log('>>> Image uploaded successfully!')
		}
	}, [uploadPostResponse])

	useEffect(() => {
		if (createPostResponse) {
			toast.success('Post created successfully!')
			navigate('/')
		}
	}, [createPostResponse])

	useEffect(() => {
		if (editPostResponse) {
			toast.success('Post updated successfully!')
			navigate('/')
		}
	}, [editPostResponse])

	useEffect(() => {
		errorDisplayHandler(error_uploadPost)
		errorDisplayHandler(error_createPost)
		errorDisplayHandler(error_getPost)
		errorDisplayHandler(error_editPost)
	}, [error_uploadPost, error_createPost, error_getPost, error_editPost])

	useEffect(() => {
		if (
			isLoading_uploadPost ||
			isLoading_createPost ||
			isLoading_getPost ||
			isLoading_editPost
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_uploadPost,
		isLoading_createPost,
		isLoading_getPost,
		isLoading_editPost,
	])

	return (
		<div
			style={{
				backgroundColor: '#F8FAFC',
				minHeight: '100vh',
				padding: '24px',
			}}
		>
			<div
				style={{
					maxWidth: '800px',
					margin: '0 auto',
				}}
			>
				<PageHeader
					title={postId ? 'Edit Post' : 'Create New Post'}
					subtitle={
						postId
							? 'Update your post content'
							: 'Share your thoughts with the community'
					}
				/>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
				>
					<Card
						style={{
							border: '1px solid #F1F5F9',
							borderRadius: '16px',
							boxShadow: '0 4px 6px rgba(15, 23, 42, 0.03)',
							overflow: 'hidden',
						}}
					>
						<Card.Body style={{ padding: '32px' }}>
							<Form onSubmit={handleSubmit(onSubmit)}>
								{/* Image Upload Section */}
								<Form.Group style={{ marginBottom: '24px' }}>
									<Form.Label
										style={{
											display: 'block',
											marginBottom: '12px',
											fontWeight: '600',
											color: '#1E293B',
										}}
									>
										Post Image{' '}
										{!postId && <span style={{ color: '#DC2626' }}>*</span>}
									</Form.Label>

									{selectedImage ? (
										<div
											style={{
												position: 'relative',
												borderRadius: '12px',
												overflow: 'hidden',
												marginBottom: '16px',
											}}
										>
											<img
												src={selectedImage}
												alt="Preview"
												style={{
													width: '100%',
													maxHeight: '400px',
													objectFit: 'cover',
													borderRadius: '12px',
													border: '1px solid #E2E8F0',
												}}
											/>
											<button
												onClick={removeImage}
												style={{
													position: 'absolute',
													top: '12px',
													right: '12px',
													backgroundColor: 'rgba(15, 23, 42, 0.7)',
													color: 'white',
													border: 'none',
													borderRadius: '50%',
													width: '32px',
													height: '32px',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													cursor: 'pointer',
												}}
											>
												<FiX size={18} />
											</button>
										</div>
									) : (
										<>
											<div
												onDragOver={handleDragOver}
												onDragLeave={handleDragLeave}
												onDrop={handleDrop}
												onClick={() =>
													document.getElementById('image-upload')?.click()
												}
												style={{
													border: `2px dashed ${
														isDragging ? '#8B5CF6' : '#E2E8F0'
													}`,
													borderRadius: '12px',
													padding: '32px',
													textAlign: 'center',
													backgroundColor: isDragging ? '#F5F3FF' : '#F8FAFC',
													cursor: 'pointer',
													transition: 'all 0.2s',
												}}
											>
												{isUploadingImage ? (
													<div
														style={{
															display: 'flex',
															flexDirection: 'column',
															alignItems: 'center',
														}}
													>
														<Spinner animation="border" role="status" />
														<p style={{ marginTop: '12px', color: '#64748B' }}>
															Uploading image...
														</p>
													</div>
												) : (
													<>
														<FiUpload
															size={32}
															color={isDragging ? '#8B5CF6' : '#94A3B8'}
															style={{ marginBottom: '12px' }}
														/>
														<p
															style={{
																color: isDragging ? '#8B5CF6' : '#64748B',
																marginBottom: '8px',
																fontWeight: isDragging ? '600' : '500',
															}}
														>
															{isDragging
																? 'Drop your image here'
																: 'Click to upload or drag and drop'}
														</p>
														<small style={{ color: '#94A3B8' }}>
															JPEG, PNG (Max 5MB)
														</small>
													</>
												)}
											</div>
											<Form.Control
												type="file"
												accept="image/*"
												onChange={handleImageChange}
												style={{ display: 'none' }}
												id="image-upload"
											/>
										</>
									)}
								</Form.Group>

								{/* Description Section */}
								<Form.Group style={{ marginBottom: '32px' }}>
									<Form.Label
										style={{
											display: 'block',
											marginBottom: '12px',
											fontWeight: '600',
											color: '#1E293B',
										}}
									>
										Description <span style={{ color: '#DC2626' }}>*</span>
									</Form.Label>
									<Form.Control
										as="textarea"
										rows={5}
										{...register('description')}
										style={{
											border: errors.description
												? '1px solid #DC2626'
												: '1px solid #E2E8F0',
											borderRadius: '12px',
											padding: '16px',
											resize: 'none',
											':focus': {
												borderColor: '#8B5CF6',
												boxShadow: '0 0 0 0.25rem rgba(139, 92, 246, 0.25)',
											},
										}}
										placeholder="What's on your mind?"
										isInvalid={!!errors.description}
									/>
									{errors.description && (
										<Form.Text className="text-danger">
											{errors.description.message}
										</Form.Text>
									)}
								</Form.Group>

								{/* Submit Button */}
								<div style={{ textAlign: 'right' }}>
									<Button
										type="submit"
										disabled={isLoading || isUploadingImage}
										style={{
											background:
												'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
											border: 'none',
											borderRadius: '12px',
											padding: '12px 32px',
											fontWeight: '600',
											fontSize: '16px',
											color: '#FFFFFF',
											display: 'inline-flex',
											alignItems: 'center',
											gap: '8px',
											boxShadow: '0 2px 4px rgba(139, 92, 246, 0.2)',
											opacity: isLoading || isUploadingImage ? 0.7 : 1,
										}}
									>
										{isLoading ? (
											<>
												<Spinner
													as="span"
													animation="border"
													size="sm"
													role="status"
													aria-hidden="true"
												/>
												{postId ? 'Updating...' : 'Posting...'}
											</>
										) : (
											<>
												{postId ? (
													<>
														<FiEdit2 size={18} />
														Update Post
													</>
												) : (
													'Create Post'
												)}
											</>
										)}
									</Button>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</motion.div>
			</div>
		</div>
	)
}

export default CreatePost
