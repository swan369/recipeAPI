import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./RecipeDetail.css";

const RecipeDetail = (props) => {
  // console.log(props);
  const recipeDetail = props.recipeDetail;
  // recipeDetail is an object needed to be stringified to be accepted by the attribute in the element. Or else [object, object] will appear and data can't be used when extracted by the requiring function
  const recipeDetailStringify = JSON.stringify(recipeDetail);
  const id = useParams().id;

  const handleFetchOne = props.handleFetchOne;

  useEffect(() => {
    handleFetchOne(id);
  }, []);
  //converting object of many properties into arrays of key and values.
  let result = Object.entries(recipeDetail);

  let recipesIngArr = [];
  let recipesMeasureArr = [];

  result.forEach((el) => {
    let prop = el[0];
    let value = el[1];

    if (prop.includes("strIngredient") && value) {
      recipesIngArr.push(value);
    }

    if (prop.includes("strMeasure") && value) {
      recipesMeasureArr.push(value);
    }
  });

  let comboIngMeasure = [];

  for (let i = 0; i < recipesIngArr.length; i++) {
    const elementI = recipesIngArr[i];
    for (let j = i; j <= i; j++) {
      const elementJ = recipesMeasureArr[j];
      const combo = [elementI, elementJ];
      comboIngMeasure.push(combo);
    }
  }

  const ListItems = (props) => {
    return (
      <>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{`${props.ingredient}: ${props.measure}`}</ListGroupItem>
        </ListGroup>
      </>
    );
  };

  const comboIng = comboIngMeasure.map((el, index) => {
    return <ListItems ingredient={el[0]} measure={el[1]} key={index} />;
  });

  let stringSeparate = recipeDetail?.strInstructions;

  const ListSteps = (props) => {
    return (
      <Card.Text>
        <ul>
          <li>{props.steps}</li>
        </ul>
      </Card.Text>
    );
  };

  let stepsCook = [];

  if (stringSeparate) {
    let steps = stringSeparate.split(".");

    stepsCook = steps.map((el, index) => {
      return <ListSteps steps={el} key={index} index={index} />;
    });
  }

  return (
    <>
      <div className="recipeDetail">
        <Card style={{ width: "30rem" }}>
          <Card.Link
            recipeDetail={recipeDetailStringify}
            value={"value works"}
            onClick={(event) => {
              props.handleFavourites(event);
            }}
          >
            Add2Favourites
          </Card.Link>
          <Card.Img variant="top" src={recipeDetail?.strMealThumb} />
          <Card.Body>
            <Card.Title>{recipeDetail?.strMeal}</Card.Title>
            {stepsCook}
          </Card.Body>
          <Card.Title> Ingredients Required</Card.Title>
          {comboIng}
          <Card.Body></Card.Body>
        </Card>
      </div>
    </>
  );
};

export default RecipeDetail;
