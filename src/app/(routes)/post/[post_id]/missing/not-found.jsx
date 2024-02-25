import Link from "next/link";

export default function NotFound() {
	return (
		<div>
			<h2>Post not found</h2>
			<p>You$apos;re in the wrong place!</p>
			<Link href='/dashboard'>Go to dashboard</Link>
		</div>
	);
}
