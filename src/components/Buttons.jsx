//Button components: "save", "submit", "add post", "upvote" and "recover" buttons
"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

//save button
export function SaveButton() {
	const { pending } = useFormStatus();

	return <button disabled={pending}>{pending ? `Saving...` : `Save`}</button>;
}

//create profile button
export function CreateProfBtn() {
	const { pending } = useFormStatus();

	return (
		<button
			type='submit'
			disabled={pending}
			className='col-span-2 w-1/3 bg-green-950 hover:bg-green-400 justify-self-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
		>
			{pending ? `Creating...` : `Create account`}
		</button>
	);
}

//update button
export function UpdateProfBtn() {
	const { pending } = useFormStatus();

	return (
		<button
			type='submit'
			disabled={pending}
			className='col-span-2 w-1/3 bg-green-950 hover:bg-green-400 justify-self-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
		>
			{pending ? `Updating...` : `Update Profile`}
		</button>
	);
}

//add post button
export function AddPostBtn({ disableBtn }) {
	const { pending } = useFormStatus();
	return (
		<button
			type='submit'
			disabled={pending || disableBtn}
			className='col-span-2 w-1/3 bg-green-950 hover:bg-green-400 justify-self-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed'
		>
			{pending ? `Posting...` : `Post it!`}
		</button>
	);
}
//edit post button
export function EditPostBtn({ disableBtn }) {
	const { pending } = useFormStatus();
	return (
		<button
			type='submit'
			disabled={pending || disableBtn}
			className='col-span-2 w-1/3 bg-green-950 hover:bg-green-400 justify-self-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed'
		>
			{pending ? `Editing...` : `Update post`}
		</button>
	);
}
//upvote button
export function StarBtn({ count }) {
	const { pending } = useFormStatus();

	return (
		<button disabled={pending} className='ml-2 hover:text-blue-500 group'>
			{pending ? `liking...` : `⭐`}{" "}
			<span className='group-hover:hidden w-30'>:{count} stars</span>
			<span className='group-hover:inline hidden w-30'>star post ⭐</span>
		</button>
	);
}

//comment button
export default function CommentBtn({ disableBtn, setOpen }) {
	const { pending } = useFormStatus();
	return (
		<button
			type='submit'
			disabled={pending || disableBtn}
			onClick={() => setOpen(!open)}
			className='col-span-2 w-1/3 bg-green-950 hover:bg-green-400 justify-self-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed'
		>
			{pending ? `commenting...` : `comment`}
		</button>
	);
}

//recover button
export function RecoverBtn({ reset }) {
	return (
		<button
			onClick={
				// Attempt to recover by trying to re-render the segment
				() => reset()
			}
			className='border rounded border-zinc-600 px-3 py-2 hover:bg-pink-400 hover:text-black'
		>
			Go back
		</button>
	);
}

//open/close button
//add post button
export function OpenCloseBtn({ isClosed }) {
	const { pending } = useFormStatus();
	let label = isClosed ? "Open" : "Close";
	let verb = isClosed ? "Opening" : "Closing";

	return (
		<button
			disabled={pending}
			className={
				!isClosed
					? "group bg-green-200 hover:bg-red-500"
					: "group bg-red-200 hover:bg-green-500"
			}
			type='submit'
		>
			<span className={!isClosed ? " font-bold" : " font-bold"}>
				{pending ? `${verb}...` : label}
			</span>
			<p className='group-hover:visible invisible'>
				{isClosed ? "enable comments" : "disable comments"}
			</p>
		</button>
	);
}

export function AvailableUnavailableBtn({ available }) {
	const { pending } = useFormStatus();
	let label = available ? "Available ✅" : "Unavailable 🚫";
	let verb = available ? "...making available" : "...making unavailable";

	return (
		<button
			disabled={pending}
			className={
				available
					? "group bg-green-200 hover:bg-red-500"
					: "group bg-red-200 hover:bg-green-500"
			}
			type='submit'
		>
			<span className={available ? " font-bold" : " font-bold"}>
				{pending ? `${verb}...` : label}
			</span>
		</button>
	);
}

export function QuickHideAddressBtn({ show_address, isOwner }) {
	const { pending } = useFormStatus();
	let label = show_address ? "Hide address" : "Show address";
	let verb = show_address ? "...hiding address" : "...showing address";
	if (isOwner) {
		return (
			<button
				disabled={pending}
				className={
					show_address
						? "group bg-green-200 hover:bg-red-500"
						: "group bg-red-200 hover:bg-green-500"
				}
				type='submit'
			>
				<span className={show_address ? " font-bold" : " font-bold"}>
					{pending ? `${verb}...` : label}
				</span>
			</button>
		);
	} else return null;
}

export function QuickDeleteBtns({ post_id }) {
	const { pending } = useFormStatus();
	const [showDelete, setShowDelete] = useState(false);

	function handleClick(e) {
		setShowDelete(!showDelete);
	}
	return (
		<>
			<div className='flex gap-2'>
				{showDelete && (
					<button type='submit' className='bg-red-200 hover:bg-red-500 p-1'>
						{pending ? "Deleting..." : "Confirm Delete?"}
					</button>
				)}
				<button
					onClick={(e) => handleClick(e)}
					className={
						!showDelete
							? "hover:text-red-500 hover:font-bold p-1"
							: "hover:bg-green-500 bg-green-200 hover:font-bold font:bold p-1"
					}
					type='button'
				>
					{!showDelete ? "Delete Post" : "Cancel"}
				</button>
			</div>
		</>
	);
}

export function QuickIncBtn({ isInc }) {
	const label = isInc ? "⬆️ (+ 1)" : "⬇️ (- 1)";
	return (
		<button type='submit' className='hover:text-lg'>
			{label}
		</button>
	);
}
