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

// Component for automakers dropdown
function CarView() {
    const [score, setScore] = useState(0);
    const [categories, setCategories] = useState([]);

    const percentage = 66;




    useEffect(() => {
        Axios.post("/api/v1/complaint-categories", {"year": "2014", "make": "hyundai", "model": "elantra"}).then((response) => {
            setCategories(Object.keys(response.data["categories"]));
            console.log(categories);
        });
    },[]);



    return (
        <div>
            <h1>Hyvaa huomenta</h1>
            <div style={{ width: 200, height: 200 }}>
                <CircularProgressbar value={percentage} text={`${percentage}`} />
            </div>
            <h1>MOST COMMON COMPLAINTS</h1>
            <h2>{categories}</h2>
        </div>
    );
}

export default CarView;