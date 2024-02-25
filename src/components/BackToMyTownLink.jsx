"use client";
import useQueryString from "@/app/hooks/useQueryString";
import Link from "next/link";

export default function BackToMyTownLink() {
	const { removeQueryString } = useQueryString();

	return <Link href={removeQueryString("town")}>back to my town</Link>;
}
