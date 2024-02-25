t;
import React, { useState } from "react";

/**
 * TagInput component that allows user to enter tags and displays entered tags.
 * Maintains state for input value and tags array. Handles input change,
 * keydown to save tags, adding/removing tags, and rendering entered tags.
 */
export default function TagInput() {
	// Declare a state variable for tags, initially an empty array
	const [tags, setTags] = useState([]);
	// Declare a state variable for the current input value, initially an empty string
	const [inputValue, setInputValue] = useState("");

	// Function to handle changes in the input field
	const handleInputChange = (event) => {
		// Set the input value to the current value of the input field
		setInputValue(event.target.value);
	};

	// Function to handle key down events in the input field
	const handleInputKeyDown = (event) => {
		// If the key pressed is space
		if (event.key === " ") {
			// Prevent the default action (which is to add a space to the input value)
			event.preventDefault();
			// Save the current tag
			saveTag();
		}
	};

	// Function to save a tag
	const saveTag = () => {
		// Trim the input value
		const trimmedValue = inputValue.trim();
		// If the trimmed value is at least 3 characters long and contains only alphanumeric characters
		if (trimmedValue.length >= 3 && /^[a-zA-Z0-9]+$/.test(trimmedValue)) {
			// Add the trimmed value to the tags array
			setTags([...tags, trimmedValue]);
			// Clear the input field
			setInputValue("");
		}
	};

	// Function to delete a tag
	const handleTagDelete = (index) => {
		// Create a copy of the current tags array
		const updatedTags = [...tags];
		// Remove the tag at the given index
		updatedTags.splice(index, 1);
		// Update the tags array
		setTags(updatedTags);
	};

	// Render the component
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
			{/* Hidden input field to store the tags */}
			<input type='hidden' readOnly name='post_tags' value={tags} />
			<div>
				{/* Map over the tags array and render each tag */}
				{tags.map((tag, index) => (
					<span key={index}>
						#{tag}
						{/* Button to delete the tag */}
						<button
							onClick={() => handleTagDelete(index)}
							className='text-sm font-bold text-red-500'
						>
							x
						</button>
					</span>
				))}
			</div>
		</div>
	);
}
