/* eslint-disable react-hooks/exhaustive-deps */
import PageHeader from '../../../../components/shared/page-header/page-header'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUploadPost } from '../../../../hooks/web/posts/useUploadPost'
import { useEffect, useState } from 'react'
import { errorDisplayHandler } from '../../../../utils/errorDisplayHandler'
import './create-post.scss'
import { useCreatePost } from '../../../../hooks/web/posts/useCreatePost'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPost } from '../../../../hooks/web/posts/useGetPost'
import { useEditPost } from '../../../../hooks/web/posts/useEditPost'

// Define validation schema
// const schema = yup.object().shape({
// 	image: yup.mixed().test('required', 'Image is required', (value) => {
// 		// Ensure value is a FileList and has at least one file
// 		return value instanceof FileList && value.length > 0
// 	}),
// 	// image: yup.mixed().when('postId', {
// 	// 	is: (postId: string | undefined) => !postId, // Only require image if postId does not exist
// 	// 	then: yup.mixed().test('required', 'Image is required', (value) => {
// 	// 		// Ensure value is a FileList and has at least one file
// 	// 		return value instanceof FileList && value.length > 0
// 	// 	}),
// 	// }),
// 	description: yup.string().required('Description is required'),
// })

// Define validation schema
const baseSchema = yup.object().shape({
	description: yup.string().required('Description is required'),
})

const imageRequiredSchema = yup.object().shape({
	image: yup.mixed().test('required', 'Image is required', (value) => {
		// Ensure value is a FileList and has at least one file
		return value instanceof FileList && value.length > 0
	}),
})

interface PostFormData {
	image: FileList
	description: string
}

interface PostFormErrors extends FieldErrors<PostFormData> {
	image?: {
		type: string
		message: string
	}
}

const CreatePost = () => {
	const navigate = useNavigate()
	const { postId } = useParams()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		// errors,
	} = useForm<PostFormData | { description: string }, PostFormErrors>({
		// resolver: yupResolver(schema) as any,
		resolver: yupResolver(
			!postId ? baseSchema.concat(imageRequiredSchema) : baseSchema
		),
	})
	const [isLoading, setIsLoading] = useState(false)
	const [selectedImage, setSelectedImage] = useState<string | null>(null)

	// Manually check if the 'image' field has an error
	const hasImageError = 'image' in errors

	const {
		setUploadPostRequest,
		setIsRequestReady_uploadPost,
		uploadPostResponse,
		isLoading_uploadPost,
		isValidating_uploadPost,
		error_uploadPost,
	} = useUploadPost()
	const {
		setCreatePostRequest,
		setIsRequestReady_createPost,
		createPostResponse,
		isLoading_createPost,
		isValidating_createPost,
		error_createPost,
	} = useCreatePost()
	const {
		isLoading_getPost,
		isValidating_getPost,
		error_getPost,
		getPostResponse,
		setPostId_getPost,
		mutate_getPost,
	} = useGetPost()
	const {
		isLoading_editPost,
		isValidating_editPost,
		error_editPost,
		setIsRequestReady_editPost,
		setEditPostRequest,
		setPostId_editPost,
		mutate_editPost,
		editPostResponse,
	} = useEditPost()

	const onSubmit: SubmitHandler<
		PostFormData | { description: string }
	> = async (data) => {
		console.log(postId)

		if (postId) {
			console.log(data)
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
			const formData = new FormData()
			formData.append('image', files[0])
			setUploadPostRequest(formData)
			setIsRequestReady_uploadPost(true)
		}
	}

	useEffect(() => {
		console.log(postId)
		if (postId) {
			// get post details to edit
			setPostId_getPost(postId)
			mutate_getPost()
		}
	}, [])

	useEffect(() => {
		if (getPostResponse) {
			reset({
				description: getPostResponse.description,
				image: undefined,
			})
			setSelectedImage(getPostResponse.imageUrl)
		}
	}, [getPostResponse])

	useEffect(() => {
		if (uploadPostResponse) {
			setSelectedImage(import.meta.env.VITE_CDN_URL + uploadPostResponse.path)
			toast.success('Post image uploaded!')
		}
	}, [uploadPostResponse])

	useEffect(() => {
		if (createPostResponse) {
			console.log(createPostResponse)
			toast.success('Post created successfully!')
			navigate('/')
		}
	}, [createPostResponse])

	useEffect(() => {
		if (editPostResponse) {
			console.log(editPostResponse)
			toast.success('Post updated successfully!')
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
			isValidating_uploadPost ||
			isLoading_createPost ||
			isValidating_createPost ||
			isLoading_getPost ||
			isValidating_getPost ||
			isLoading_editPost ||
			isValidating_editPost
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_uploadPost,
		isValidating_uploadPost,
		isLoading_createPost,
		isValidating_createPost,
		isLoading_getPost,
		isValidating_getPost,
		isLoading_editPost,
		isValidating_editPost,
	])

	return (
		<>
			<div className="page create-post-page">
				<PageHeader title={postId ? 'Edit Post' : 'Create a Post'}></PageHeader>
				<div className="cont">
					<Form onSubmit={handleSubmit(onSubmit)} className="form">
						{selectedImage !== null && (
							<img
								src={selectedImage}
								alt="uploaded-image"
								className="uploaded-image"
							/>
						)}

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="file"
								{...register('image')}
								onChange={handleImageChange}
							/>
							{!postId && hasImageError && (
								<Form.Text className="text-danger">
									{errors?.image?.message}
								</Form.Text>
							)}
						</Form.Group>

						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" {...register('description')} />
							{errors.description && (
								<Form.Text className="text-danger">
									{errors.description.message}
								</Form.Text>
							)}
						</Form.Group>

						<Button variant="primary" type="submit">
							{postId ? 'Save' : 'Submit'}
						</Button>
					</Form>
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

export default CreatePost
