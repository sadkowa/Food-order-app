import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContextProvider from './store/CartProvider'
import OrderForm from "./components/Layout/Form/OrderForm";


function App() {
	const [cartIsShown, setCartIsShown] = useState(false);

	const showCartHandler = () => {
		setCartIsShown(true);
	};

	const hideCartHandler = () => {
		setCartIsShown(false);
	};
	return (
		<CartContextProvider>
			{cartIsShown && <Cart onClose={hideCartHandler} />}
		{/* <OrderForm></OrderForm> */}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</CartContextProvider>
	);
}

export default App;
