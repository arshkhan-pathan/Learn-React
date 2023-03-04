import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Paneer Tikka Masala",
    description: "Finest Paneer and veggies",
    price: 220,
  },
  {
    id: "m2",
    name: "Aloo Puri",
    description: "A Surti specialty!",
    price: 50,
  },
  {
    id: "m3",
    name: "Desi Burger",
    description: "Desi, cooked, cheesy",
    price: 60,
  },
  {
    id: "m4",
    name: "Chineese Bowl",
    description: "Healthy...and Junky...",
    price: 120,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
