import "./Card.css";

function Card(props) {
  const classes = "card " + props.className; /// remember to add space afterr card else new class will not be added😒

  return <div className={classes}>{props.children}</div>;
}

export default Card;
