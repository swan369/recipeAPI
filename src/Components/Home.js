// import { Outlet } from "react-router-dom";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Container from "react-bootstrap/Container";
// import LinkContainer from "react-router-bootstrap/LinkContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import Recipe from "./Recipe";
import "./Home.css";
import { useRef } from "react";

const Home = (props) => {
  const searchRef = useRef();

  const recipesArr = props.recipes;

  let tenRecipes;
  if (recipesArr) {
    tenRecipes = recipesArr.map((el, index) => {
      return (
        <Recipe
          id={el.idMeal}
          strMeal={el.strMeal}
          strMealThumb={el.strMealThumb}
          key={index}
          handleRemoveFixed={props.handleRemoveFixed}
          index={index}
        />
      );
    });
  }

  return (
    <>
      {/* <div className="searchContainer"> */}
      <div className="row justify-content-center">
        <div className="col-sm-4">
          <input
            ref={searchRef}
            type="text"
            className="form-control"
            placeholder="SearchByCategory: seafood, beef, pork, chicken.."
            aria-label="City"
          />
        </div>
        <div class="col-sm-1">
          <button
            onClick={(event) => {
              props.handleGetRecipesByCat(searchRef, event);
            }}
            type="button"
            class="btn btn-info"
          >
            Search
          </button>
        </div>
      </div>
      {/* </div> */}
      {/* <form className="form">
        <label htmlFor="search">Search</label>
        <input ref={searchRef} id="search" type="text" />
        <button
          //to stop page refresh either :
          // type="button" in element
          // or pass event then use event.preventDefault() in handler function
          onClick={(event) => {
            props.handleGetRecipesByCat(searchRef, event);
          }}
        >
          Submit
        </button>
      </form> */}
      {/* <Outlet /> */}
      <div className="centerFixed">
        <div className="fixed">{tenRecipes ? tenRecipes : null}</div>
      </div>
    </>
  );
};

export default Home;
