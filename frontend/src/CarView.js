import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import logo from './logo.svg';
import Axios from 'axios';
import './App.css';
import MakesDropdown from './MakesDropdown.js';
import YearDropdown from './YearDropdown.js';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart, Label, ComposedChart, Legend, Bar, domain } from 'recharts';
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
import ComplaintChart from './ComplaintYearChart.js';

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
    const [numberComplaints, setNumberComplaints] = useState(0);
    const [complaintsChartData, setComplaintsChartData] = useState({});
    const [salesChartData, setSalesChartData] = useState({});
    const [rechartsData, setRechartsData] = useState({});
    const percentage = 66;

    useEffect(async () => {
        const result = await Axios.post("/api/v1/complaint-categories", { "year": "2014", "make": "hyundai", "model": "elantra" }).then((response) => {
            setCategories(Object.keys(response.data["categories"]));
            setCategoriesAmount(Object.values(response.data["categories"]));
            console.log(categories);
        });

        const resultRecharts = await Axios.post("/api/v1/recharts-complaints", { "year": "2014", "make": "hyundai", "model": "tucson" }).then((response) => {
            setComplaintsChartData(response.data.data);
            console.log(complaintsChartData);
            console.log(response.data.data)
        });

        const resultRechartsSales = await Axios.post("/api/v1/recharts-sales", { "year": "2014", "make": "hyundai", "model": "tucson" }).then((response) => {
            setSalesChartData(response.data.data);
        });
        console.log(complaintsChartData);

        const rechartsResult = await Axios.post("/api/v1/recharts", { "year": "2014", "make": "honda", "model": "civic" }).then((response) => {
            setRechartsData(response.data.data);
        });


        /*
                const numComplaints = await Axios.post("/api/v1/complaint-categories", { "year": "2014", "make": "hyundai", "model": "elantra" }).then((response) => {
                    setCategories(Object.keys(response.data["categories"]));
                    setCategoriesAmount(Object.values(response.data["categories"]));
                    console.log(categories);
                }); */




    }, []);

    return (
        <div>
            <div id="flex-container">
                <div class="flex-child score-image left-child">
                    <img src="https://static.nhtsa.gov/images/vehicles/8584_st0640_046.png" id="car-img"></img>
                </div>

                <div class="flex-child score right-child">
                    <h1 id="car-model">2015 Emperor Habanero</h1>
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
                <div class="tooltip">NHTSA ⓘ
                    <span class="tooltiptext">The National Highway Traffic Safety Administration is an agency of the U.S. government. It's New Car Assessment Program (NCAP) rates the 
                     crash worthiness for many cars sold in the U.S., and its rating is based on a 5-star system.</span>
                </div>
                <div class="tooltip">IIHS ⓘ
                    <span class="tooltiptext">The Insurance Institute for Highway Safety is an independent organization that
                    is funded by insurance companies and also conducts safety ratings on automobiles. Its crash tests are 
                    considered to be more difficult than crash tests conducted by NHTSA.</span>
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

            <AreaChart width={800} height={250} data={complaintsChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>

                </defs>
                <XAxis dataKey="year" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="complaints" stroke="#BA0C2F" fillOpacity={0.5} fill="#BA0C2F" />
            </AreaChart>
            <br></br>
            <br></br>

            <br></br>

            <AreaChart width={800} height={250} data={salesChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>

                </defs>
                <XAxis dataKey="year" />
                <YAxis domain={[0, 3000]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="green" fillOpacity={0.5} fill="green" />
            </AreaChart>

            <ComposedChart width={800} height={350} data={rechartsData} margin={{ top: 0, right: 50, bottom: 0, left: 30 }}>
                <XAxis dataKey="time" />
                <YAxis yAxisId={1} orientation="right" label={{ value: 'Sales', angle: -90, dx: 50 }} domain={[0, 350000]} />
                <YAxis yAxisId={2} label={{ value: 'Complaints', angle: -90, dx: -30 }} domain={[0, 3000]} />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Line yAxisId={1} dataKey="sales" lineSize={40} fill="#413ea0" />
                <Line yAxisId={2} type="monotone" dataKey="complaints" stroke="#ff0000" />
            </ComposedChart>
        </div>
    );
}

export default CarView;