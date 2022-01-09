import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import logo from './logo.svg';
import Axios from 'axios';
import './App.css';
import MakesDropdown from './MakesDropdown.js';
import YearDropdown from './YearDropdown.js';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart, Label, ComposedChart, Legend, Bar, domain, ResponsiveContainer } from 'recharts';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircularProgressbar.css';
import abs from './resources/abs.png';
import airbag from './resources/airbag.png';
import battery from './resources/battery.png';
import cruise from './resources/cruise.png';
import engine from './resources/engine.png';
import gas from './resources/gas.png';
import seatbelt from './resources/seatbelt.png';
import steering from './resources/steering.png';
import tire from './resources/tire.png';
import highlander from './resources/highlander.jpg';
import SearchBar from './SearchBar.js';
import wrench from './resources/general.png';
import ComplaintsChart from './ComplaintsChart.js';
import SalesChart from './SalesChart.js';
import ComplaintsSalesChart from './ComplaintsSalesChart';
import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import CategoryBarChart from './CategoryBarChart.js';
import carflow from './resources/carflowlogo.png';





function initializeImage(complaint) {
    if (complaint !== undefined) {
        if (complaint.includes("BRAKE")) {
            return abs;
        } else if (complaint.includes("AIR BAG")) {
            return airbag;
        } else if (complaint.includes("ELECTRICAL")) {
            return battery;
        } else if (complaint.includes("FUEL")) {
            return gas;
        } else if (complaint.includes("BELTS")) {
            return seatbelt;
        } else if (complaint.includes("STEERING")) {
            return steering;
        } else if (complaint.includes("WHEELS")) {
            return tire;
        } else {
            return engine;
        }
    }

}

const filterPosts = (allVehicles, query) => {
    if (!query) {
        return allVehicles;
    }

    return allVehicles.filter((vehicle) => {
        const vehicleName = vehicle.toLowerCase();
        return vehicleName.includes(query);
    });
};

