import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './App.css';
import './CarView.css';
import CarView from './CarView.js';
import carflow from './resources/carflowlogo.png';
import homepage from './resources/homepage.png';
import safetypage from './resources/safetypage.png';
import commoncomplaintspage from './resources/commoncomplaints.png';
import highestcomplaintspage from './resources/highestcomplaints.png';
import metricspage from './resources/metricspage.png';



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

                    <p className="paragraph">To search a model on CarFlow, use the search bar at the top. Input a desired model
                     based on year, automaker, and model name. Once you select a particular car model, the page will update and 
                     reflect the information stored for that model.</p>
                </div>
                <img src={homepage} alt="Carflow homepage" className="website-images"></img>

                <div className="intro-section">
                    <h1 className="center">What information does CarFlow provide?</h1>
                    <p className="paragraph">CarFlow currently uses information from the National Highway Traffic Safety Administration (NHTSA) to 
                    provide detailed information on complaints submitted to NHTSA about a particular car model by car owners. NHTSA is an agency of 
                    the U.S. federal government and is a part of the Department of Transportation. Information used by CarFlow from NHTSA includes 
                    the types of complaints car owners submit, the number and type of complaints reported, and crash test ratings. CarFlow also uses
                    sales information provided by CarSalesBase to display the sales of a car model over its lifetime or for a specified model year.</p>
                </div>
                <img src={safetypage} alt="Carflow safety page" className="website-images"></img>
                <img src={commoncomplaintspage} alt="Carflow common complaints page" className="website-images"></img>

                <div className="intro-section">
                    <p className="paragraph">CarFlow will also visualize information relating to complaint types and sales and complaints statistics over a car model's lifetime.</p>
                    <img src={highestcomplaintspage} alt="Carflow highest complaints page" className="website-images"></img>
                    <img src={metricspage} alt="Carflow metrics page" className="website-images"></img>

                    <h1 className="center">What technologies does CarFlow use?</h1>
                    <p className="paragraph">The frontend of CarFlow uses React JS and HTML/CSS. The backend utilizes Python for parsing data
                        on the web for car information via parsing JSON responses or web parsing. Python's Flask framework is also
                        used as a REST API that communicates between the frontend and a SQL database containing the number of complaints
                        and sales for car models. </p>
                    <p className="paragraph">Specific libraries and technologies used for this project are as follows:</p>
                    <div className="centered-list">
                        <ul>HTML/CSS/JavaScript
                            <li>React JS - UI</li>
                            <li>Recharts - Charting Library</li>
                        </ul>
                        <ul>Python
                            <li>BeautifulSoup - Web Scraper</li>
                            <li>Flask - REST API</li>
                        </ul>
                        <ul>SQL
                            <li>MySQL</li>
                        </ul>
                        <ul>Google Cloud Platform (GCP) - Hosting frontend, backend, database

                        </ul>
                    </div>

                </div>
                <div className="intro-section">
                    <h1 className="center">About the Creator</h1>
                    <p className="paragraph">My name is Matthew Tzou and I am a fourth-year computer science student at the University of
                        Georgia with an expected graduation date of December 2022. I spend a lot of time browsing used cars or following new developments in the automotive
                        industry, and these interests are one of the motivations for creating this project. Please reach out to me in the contact information below if you would like to connect or
                        ask me more questions about this project!</p>
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
