"use client";

import { useEffect, useState } from "react";
import CommentBtn from "./Buttons";
import { addComment } from "@/_lib/comment_action";

export function Comment({
	post_id,
	parent_comment_id,
	post_owner,
	comment_owner,
	user_id,
	page,
	closed,
}) {
	const replyTo = comment_owner ? comment_owner : post_owner;

	const [open, setOpen] = useState(false);
	const [disable, setDisable] = useState(true);

	// ("in form", user_id);

	function handleInput(e) {
		if (e.target.value.length > 0) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	}

	useEffect(() => {
		if (page === "single") {
			setOpen(true);
		}
	}, [page]);
	if (closed) {
		return <p>Commenting is disabled</p>;
	}
	return (
		<div>
			{page !== "single" && (
				<button
					onClick={() => setOpen(!open)}
					className='group hover:font-bold border-b border-t border-zinc-800  focus:outline-none focus:shadow-outline'
				>
					{open ? (
						<p className='hover:text-red-500'>Close</p>
					) : (
						<p className='hover:font-bold'>
							<span className='group-hover:hidden inline '> Quick comment</span>
							<span className='group-hover:inline hidden '>
								click to add comment
							</span>
						</p>
					)}
				</button>
			)}
			{open && (
				<>
					<h3>reply to {replyTo}</h3>
					<form action={addComment} className='flex flex-col'>
						<input
							type='number'
							name='user_id'
							hidden
							readOnly
							value={user_id}
						/>
						<input name='post_id' hidden readOnly value={post_id} />
						<input
							name='parent_comment_id'
							hidden
							readOnly
							value={parent_comment_id}
						/>
						<textarea
							name='content'
							className='p4'
							placeholder='comment'
							required
							onChange={handleInput}
						/>
						{!disable && <CommentBtn open={open} setOpen={setOpen} />}
					</form>
				</>
			)}
		</div>
	);
}
