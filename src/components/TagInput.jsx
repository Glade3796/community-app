/**
 * TagInput component that allows user to enter tags and displays entered tags.
 * Maintains state for input value and tags array. Handles input change,
 * keydown to save tags, adding/removing tags, and rendering entered tags.
 */
import React, { useState } from "react";

// TagInput component
export default function TagInput() {
	const [tags, setTags] = useState([]); // State for storing tags
	const [inputValue, setInputValue] = useState(""); // State for input value

	// Handle input change event
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	// Handle key down event on input
	const handleInputKeyDown = (event) => {
		if (event.key === " ") {
			event.preventDefault();
			saveTag();
		}
	};

	// Save tag
	const saveTag = () => {
		const trimmedValue = inputValue.trim();
		if (trimmedValue.length >= 3 && /^[a-zA-Z0-9]+$/.test(trimmedValue)) {
			setTags([...tags, trimmedValue]);
			setInputValue("");
		}
	};

	// Handle tag delete
	const handleTagDelete = (index) => {
		const updatedTags = [...tags];
		updatedTags.splice(index, 1);
		setTags(updatedTags);
	};

	// Render TagInput component
	return (
		<div>
			<label htmlFor='tags'>Tags (press space to save tag)</label>
			<input
				type='text'
				value={inputValue}
				onChange={handleInputChange}
				onKeyDown={handleInputKeyDown}
				name='tags'
			/>
			<input type='hidden' readOnly name='post_tags' value={tags} />
			<div>
				{tags.map((tag, index) => (
					<span key={index}>
						#{tag}
						<button
							onClick={() => handleTagDelete(index)}
							className='text-sm font-bold text-red-500'
						>
							{"  x "}
						</button>
					</span>
				))}
			</div>
		</div>
	);
}
