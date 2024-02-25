"use client";
import {
	QuickHideAddressAction,
	openClosePost,
	quickAvaialableAction,
	quickDeleteAction,
	quickQuantityAction,
} from "@/_lib/quick_server_actions";
import {
	AvailableUnavailableBtn,
	OpenCloseBtn,
	QuickDeleteBtns,
	QuickHideAddressBtn,
	QuickIncBtn,
} from "./Buttons";
import { useEffect, useState } from "react";

export function OpenClosePostSwitch({ post_id, isOwner, isClosed }) {
	const closed = !isClosed;
	if (!isOwner) {
		return isClosed ? <p>Closed</p> : <p>Open</p>;
	}
	return (
		<form action={openClosePost}>
			<input type='text' name='post_id' value={post_id} hidden readOnly />
			<input type='text' name='isClosed' value={closed} hidden readOnly />
			<OpenCloseBtn isClosed={isClosed} />
		</form>
	);
}

export function QuickDelete({ post_id, user_id, post }) {
	delete post.type;
	delete post.icon;
	const reason = `Quick action, deleted by owner.`;

	return (
		<div>
			<form action={quickDeleteAction}>
				<input type='hidden' value={post_id} name='post_id' readOnly />
				<input type='hidden' value={user_id} readOnly name='user_id' />
				<input type='text' hidden value={postData} readOnly name='post' />
				<input type='hidden' value={reason} name='reason' readOnly />
				<QuickDeleteBtns />
			</form>
		</div>
	);
}

export function QuantityComponent({ quantity, isOwner, post_id }) {
	const [quantityValue, setQuantityValue] = useState(quantity);

	function handleIncrement(e) {
		startTransition(() => {
			setQuantityValue((prevQuantity) => prevQuantity + 1);
			requestSubmit();
		});
	}

	function handleDecrement(e) {
		startTransition(() => {
			setQuantityValue((prevQuantity) => prevQuantity - 1);
			requestSubmit();
		});
	}

	return (
		<div>
			<p style={{ transition: "0.3s" }}>Quantity: {quantityValue}</p>
			{isOwner && (
				<div>
					<form action={quickQuantityAction}>
						<input type='hidden' value={"true"} name='isInc' readOnly />
						<input type='hidden' name='post_id' value={post_id} />
						<QuickIncBtn isInc={true} onClick={handleIncrement} />
					</form>

					<form action={quickQuantityAction}>
						<input type='hidden' value={"false"} name='isInc' readOnly />
						<input
							type='number'
							hidden
							name={"post_id"}
							value={post_id}
							readOnly
						/>
						<QuickIncBtn isInc={false} onClick={handleDecrement} />
					</form>
				</div>
			)}
		</div>
	);
}

export function QuickAvailable({ post_id, isOwner, isAvailable }) {
	const switchAvailability = !isAvailable;
	if (!isOwner) {
		return isAvailable ? (
			<p>Currently available ✅</p>
		) : (
			<p>Currently unavailable 🚫</p>
		);
	}
	return (
		<form action={quickAvaialableAction}>
			<input type='text' name='post_id' value={post_id} hidden readOnly />
			<input
				type='text'
				name='available'
				value={switchAvailability}
				hidden
				readOnly
			/>
			<AvailableUnavailableBtn available={isAvailable} />
		</form>
	);
}
import { quickHideAddressAction } from "@/_lib/quick_server_actions";
import { Button } from "./Buttons";

export function QuickHideAddress({ post_id, isOwner, isAddressHidden }) {
	const switchAddressVisibility = !isAddressHidden;

	if (!isOwner) {
		return isAddressHidden ? <p>Address hidden</p> : <p>Address visible</p>;
	}

	return (
		<form action={QuickHideAddressAction}>
			<input type='hidden' name='post_id' value={post_id} />
			<input type='hidden' name='hideAddress' value={switchAddressVisibility} />
			<QuickHideAddressBtn show_address={show_address} isOwner={isOwner} />
		</form>
	);
}
