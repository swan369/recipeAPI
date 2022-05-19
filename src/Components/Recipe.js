import Card from "react-bootstrap/Card";
import LinkContainer from "react-router-bootstrap/LinkContainer";

function Recipe(props) {
  const fixed = props.handleRemoveFixed;
  const favourites = props.handleRemoveFavourites;
  const recipeByCat = props.handleRemoveRecipesByCat;

  const choiceOnClick = () => {
    if (favourites) {
      return () => {
        return props.handleRemoveFavourites(props.index);
      };
    }
    if (fixed) {
      return () => {
        props.handleRemoveFixed(props.index);
      };
    }

    if (recipeByCat) {
      return () => {
        console.log("recipes by cat was here");
        props.handleRemoveRecipesByCat(props.index);
      };
    }
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <LinkContainer to={`/recipe/${props.id}`}>
          <Card.Img variant="top" src={props.strMealThumb} />
        </LinkContainer>
        <LinkContainer to={`/recipe/${props.id}`}>
          <Card.Body>
            <Card.Title>{props.strMeal}</Card.Title>
          </Card.Body>
        </LinkContainer>
        <button onClick={choiceOnClick()}>Remove</button>
      </Card>
    </>
  );
}

export default Recipe;
