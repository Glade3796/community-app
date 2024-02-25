"use client";
import { useState } from "react";

import { AddPostBtn } from "@/components/Buttons";
import { createPost } from "@/_lib/post_actions";
import TagInput from "@/components/TagInput";
import { SelectPostType } from "@/components/DropDownInputs";
import PostTitle from "@/components/PostTitle";

export default function AddPostForm({ user_id }) {
	const [disableBtn, setDisableBtn] = useState(false); //set to false for development
	const [form, setForm] = useState({
		user_id: user_id,
		post_type: "asset",
		title: "",
		content: "",
		quantity: undefined,
		frequency: null,
		date: null,
		available: true,
		closed: false,
		show_address: false,
	});
	function handleInput(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	// checkbox logic
	function handleCheckBox(e) {
		const val = e.target.name;
		setForm({ ...form, [e.target.name]: !form[val] });
	}
	//disable button if form is invalid:

	//! disabled for development
	// useEffect(() => {
	//   if (form.title.length >= 5 && form.content.length >= 30) {
	//     setDisableBtn(false);
	//   }
	//   if (form.title.length >= 50) {
	//     setDisableBtn(true);
	//   }
	//   if (form.content.length >= 500) {
	//     setDisableBtn(true);
	//   }
	// }, [form.title.length, form.content.length]);
	return (
		<form
			action={createPost}
			className='w-max mt-8 p-8 flex flex-col justify-center items-center gap-4 border-solid border-black rounded-lg border-2 bg-gray-200'
		>
			<strong>
				<h1 className='text-5xl p-2'>Create New Post</h1>
			</strong>
			<SelectPostType handleInput={handleInput} />
			<input type='hidden' name='user_id' value={user_id} />
			<PostTitle form={form} handleInput={handleInput} />
			{/* title validation */}
			{form.title.length < 5 && !!form.title && (
				<p>must contain atleast 5 characters</p>
			)}
			{form.content.length > 50 && <p>must be less than 50 characters</p>}
			<div className='flex items-start'>
				<label htmlFor='content'>Description(*): </label>
				<textarea
					id='content'
					name='content'
					onInput={handleInput}
					// minLength={30} disabled for development
					// maxLength={500} disabled for development
				/>
			</div>

			{/* content validation  */}
			{form.content.length < 30 && !!form.content && (
				<p>must contain atleast 30 characters</p>
			)}
			{form.content.length > 500 && <p>must be less than 500 characters</p>}
			<TagInput />
			{form.post_type === "asset" && (
				<div>
					<label htmlFor='quantity'>Quantity: </label>
					<input
						type='number'
						id='quantity'
						name='quantity'
						placeholder='quantity'
						onInput={handleInput}
					></input>
				</div>
			)}
			{form.post_type === "service" && (
				<div>
					<label htmlFor='frequency'>Frequency: </label>
					<input
						type='text'
						id='frequency'
						name='frequency'
						placeholder='frequency'
						onInput={handleInput}
					></input>
				</div>
			)}
			{/* TODO validate date */}
			{form.post_type === "event" && (
				<div>
					<label htmlFor='date'>Date of event: </label>
					<input type='date' name='date' onInput={handleInput} />
				</div>
			)}
			{form.post_type === "service" && (
				<div>
					<label htmlFor='available'>Currently available?</label>
					<input
						type='checkbox'
						name='available'
						value={true}
						defaultChecked
						onInput={handleCheckBox}
					/>
				</div>
			)}
			{form.post_type === "asset" && (
				<div>
					<label htmlFor='available'>Currently available?</label>
					<input
						type='checkbox'
						name='available'
						value={true}
						defaultChecked
						onInput={handleCheckBox}
					/>
				</div>
			)}
			<div>
				<label htmlFor='closed'>Replies allowed?</label>
				<input
					type='checkbox'
					name='closed'
					value={form.closed}
					defaultChecked
					onInput={handleCheckBox}
				/>
			</div>
			<div>
				<label htmlFor='show_address'>Show Address?</label>
				<input
					type='checkbox'
					name='show_address'
					value={form.show_address}
					onInput={handleCheckBox}
				/>
			</div>
			{form.closed && (
				<p>you won&apos;t hear from the community if they can&apos;t reply</p>
			)}
			<AddPostBtn disableBtn={disableBtn} />
			{disableBtn && <p>Please ensure required (*) items are filled inn</p>}
		</form>
	);
}
