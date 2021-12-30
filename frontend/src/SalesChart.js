import React, { useState, useEffect } from 'react';
import './index.css';
import Axios from 'axios';
import './App.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart, Label, ComposedChart, Legend, Bar, domain, ResponsiveContainer } from 'recharts';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircularProgressbar.css';


function getMaxSales(jsonData) {
    console.log(jsonData);
    let maxValue = 0;
    for (let i = 0; i < jsonData.length; i++) {
        if (parseInt(jsonData[i]["sales"]) > maxValue) {
            maxValue = jsonData[i]["sales"];
        }
    }
    return maxValue;
}

function SalesChart() {
    const [salesChartData, setSalesChartData] = useState({});
    const [maxValue, setMaxValue] = useState(0);

    useEffect(async () => {
        await Axios.post("/api/v1/recharts-sales", { "year": "2014", "make": "ford", "model": "fusion" }).then((response) => {
            setSalesChartData(response.data.data);
            setMaxValue(parseInt(getMaxSales(response.data.data)));
        });
    }, []);
    return (
        <div>
            <AreaChart width={800} height={350} data={salesChartData} margin={{ top: 0, right: 20, bottom: 30, left: 25 }}>

                <XAxis interval={1} dataKey="year">
                    <Label value="Year" offset={-20} position="insideBottom" />

                </XAxis>
                <YAxis domain={[0, maxValue]} label={{ value: 'Unit Sales', angle: -90, offset: -15, position: 'insideLeft' }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="green" fillOpacity={0.5} fill="green" />
            </AreaChart>
        </div>

    );
}

export default SalesChart;