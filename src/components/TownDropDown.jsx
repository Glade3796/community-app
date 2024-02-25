"use client";

import useQueryString from "@/app/hooks/useQueryString";

useQueryString;

export function TownDropDown({ cities, selected }) {
	const { removeQueryString, setQueryString, searchParams } = useQueryString();

	function handleChange(e) {
		// pathname = current url, ?town=city
		if (e.target.value !== "-select city-") {
			setQueryString("town", e.target.value);
		} else if (searchParams.get("town") === e.target.value) {
			removeQueryString("town");
		}
	}

	return (
		<div className='text-center pb-10'>
			<select onChange={handleChange} value={selected}>
				<option>-select city-</option>
				<option value={"all"}>ALL</option>
				{cities.map((city, i) => (
					<option key={i} value={city.toLowerCase()}>
						{city}
					</option>
				))}
			</select>
		</div>
	);
}
