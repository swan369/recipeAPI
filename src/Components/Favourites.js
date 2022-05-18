import Recipe from "./Recipe";
import { useNavigate } from "react-router-dom";
import "./Favourites.css";

const Favourites = (props) => {
  //   console.log(props);
  const navigate = useNavigate();
  const returnHome = () => {
    navigate("/");
  };
  const cards = props.favourites.map((item, index) => {
    return (
      <Recipe
        handleRemoveFavourites={props.handleRemoveFavourites}
        id={item.idMeal}
        strMeal={item.strMeal}
        strMealThumb={item.strMealThumb}
        index={index}
        key={index}
      />
    );
  });

  return (
    <>
      <h5>Your Favourites</h5>
      <div className="centerFixed">
        <div className="fixed">{cards}</div>
      </div>
    </>
  );
};

export default Favourites;
