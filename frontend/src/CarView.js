import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import logo from './logo.svg';
import Axios from 'axios';
import './App.css';
import MakesDropdown from './MakesDropdown.js';
import YearDropdown from './YearDropdown.js';
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

// Component for automakers dropdown
function CarView() {
    const [score, setScore] = useState(0);
    const [categories, setCategories] = useState([]);
    const [categoriesAmount, setCategoriesAmount] = useState([]);
    const [categoriesImages, setCategoriesImages] = useState([]);
    const percentage = 66;





    useEffect(async () => {
        const result = await Axios.post("/api/v1/complaint-categories", { "year": "2014", "make": "hyundai", "model": "elantra" }).then((response) => {
            setCategories(Object.keys(response.data["categories"]));
            setCategoriesAmount(Object.values(response.data["categories"]));
            console.log(categories);
        });




    }, []);


    return (
        <div>
            <div id="score">
                <h1>CarFlow Score</h1>
                <div style={{ width: 200, height: 200 }}>
                    <CircularProgressbar value={percentage} text={`${percentage}`} />
                </div>
            </div>

            <div class="gray">
                <h1 class="header">Complaints</h1>
                <h2 class="smaller-header">Reported by NHTSA</h2>
                <div id="categories-div">
                    <h1>Most Common Complaint Types</h1>
                    <h2 class="nonbold category">{categories[0]}{/*categoriesAmount[0]*/}<img align="right" src={initializeImage(categories[0])} class="complaint-icon"></img></h2>
                    <h2 class="nonbold category">{categories[1]}{/*categoriesAmount[1]*/}<img align="right" src={initializeImage(categories[1])} class="complaint-icon"></img></h2>
                    <h2 class="nonbold category">{categories[2]}{/*categoriesAmount[2]*/}<img align="right" src={initializeImage(categories[2])} class="complaint-icon"></img></h2>
                </div>
            </div>


        </div>
    );
}

export default CarView;