// Component for automakers dropdown
function CarView() {
    const [score, setScore] = useState(0);
    const [categories, setCategories] = useState([]);
    const [categoriesAmount, setCategoriesAmount] = useState([]);
    const [categoriesImages, setCategoriesImages] = useState([]);
    const [numberComplaints, setNumberComplaints] = useState(0);
    const [allVehicles, setAllVehicles] = useState([]);
    const percentage = 66;
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredVehicles = filterPosts(allVehicles, searchQuery);
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMaker, setSelectedMaker] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [imageURL, setImageURL] = useState("");

    const [count, setCount] = useState(0);

    const url = window.location.pathname.split('/').pop();

    function updateURL(vehicle) {
        document.getElementById("intro").style.display = "none";
        document.getElementById("car-view").style.display = "block";
        const url = new URL(window.location);
        //  url.searchParams.set('year', vehicle.split(' ')[0]);
        setSelectedYear(vehicle.split(' ')[0]);
        let make = vehicle.split(' ')[1];
        let model = "";
        let modelIndex = 2;


        // Case for automaker containing whitespace: ALFA ROMEO, ASTON MARTIN, LAND ROVER, MERCEDES BENZ
        if (make.includes("ALFA") || make.includes("ASTON") || make.includes("LAND") || make.includes("MERCEDES ")) {
            modelIndex = 3;
            //  url.searchParams.set('make', vehicle.split(' ')[1] + "-" + vehicle.split(' ')[2]);
            setSelectedMaker(vehicle.split(' ')[1] + " " + vehicle.split(' ')[2]);
            make = vehicle.split(' ')[1] + " " + vehicle.split(' ')[2];
        } else {
            //      url.searchParams.set('make', vehicle.split(' ')[1]);
            setSelectedMaker(vehicle.split(' ')[1]);
            make = vehicle.split(' ')[1];
        }
        //   url.searchParams.set('model', vehicle.split(' ')[modelIndex]);
        model = vehicle.split(' ')[modelIndex];
        for (let i = modelIndex + 1; i < vehicle.split(' ').length; i++) {
            model = model + " " + vehicle.split(' ')[i];
        }
        setSelectedModel(model);
        //   window.history.pushState({}, '', url);
        Axios.post("/api/v1/vehicle-picture", { "year": vehicle.split(' ')[0], "make": make, "model": model }).then((response) => {
            setImageURL(response.data.vehicleID);
            console.log(response);
        });

        Axios.post("/api/v1/complaint-categories", { "year": vehicle.split(' ')[0], "make": make, "model": model }).then((response) => {
            setCategories(Object.keys(response.data["categories"]));
            setCategoriesAmount(Object.values(response.data["categories"]));
            console.log(categories);
        });

        /*
        ALFA ROMEO
        ASTON MARTIN
        LAND ROVER 
        MERCEDES BENZ or MERCEDES-BENZ (first only)
        ROLLS R
        */
    }


    useEffect(async () => {

        await Axios.get("/api/v1/all-vehicles").then((response) => {
            setAllVehicles(response.data.data);
        });

    }, []);



    return (

        <div>
            <img src={carflow} id="logo" />

            <div id="searchbar-div">
                <Router>
                    <div>
                        <SearchBar searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            class="header-search testattu"
                        />
                        <div id="search-results">
                            {filteredVehicles.slice(0, 6).map((vehicle) => (
                                <li onClick={() => { updateURL(vehicle) }} key={vehicle}>{vehicle}</li>
                            ))}
                        </div>
                    </div>


                </Router>
            </div>
            <div id="intro">
                <div class="intro-section">
                    <h1 class="center">What is CarFlow?</h1>
                    <p class="paragraph">CarFlow is a web application that provides useful information for a car model,
                        such as its yearly sales, the number of complaints received, and other
                        important consumer or safety information. It was conceived in the wake of the
                        COVID-19 pandemic, which has crippled the global supply of cars and have made
                        new and used car prices higher than ever. The goal of CarFlow is to help
                        consumers learn more about cars they are considering before making a purchase.</p>
                        <img src={carflow} id="intro-logo" />

                    <p class="paragraph">To search a model on CarFlow, use the search bar at the top. Input
                        a desired model based on year, automaker, and model name.</p>
                </div>
                <div class="intro-section">
                    <h1 class="center">What information does CarFlow provide?</h1>
                    <p class="paragraph">CarFlow currently uses information from the National Highway Traffic
                        Safety Administration (NHTSA) to provide detailed information on complaints submitted to
                        NHTSA about a particular car model by car owners. NHTSA is an agency of the U.S. federal
                        government and is a part of the Department of Transportation. Information used by CarFlow from
                        NHTSA includes the types of complaints car owners submit and the number of complaints for
                        a car model over the years it has been sold in the United States. CarFlow also uses sales
                        information provided by CarSalesBase to display the sales of a car model over its
                        lifetime or for a specified model year.</p>
                </div>
                <div class="intro-section">
                    <h1 class="center">What technologies does CarFlow use?</h1>
                    <p class="paragraph">The frontend of CarFlow uses React JS and HTML/CSS. The backend utilizes Python for parsing data
                        on the web for car information via parsing JSON responses or web parsing. Python's Flask framework is also
                        used as a REST API that communicates between the frontend and a SQL database containing the number of complaints
                        and sales for car models. </p>
                    <p class="paragraph">Specific libraries and technologies used for this project are as follows:</p>
                    <div class="centered-list">
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
                <div class="intro-section">
                    <h1 class="center">About the Creator</h1>
                    <p class="paragraph">My name is Matthew Tzou and I am a third-year student at the University of
                        Georgia with an expected graduation date of May 2023. I spend a lot of time browsing used cars or following new developments in the automotive
                        industry, and these interests are one of the motivations for creating this project. Please reach out to me in the contact information below if you would like to connect or
                        ask me more questions about this project.</p>
                        <p class="contact">Email: mdt.tzou@gmail.com</p>
                        <p class="contact">LinkedIn: <a href="https://www.linkedin.com/in/matthew-tzou/">www.linkedin.com/in/matthew-tzou/</a></p>
                </div>


            </div>
            <div id="car-view">
                <div id="flex-container">
                    <div class="flex-child score-image left-child">
                        <img src={imageURL} id="car-img"></img>
                    </div>

                    <div class="flex-child score right-child">
                        <h1 id="car-model">{selectedYear} {selectedMaker} {selectedModel}</h1>

                        <h1 id="carflow-score">CarFlow Score</h1>
                        <div style={{ width: '10em', height: '10em' }} id="score-meter">
                            <CircularProgressbar value={percentage} text={`${percentage}`} />
                        </div>
                        <h3 class="score-header">NHTSA COMPLAINTS</h3>
                        <h3 class="score-header">SALES</h3>
                    </div>
                </div>

                <div class="gray">
                    <h1 class="header">Safety Ratings</h1>
                    <div class="tooltip">
                        <h1>NHTSA ⓘ</h1>
                        <span class="tooltiptext">The National Highway Traffic Safety Administration is an agency of the U.S. government. It's New Car Assessment Program (NCAP) rates the
                            crash worthiness for many cars sold in the U.S., and its rating is based on a 5-star system.</span>
                    </div>
                    <br></br><br></br>

                    <div class="tooltip">
                        <h1>IIHS ⓘ</h1>
                        <span class="tooltiptext">The Insurance Institute for Highway Safety is an independent organization that
                            is funded by insurance companies and also conducts safety ratings on automobiles. Its crash tests are
                            considered to be more difficult than crash tests conducted by NHTSA.</span>
                    </div>

                    <h1 class="header">Complaints</h1>
                    <h2 class="smaller-header">Reported by NHTSA</h2>
                    <div id="categories-div">
                        <h1>Most Common Complaint Types</h1>
                        <h2 class="nonbold category">{categories[0]}{/*categoriesAmount[0]*/}<img align="right" src={initializeImage(categories[0])} class="complaint-icon"></img></h2>
                        <h2 class="nonbold category">{categories[1]}{/*categoriesAmount[1]*/}<img align="right" src={initializeImage(categories[1])} class="complaint-icon"></img></h2>
                        <h2 class="nonbold category">{categories[2]}{/*categoriesAmount[2]*/}<img align="right" src={initializeImage(categories[2])} class="complaint-icon"></img></h2>
                    </div>
                </div>
                <div>
                    <h1 class="header">Metrics</h1>
                    <h2 class="smaller-header">Car Sales and Complaints</h2>
                    <div id="bar-chart">
                        <ResponsiveContainer width="95%" height={300}>
                            <CategoryBarChart year={selectedYear} make={selectedMaker} model={selectedModel} />
                        </ResponsiveContainer>
                    </div>
                    <div class="charts">
                        <ResponsiveContainer width="95%" height={300}>
                            <ComplaintsChart make={selectedMaker} model={selectedModel} />
                        </ResponsiveContainer>
                    </div>
                    <div class="charts">
                        <ResponsiveContainer width="95%" height={300}>
                            <SalesChart make={selectedMaker} model={selectedModel} />
                        </ResponsiveContainer>
                    </div>
                    <div class="charts final-chart">
                        <ResponsiveContainer width="95%" height={300}>
                            <ComplaintsSalesChart make={selectedMaker} model={selectedModel} />
                        </ResponsiveContainer>
                    </div>


                </div>
            </div>



        </div >
    );
}

export default CarView;