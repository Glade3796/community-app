"use client";
import useQueryString from "@/app/hooks/useQueryString";
import Link from "next/link";

import PropTypes from "prop-types";
import { useState } from "react";

export default function TagBox({ tags }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	TagBox.propTypes = {
		tags: PropTypes.arrayOf(
			PropTypes.shape({
				content: PropTypes.string.isRequired,
			})
		).isRequired,
	};

	const { setQueryString, removeQueryString, searchParams } = useQueryString();

	const filteredTags = tags
		? tags.filter((tag) =>
				tag.content.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: "";

	const togglePopup = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	const flashTag = (event) => {
		event.target.classList.add("animate-ping");
		setTimeout(() => {
			event.target.classList.remove("animate-ping");
			closePopup(); // Close the popup after flashing the tag
		}, 1000);
	};

	const closePopup = () => {
		setIsPopupOpen(false);
	};

	const handleTagClick = (tag) => {
		flashTag(); // Flash the selected tag
		closePopup(); // Close the popup instantly on tag click
	};

	return (
		<div className='relative'>
			<button
				onClick={togglePopup}
				className='bg-blue-500 text-white px-2 py-1 m-1 rounded hover:bg-blue-700 transition-colors duration-200'
			>
				Show Tags
			</button>
			{isPopupOpen && (
				<div className='absolute top-0 left-0 bg-white border border-gray-300 rounded p-2'>
					<input
						type='text'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder='Search tags'
						className='border border-gray-300 rounded px-2 py-1 m-1 w-40'
						onKeyDown={(e) => {
							e.key === "enter" ||
								(e.ket === "space" && setQueryString("tag", e.target.value));
						}}
					/>
					<button
						onClick={closePopup}
						className='bg-red-500 text-white px-2 py-1 m-1 rounded hover:bg-red-700 transition-colors duration-200'
					>
						Close
					</button>
					<div className='flex flex-col max-h-[66vh] overflow-y-auto'>
						{filteredTags.map((tag, i) => (
							<Link
								href={
									searchParams.get("tag") === tag.content
										? removeQueryString("tag")
										: setQueryString("tag", tag.content)
								}
								key={tag}
								className={`bg-blue-500 text-white px-2 py-1 m-1 rounded hover:bg-blue-700 transition-colors duration-200 ${
									searchParams.get("tag") === tag.content ? "bg-yellow-500" : ""
								} ${
									searchParams.get("tag") === tag.content
										? "bg-orange-500 text-white"
										: "bg-blue-500 text-white"
								}`}
								onClick={(event) => {
									handleTagClick(tag);
								}}
							>
								<div className='relative'>
									<span className='absolute top-0 left-0 w-full h-full bg-blue-500 opacity-50 rounded transition-opacity duration-200'></span>
									<span
										className={`relative ${
											searchParams.get("tag") === tag.content
												? "text-yellow-500"
												: ""
										}`}
									>
										{tag.content}
									</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
