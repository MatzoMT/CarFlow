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
import ComplaintChart from './ComplaintYearChart.js';
import SearchBar from './SearchBar.js';
import wrench from './resources/general.png';

function getMaxComplaints(jsonData) {
    console.log(jsonData);
    console.log(jsonData["complaints"]);
    let dataAsJson = JSON.parse(jsonData);
    for (let i = 0; i < dataAsJson.length; i++) {
        console.log(dataAsJson["complaints"][i]);
    }
}

function ComplaintsChart() {
    const [complaintsChartData, setComplaintsChartData] = useState({});

    useEffect(async () => {
        await Axios.post("/api/v1/recharts-complaints", { "year": "2014", "make": "hyundai", "model": "sonata" }).then((response) => {
            setComplaintsChartData(response.data.data);
            getMaxComplaints(response.data.data);
        });
    }, []);
    return (
        <ResponsiveContainer width="95%" height={300}>
            <AreaChart width={800} height={250} data={complaintsChartData} margin={{ top: 0, right: 20, bottom: 30, left: 25 }} class="charts">
                <defs>

                </defs>
                <XAxis dataKey="year">
                    <Label value="Year" offset={-20} position="insideBottom" />

                </XAxis>
                <YAxis domain={[0, parseInt('dataMax')]} label={{ value: 'Complaints', angle: -90, offset: 0, position: 'insideLeft' }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="complaints" stroke="#BA0C2F" fillOpacity={0.5} fill="#BA0C2F" />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default ComplaintsChart;
