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
import SearchBar from './SearchBar.js';
import wrench from './resources/general.png';
import ComplaintsChart from './ComplaintsChart.js';
import SalesChart from './SalesChart.js';
import ComplaintsSalesChart from './ComplaintsSalesChart';
import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import CategoryBarChart from './CategoryBarChart.js';
import carflow from './resources/carflowlogo.png';
import fivestar from './resources/fivestar.png';
import fourstar from './resources/fourstar.png';
import threestar from './resources/threestar.png';
import twostar from './resources/twostar.png';
import onestar from './resources/onestar.png';
import norating from './resources/norating.png';
import './SafetyView.css';

function initializeStars(rating) {
    if (rating !== undefined) {
        if (rating == 5) {
            return fivestar;
        } else if (rating == 4) {
            return fourstar;
        } else if (rating == 3) {
            return threestar;
        } else if (rating == 2) {
            return twostar;
        } else if (rating == 1) {
            return onestar;
        } else {
            return '';
        }
    }
}

function SafetyView(props) {
    const [safetyNHTSA, setSafetyNHTSA] = useState({});

    useEffect(async () => {
        await Axios.post("/api/v1/safety-nhtsa", { "year": props.year, "make": props.make, "model": props.model }).then((response) => {
            console.log(response.data.safetyInfo);
            setSafetyNHTSA(response.data.safetyInfo);
        });

    }, [props.year, props.make, props.model]);

    return (
        <div>
            <h1 class="header">Safety</h1>
            <h1 class="safety-header">NHTSA</h1>
            <p class="paragraph">
                The National Highway Traffic Safety Administration is an agency of the U.S. government. It's New Car Assessment Program (NCAP) rates the
                crash worthiness for many cars sold in the U.S., and its rating is based on a 5-star system.
            </p>
            <div class="ratings">
                <div class="ratings-line underline"><h1>Overall Crash Rating <img src={( initializeStars(safetyNHTSA["OverallRating"]) !== '') ? initializeStars(safetyNHTSA["OverallRating"]) : norating} class="stars"></img></h1></div>
                <div class="ratings-line"><h2>Frontal Crash Rating <img src={(initializeStars(safetyNHTSA["OverallFrontCrashRating"]) !== '') ? initializeStars(safetyNHTSA["OverallFrontCrashRating"]) : norating} class="stars"></img></h2></div>
                <div class="ratings-line"><h4>Front Driver <img src={(initializeStars(safetyNHTSA["FrontCrashDriversideRating"]) !== '') ? initializeStars(safetyNHTSA["FrontCrashDriversideRating"]) : norating} class="stars"></img></h4></div>
                <div class="ratings-line underline"><h4>Front Passenger <img src={(initializeStars(safetyNHTSA["FrontCrashPassengersideRating"]) !== '') ? initializeStars(safetyNHTSA["FrontCrashPassengersideRating"]) : norating} class="stars"></img></h4></div>
                <div class="ratings-line"><h2>Side Crash Rating <img src={(initializeStars(safetyNHTSA["OverallSideCrashRating"]) !== '') ? initializeStars(safetyNHTSA["OverallSideCrashRating"]) : norating} class="stars"></img></h2></div>
                <div class="ratings-line"><h4>Driver <img src={(initializeStars(safetyNHTSA["SideCrashDriversideRating"]) !== '') ? initializeStars(safetyNHTSA["SideCrashDriversideRating"]) : norating} class="stars"></img></h4></div>
                <div class="ratings-line underline"><h4>Rear Passenger <img src={(initializeStars(safetyNHTSA["SideCrashPassengersideRating"]) !== '') ? initializeStars(safetyNHTSA["SideCrashPassengersideRating"]) : norating} class="stars"></img></h4></div>
                <div class="ratings-line"><h2>Rollover Rating <img src={(initializeStars(safetyNHTSA["RolloverRating"]) !== '') ? initializeStars(safetyNHTSA["RolloverRating"]) : norating} class="stars"></img></h2></div>
            </div>


            <br></br><br></br>

            <h1 class="safety-header">IIHS</h1>
            <p class="paragraph">
                The Insurance Institute for Highway Safety is an independent organization that
                is funded by insurance companies and also conducts safety ratings on automobiles. Its crash tests are
                considered to be more difficult than crash tests conducted by NHTSA.
            </p>

        </div>
    );
}

export default SafetyView;