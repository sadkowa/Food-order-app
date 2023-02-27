import React from "react";

import HeaderCartButton from './HeaderCartButton'

import classes from "./Header.module.css";
import mealImage from "../../assets/meals.jpg";

const Header = (props) => {
	return (
		<React.Fragment>
			<header className={classes.header}>
				<h1>ReactMeals</h1>
				<HeaderCartButton onClick={props.onShowCart}/>
			</header>
			<div className={classes['main-image']}>
				<img src={mealImage} alt="a table" />
			</div>
		</React.Fragment>
	);
};

export default Header;
