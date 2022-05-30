import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './App.css';
import './CarView.css';
import CarView from './CarView.js';
import carflow from './resources/carflowlogo.png';



ReactDOM.render(
  <React.StrictMode>

    <CarView />

    <div id="intro">
                <div className="intro-section">
                    <h1 className="center">What is CarFlow?</h1>
                    <p className="paragraph">CarFlow is a web application that provides useful information for a car model,
                        such as its yearly sales, the number of complaints received, and other
                        important consumer or safety information. It was conceived in the wake of the
                        COVID-19 pandemic, which has crippled the global supply of cars and have made
                        new and used car prices higher than ever. The goal of CarFlow is to help
                        consumers learn more about cars they are considering before making a purchase.</p>
                        <img src={carflow} id="intro-logo" alt="Carflow logo"/>

                    <p className="paragraph">To search a model on CarFlow, use the search bar at the top. Input
                        a desired model based on year, automaker, and model name.</p>
                </div>
                <div className="intro-section">
                    <h1 className="center">What information does CarFlow provide?</h1>
                    <p className="paragraph">CarFlow currently uses information from the National Highway Traffic
                        Safety Administration (NHTSA) to provide detailed information on complaints submitted to
                        NHTSA about a particular car model by car owners. NHTSA is an agency of the U.S. federal
                        government and is a part of the Department of Transportation. Information used by CarFlow from
                        NHTSA includes the types of complaints car owners submit and the number of complaints for
                        a car model over the years it has been sold in the United States. CarFlow also uses sales
                        information provided by CarSalesBase to display the sales of a car model over its
                        lifetime or for a specified model year.</p>
                </div>
                <div className="intro-section">
                    <h1 className="center">What technologies does CarFlow use?</h1>
                    <p className="paragraph">The frontend of CarFlow uses React JS and HTML/CSS. The backend utilizes Python for parsing data
                        on the web for car information via parsing JSON responses or web parsing. Python's Flask framework is also
                        used as a REST API that communicates between the frontend and a SQL database containing the number of complaints
                        and sales for car models. </p>
                    <p className="paragraph">Specific libraries and technologies used for this project are as follows:</p>
                    <div className="centered-list">
                        <ul>JavaScript
                            <li>Axios</li>
                            <li>React JS</li>
                            <li>Recharts</li>
                        </ul>
                        <ul>Python
                            <li>BeautifulSoup</li>
                            <li>Flask</li>
                        </ul>
                    </div>

                </div>
                <div className="intro-section">
                    <h1 className="center">About the Creator</h1>
                    <p className="paragraph">My name is Matthew Tzou and I am a third-year student at the University of
                        Georgia with an expected graduation date of May 2023. I spend a lot of time browsing used cars or following new developments in the automotive
                        industry, and these interests are one of the motivations for creating this project. Please reach out to me in the contact information below if you would like to connect or
                        ask me more questions about this project.</p>
                        <p className="contact">Email: mdt.tzou@gmail.com</p>
                        <p className="contact">LinkedIn: <a href="https://www.linkedin.com/in/matthew-tzou/">www.linkedin.com/in/matthew-tzou/</a></p>
                </div>


            </div>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
