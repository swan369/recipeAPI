import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
import Home from "./Components/Home";
import About from "./Components/About";
import Recipes from "./Components/Recipes";
import RecipeDetail from "./Components/RecipeDetail";
import Favourites from "./Components/Favourites";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import "bootstrap/dist/css/bootstrap.min.css";

const axios = require("axios");

function NotFound() {
  const navigate = useNavigate();
  navigate("/");

  return (
    <div>
      <h2>Not Found - 404</h2>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}

function App() {
  const navigate = useNavigate();

  const [recipesRanFixed, setRecipesRanFixed] = useState(null);
  const [recipesByCat, setRecipesByCat] = useState(null);
  const [status, setStatus] = useState("");
  const [recipeDetail, setRecipeDetail] = useState({});
  const [favourites, setFavourites] = useState([]);

  const getDataRanFixed = function () {
    const getMaxNumRecipes = (n) => {
      const random = (num) => {
        const randomNum = Math.floor(Math.random(num) * num + 1);
        return randomNum;
      };
      let maxRecipes = [];
      let randomIndex = [];

      while (maxRecipes.length < 9) {
        let r = random(20);
        const result = randomIndex.find((el) => el === r);
        if (!result) {
          maxRecipes.push(n[r]);
          randomIndex.push(r);
        }
      }
      return maxRecipes;
    };

    const URL = `https://themealdb.com/api/json/v1/1/filter.php?c=Seafood
    `;
    setStatus("Pending");
    axios
      .get(URL)
      .then(function (response) {
        let n = response?.data?.meals;

        setStatus("completed");
        setRecipesRanFixed(getMaxNumRecipes(n));
      })
      .catch(function (error) {
        setStatus("error");
        console.log(error);
      });
  };
  //CORS error..look at https <== if http. won't work.
  //also ensure it is not www. but https
  const handleFetchOne = function (id) {
    // console.log(id);
    const URLone = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    setStatus("Pending");
    axios
      .get(URLone)
      .then(function (response) {
        setStatus("completed");
        setRecipeDetail(response.data.meals[0]);
      })
      .catch(function (error) {
        setStatus("error");
        console.log(error);
      });
  };

  const getDataByCat = function (search) {
    const URL = `https://themealdb.com/api/json/v1/1/filter.php?c=${search}
    `;
    setStatus("Pending");
    axios
      .get(URL)
      .then(function (response) {
        let n = response?.data?.meals;

        setStatus("completed");
        setRecipesByCat(n);
      })
      .catch(function (error) {
        setStatus("error");
        console.log(error);
      });
  };

  useEffect(() => {
    getDataRanFixed();
  }, []);
  if (status === "pending") {
    return "LOADING";
  }
  if (status === "error") {
    return "ERROR";
  }

  const handleGetRecipesByCat = (searchRef, event) => {
    event.preventDefault();
    const search = searchRef.current.value;
    getDataByCat(search);
    if (search) {
      navigate("/recipes");
    }
  };

  const handleFavourites = (event) => {
    const recipeDetailStringified = event.target.getAttribute("recipeDetail");

    // needed to be back as an Object to extract data
    const recipeDetailObj = JSON.parse(recipeDetailStringified);
    // console.log(recipeDetailObj);

    const found = favourites.find(
      (element) => element.idMeal === recipeDetailObj.idMeal
    );
    if (!found) {
      setFavourites([...favourites, recipeDetailObj]);
    }

    console.log("favourites: ", favourites);
    console.log("handleFavourites works");
  };

  const handleRemoveFixed = (index) => {
    console.log(index);
    const cardsRemain = recipesRanFixed.filter((el, i) => i !== index);

    setRecipesRanFixed(cardsRemain);
    console.log("handleRemove Works");
  };

  const handleRemoveFavourites = (index) => {
    console.log(index);
    const favouritesRemain = favourites.filter((el, i) => i !== index);
    setFavourites(favouritesRemain);
    console.log("remove favourite works");
  };

  const handleRemoveRecipesByCat = (index) => {
    const recipesRemain = recipesByCat.filter((el, i) => i !== index);
    setRecipesByCat(recipesRemain);
  };
  return (
    // App can directly pass down props directly as everything is a child however...
    // If a component is child of a parent, you need to pass down prop via parent e.g. home in order for clickHandle to work
    // Directly passing down prop from App only allows clickHandle to work when directed directly to the page e.g. /recipes

    <div id="idApp" className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>FoodyRIFIC</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link href="#link">About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/favourites">
                <Nav.Link href="#link">Favourites</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/recipes">
                <Nav.Link href="#link">Searched Recipes</Nav.Link>
              </LinkContainer>

              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item>Login</NavDropdown.Item>
                <NavDropdown.Item>Register</NavDropdown.Item>
                <NavDropdown.Item>Donate</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Blog</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/favourites"
          element={
            <Favourites
              handleRemoveFavourites={handleRemoveFavourites}
              favourites={favourites}
            />
          }
        />
        <Route
          path="/"
          element={
            <Home
              handleGetRecipesByCat={handleGetRecipesByCat}
              recipes={recipesRanFixed}
              handleRemoveFixed={handleRemoveFixed}
            />
          }
        />
        <Route
          path="recipes"
          element={
            <Recipes
              recipesByCat={recipesByCat}
              handleRemoveRecipesByCat={handleRemoveRecipesByCat}
            />
          }
        />

        <Route
          path="recipe/:id"
          element={
            <RecipeDetail
              handleFetchOne={handleFetchOne}
              recipeDetail={recipeDetail}
              handleFavourites={handleFavourites}
              handleRemoveFavourites={handleRemoveFavourites}
            />
          }
        />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
