import "./About.css";

function About(props) {
  console.log(props);
  return (
    <>
      <div className="about">
        <ul>
          <li>
            This project was created as a React refresher. Features of
            duplicated skill sets are left out. e.g search by name etc.
          </li>
          <li>
            Instead, time will be better spent for my next project along this
            similar theme Recipe but MERN based. I need to practice backend
            nodeJS/express/mongoose/mongdoDB
          </li>
          <li>
            Acknowledgement: This project was carried out using this API:
            https://www.themealdb.com/api.php
          </li>
        </ul>
      </div>
    </>
  );
}

export default About;
