import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";

import Modal from "../UI/Modal";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;
	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};
	const cartItemaRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const orderButtonHandler = () => {
		setIsCheckout(true);
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map((item) => {
				return (
					<CartItem
						name={item.name}
						key={item.id}
						price={item.price}
						amount={item.amount}
						onAdd={cartItemAddHandler.bind(null, item)}
						onRemove={cartItemaRemoveHandler.bind(null, item.id)}
					/>
				);
			})}
		</ul>
	);

	const modalActions = (
		<div className={classes.actions}>
			<button onClick={props.onClose} className={classes["button--alt"]}>
				Close
			</button>
			{hasItems && (
				<button onClick={orderButtonHandler} className={classes.button}>
					Order
				</button>
			)}
		</div>
	);

	const submitOrderHandler = (userData) => {
		setIsSubmitting(true);

		fetch("https://meals-1ca51-default-rtdb.firebaseio.com/orders.json", {
			method: "POST",
			body: JSON.stringify({
				user: userData,
				orderedItems: cartCtx.items,
			}),
			headers: {
				"Content-Type": "application/json", 
			},
		}).catch((error) => setSubmitError(true));
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();

		// const data = await response.json();
	};

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
			)}
			{!isCheckout && modalActions}
		</React.Fragment>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;

	const didSubmitModalContent = (
		<React.Fragment>
			<p>Successfully sent the order!</p>
			<div className={classes.actions}>
				<button onClick={props.onClose} className={classes.button}>
					Close
				</button>
			</div>
		</React.Fragment>
	);
	const errorModalContent = (
		<React.Fragment>
			<p>Something went wrong... :(</p>
			<div className={classes.actions}>
				<button onClick={props.onClose} className={classes.button}>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && !submitError && didSubmitModalContent}
			{submitError && errorModalContent}
		</Modal>
	);
};

export default Cart;
