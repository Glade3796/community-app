// Link to remove query string
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function ClearLinkedTag() {
	const searchParams = useSearchParams();

	return (
		<div className='flex group'>
			<p>posts tagged - </p>
			<Link className='hover:text-red-500' href={removeQueryString("tag")}>
				#{searchParams.get("tag")}
				<span className='group-hover:visible invisible'> - clear</span>
			</Link>
		</div>
	);
}
