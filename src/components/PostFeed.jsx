import StarPost from "@/components/StarPost";
import Link from "next/link";
import TagFilter from "./TagFilter";
import { useSearchParams } from "next/navigation";
import { Comment } from "@/components/Comment";
import { CategoryLink, addTypeIcon, categoryTypesArr } from "@/util/misc";
import { ClearLinkedTag } from "./LinkTagRem";

export default function PostFeed({ posts, starred_posts, user_id }) {
	//disable star button if already in user's starred posts
	function isStarred(postId) {
		return starred_posts.some((post) => post.post_id === postId);
	}
	const searchParams = useSearchParams();
	const getTown = searchParams.get("town");
	const town = getTown?.charAt(0).toUpperCase() + getTown?.slice(1);
	//set text at top of feed
	function topText(postsNum) {
		if (searchParams.has("town")) {
			if (searchParams.get("town") === "all") {
				return `${postsNum} posts - in all towns`;
			}
			return `${postsNum} posts - in ${town}`;
		} else if (!searchParams.has("town")) {
			return `${postsNum} posts - in your town`;
		}

		return null;
	}
	//add icons
	const postsWithType = addTypeIcon(posts);
	const postsNum = postsWithType.length;
	// // (postsWithType);

	return (
		<>
			<h1>{topText(postsNum)}</h1>

			{searchParams.has("tag") && <ClearLinkedTag />}
			<ul>
				{postsWithType.map((post) => (
					<li key={post.post_id} className='py-4 border-b border-zinc-800'>
						<Link href={`/post/${post.post_id}`}>
							<strong className='text-3xl'>{post.post_title}</strong>
						</Link>
						<p className='text-xl'>
							<Link href={`/post/${post.post_id}`}>{post.post_content}</Link>
						</p>
						<p className='text-zinc-400'>
							<CategoryLink type={post.type} icon={post.icon} /> posted by{" "}
							{post.posted_by}
						</p>
						<div className='flex items-center'>
							{/* invert star color if already starred */}
							{isStarred(post.post_id) && (
								<p className='filter invert'>
									⭐{" "}
									<span className='filter invert'>
										: {post.star_count} stars
									</span>
								</p>
							)}
							{/* or else show the star button */}
							{!isStarred(post.post_id) && (
								<StarPost
									postId={post.post_id}
									userId={user_id}
									count={post.star_count}
								/>
							)}

							<Link
								className='ml-4 hover:text-blue-500 hover:outline hover:outline-blue-500'
								href={`post/${post.post_id}`}
							>
								💬: {post.comment_count}
							</Link>
						</div>
						{post.show_address && <p>{post.postcode}</p>}
						<TagFilter tag={post.tag_content} />

						<Comment
							post_id={post.post_id}
							post_owner={post.posted_by}
							user_id={user_id}
						/>
					</li>
				))}
			</ul>
		</>
	);
}
