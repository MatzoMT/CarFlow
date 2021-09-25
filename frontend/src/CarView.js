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
    const [categoriesAmount, setCategoriesAmount] = useState([])

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
            <h1>Hyvaa huomenta</h1>
            <div style={{ width: 200, height: 200 }}>
                <CircularProgressbar value={percentage} text={`${percentage}`} />
            </div>

            <h1 class="header">Complaints</h1>
            <h2 class="smaller-header">Reported by NHTSA</h2>
            <div id="categories-div">
                <h1>Most Common Complaint Types</h1>
                <h2 class="nonbold category">{categories[0]}{categoriesAmount[0]}</h2>
                <h2 class="nonbold category">{categories[1]}{categoriesAmount[1]}</h2>
                <h2 class="nonbold category">{categories[2]}{categoriesAmount[2]}</h2>
            </div>


        </div>
    );
}

export default CarView;