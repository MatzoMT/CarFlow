import React, { useState, useEffect } from 'react';
import './index.css';
import Axios from 'axios';
import './App.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart, Label, ComposedChart, Legend, Bar, domain, ResponsiveContainer } from 'recharts';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircularProgressbar.css';
import './charts.css';


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

function SalesChart(props) {
    const [salesChartData, setSalesChartData] = useState({});
    const [maxValue, setMaxValue] = useState(0);

    useEffect(async () => {
        await Axios.post("/api/v1/recharts-sales", {"make": props.make, "model": props.model }).then((response) => {
            setSalesChartData(response.data.data);
            setMaxValue(parseInt(getMaxSales(response.data.data)));
        });
    }, [props]);
    return (
        <div>
            <h2 class="chart-title">{props.make} {props.model}: Sales per Year</h2>
            <ResponsiveContainer width="95%" height={300}>
            <AreaChart width={800} height={250} data={salesChartData} margin={{ top: 0, right: 20, bottom: 30, left: 25 }}>

                <XAxis interval={1} dataKey="year">
                    <Label value="Year" offset={-20} position="insideBottom" />

                </XAxis>
                <YAxis domain={[0, maxValue]} label={{ value: 'Unit Sales', angle: -90, offset: -15, position: 'insideLeft' }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="green" fillOpacity={0.5} fill="green" />
            </AreaChart>
            </ResponsiveContainer>

        </div>

    );
}

export default SalesChart;