import Recipe from "./Recipe";
import "./Recipes.css";
// import { Link } from "react-router-dom";
// import LinkContainer from "react-router-bootstrap/LinkContainer";
// import { Card } from "react-bootstrap";

function Recipes(props) {
  const recipesAll = props.recipesByCat;
  // console.log(recipesAll);
  let recipesRendered;
  if (recipesAll) {
    recipesRendered = recipesAll.map((el, index) => {
      return (
        <Recipe
          id={el.idMeal}
          strMeal={el.strMeal}
          strMealThumb={el.strMealThumb}
          key={index}
          index={index}
          handleRemoveRecipesByCat={props.handleRemoveRecipesByCat}
        />
      );
    });
  }
  return (
    <>
      <h5>Recipes You've Searched</h5>
      <div className="centerFixed">
        <div className="fixed">{recipesRendered}</div>
      </div>
    </>
  );
}

export default Recipes;
