import { fetchCommentForPost } from "@/_lib/comment_action";
import { Comment } from "./Comment";

export async function CommentFeed({
	post_id,
	user_id,
	parent_comment_id,
	closed,
}) {
	const comments = await fetchCommentForPost(post_id, parent_comment_id);
	// ("!!!!", comments, "comments");

	return (
		<ul className='ml-0'>
			{comments?.map((comment) => (
				<li key={comment.id} className='pt-2'>
					<div className='flex space-x-3 items-center pb-2'>
						<span className='font-bold text-zinc-400'>{comment.username}</span>
					</div>
					<div className='ml-4 border-l border-zinc-600 pl-2 flex flex-col space-y-1'>
						<span className='pl-4'>{comment.content}</span>
						<Comment
							closed={closed}
							post_id={post_id}
							user_id={user_id}
							// post_owner={post.user_id}
							comment_owner={comment.user_id}
							parent_comment_id={+comment.id}
							page={"feed"}
						/>
						<CommentFeed
							closed={closed}
							post_id={post_id}
							parent_comment_id={+comment.id}
							user_id={user_id}
						/>
					</div>
				</li>
			))}
		</ul>
	);
}
