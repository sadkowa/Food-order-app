import React, { useEffect, useState } from "react";

import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";

// const DUMMY_MEALS = [
// 	{
// 		id: "m1",
// 		name: "Sushi",
// 		description: "Finest fish and veggies",
// 		price: 22.99,
// 	},
// 	{
// 		id: "m2",
// 		name: "Schnitzel",
// 		description: "A german specialty!",
// 		price: 16.5,
// 	},
// 	{
// 		id: "m3",
// 		name: "Barbecue Burger",
// 		description: "American, raw, meaty",
// 		price: 12.99,
// 	},
// 	{
// 		id: "m4",
// 		name: "Green Bowl",
// 		description: "Healthy...and green...",
// 		price: 18.99,
// 	},
// ];

const AvailableMeals = (props) => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(null);

	useEffect(() => {
		const fetchMeals = async () => {
			setHasError(null);

			const response = await fetch(
				"https://meals-1ca51-default-rtdb.firebaseio.com/meals.json"
			);
			if (!response.ok) {
				throw new Error("Something went wrong...");
			}
			const data = await response.json();
			let loadedMeals = [];

			for (const key in data) {
				loadedMeals.push({
					id: key,
					name: data[key].name,
					description: data[key].description,
					price: data[key].price,
				});
			}

			setMeals(loadedMeals);
			setIsLoading(false);
		};
		
			fetchMeals().catch(error=> {
			setIsLoading(false);
			setHasError(error.message);
		})
	}, []);

	if (isLoading) {
		return (
			<section>
				<p style={{ textAlign: "center", color: "white", marginTop: "50px" }}>
					Loading...
				</p>
			</section>
		);
	}
	if (hasError) {
		return (
			<section>
				<p style={{ textAlign: "center", color: "red", marginTop: "50px" }}>
					{hasError}
				</p>
			</section>
		);
	}

	const mealList = meals.map((meal) => (
		<MealItem
			id={meal.id}
			name={meal.name}
			description={meal.description}
			key={meal.id}
			price={meal.price}
		/>
	));

	return (
		<div>
			<section className={classes.meals}>
				<Card class={classes.meals}>
					<ul>{mealList}</ul>
				</Card>
			</section>
		</div>
	);
};

export default AvailableMeals;
