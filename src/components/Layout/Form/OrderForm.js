import Input from "../../UI/Input";
import { useRef } from "react";

const OrderForm = () => {
	const nameRef = useRef();

	return (
		<form action="submit">
			<Input
				ref={nameRef}
				label="Name"
				input={{
					id: "name", // this changed!
					type: "text",
				}}
			/>
			<div>
				<label htmlFor="email">E-mail</label>
				<input type="text" id="email" />
			</div>
		</form>
	);
};

export default OrderForm;
