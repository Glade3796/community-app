/**
 * The SinglePostPage function in this Next.js page fetches user and post data, formats the date, and
 * displays interactive components for a single post with commenting functionality.
 * @returns The `SinglePostPage` function is returning a JSX structure that represents a single post
 * page with interactive components. The page includes various sections such as post details, user
 * actions (like edit and delete), post content, tags, availability controls, commenting controls, and
 * comment feed.
 */
//next js page
import { fetchSinglePost, fetchUserdata } from "@/_lib/fetch";
import { Comment } from "@/components/Comment";
import { CommentFeed } from "@/components/CommentFeed";
import { addTypeIconSinglePost, postOwnerTest } from "@/util/misc";
import Link from "next/link";

import TagsComponent from "@/components/TagsComponent";
import { getUserData } from "@/util/get-user-data";

import {
	OpenClosePostSwitch,
	QuantityComponent,
	QuickAvailable,
	QuickDelete,
	QuickHideAddress,
} from "@/components/Post";

// Single post page with interactive components

export default async function SinglePostPage({ params }) {
	// Extract the post_id from the params object
	let post_id = params.post_id;
	console.log(post_id, "post_id");
	// Set post_id to a fixed value of 4 (for testing purposes)
	post_id = 4;

	// Fetch the user data and post data asynchronously
	const userData = getUserData();
	const postData = fetchSinglePost(post_id);

	// Wait for both promises to resolve
	const [user, postPre] = await Promise.all([userData, postData]);

	// Get the user_id for authentication
	const user_id = user.id;

	// Add type icon to the post
	const post = postPre && addTypeIconSinglePost(postPre);

	// Check if the user is the owner of the post
	const isOwner = postOwnerTest(user, post.user_id);

	// Function to format the date
	function formatDate(date) {
		let dateArr = date?.toDateString().split(" ");
		let dateDay = dateArr[0];
		let dateDayNum = dateArr[2];
		let dateMonth = dateArr[1];
		let dateYear = dateArr[3];
		return {
			day: dateDay,
			dayNum: dateDayNum,
			month: dateMonth,
			year: dateYear,
		};
	}

	// Format the created_at date of the post
	const date_posted = formatDate(post.created_at);

	return (
		// header
		<section className="w-full max-w-2xl mx-auto px-4 m-5 border border-lime-800 rounded-lg bg-blue-100">
			{isOwner && (
				<section className='flex gap-4 place-items-center'>
					<QuickDelete post_id={post_id} user_id={user.id} post={post} />

					<Link
						className='hover:text-blue-500 hover:bg-blue-100 hover:font-bold'
						Flk={`/post/${post_id}/edit`}
					>
						edit
					</Link>
				</section>
			)}
			<div>
				<p className="text-gray-500">
					created at{" "}
					<i>
						{date_posted.dayNum} {date_posted.month} {date_posted.year}
					</i>
				</p>
				{/* Title  & content */}
				{/* TODO updated notification */}
				{post.updated_at !== post.created_at && (
        <p className="text-gray-500">edited | {post.updated_at.toDateString()}</p>
      )}
				<p className="text-gray-500">
					{post.icon} - {post.post_type}
				</p>
				<h1 className="text-3xl font-bold my-4">{post.title}</h1>
				<p  className="my-4">{post.content}</p>
				{post.type === "asset" ||
					(post.type === "service" && (
						<QuantityComponent
							isOwner={isOwner}
							quantity={post.quantity}
							post_id={post_id}
						/>
					))}
				<TagsComponent tags={post.tags} />

				{post.frequency && <p>Frequency: {post.frequency}</p>}
				{post.date && <p>Event date: {post.date}</p>}

				<QuickAvailable
					post_id={post_id}
					isOwner={isOwner}
					isAvailable={post.available}
				/>

				<p>Created by {isOwner ? "you! 😊" : post.posted_by}</p>
				<QuickHideAddress
					post_id={post_id}
					show_address={post.show_address}
					isOwner={isOwner}
					address={[post.city, post.post_code]}
				/>
			</div>
			<div>
				<p>
					commenting:{" "}
					<span className={post.closed ? " font-bold" : "font-bold"}>
						{post.closed ? "disabled 🚫" : "enabled ✅"}
					</span>
				</p>
				<OpenClosePostSwitch
					post_id={post_id}
					isClosed={post.closed}
					isOwner={isOwner}
				/>

				<Comment
					closed={post.closed}
					page={"single"}
					post_id={post_id}
					parent_comment_id={null}
					post_owner={post.username}
					comment_owner={null}
					user_id={user_id}
				/>

				<CommentFeed post_id={post_id} user_id={user_id} closed={post.closed} />
			</div>
		</section>
	);
}
