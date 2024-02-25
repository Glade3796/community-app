import useQueryString from "@/app/hooks/useQueryString";

export function CategoryLink({ type, icon }) {
	const { setQueryString } = useQueryString();

	return (
		<div
			className='opacity-50 hover:opacity-100 hover:text-blue-500 hover:outline hover:outline-blue-500'
			onClick={setQueryString("category", type)}
		>
			{icon} - {type}
		</div>
	);
}

export function selectedCat(name, query) {
	if (query === name?.toString()) {
		return "font-bold text-white bg-blue-500 px-2 py-1 rounded-md transform transition-transform duration-200 hover:bg-red-500 hover:cursor-pointer hover:scale-125";
	} else {
		return "text-gray-500 cursor-pointer hover:text-blue-500 px-2 py-1 rounded-md transform transition-transform duration-200 hover:scale-105";
	}
}
