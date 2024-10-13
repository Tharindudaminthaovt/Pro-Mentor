import { GetPostsListResponse } from '../../../../hooks/web/posts/useGetPostsList'
import PostItem from '../post-item/post-item'

type Props = {
	list: GetPostsListResponse[]
	mutateList: () => Promise<GetPostsListResponse[] | undefined>
}

function PostsList({ list, mutateList }: Props) {
	return (
		<div className="">
			{list &&
				list.length > 0 &&
				list.map((post) => {
					return (
						<PostItem key={post.id} postItem={post} mutateList={mutateList} />
					)
				})}
		</div>
	)
}

export default PostsList
