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
    let maxSales = 0;
    for (let i = 0; i < jsonData.length; i++) {
        if (parseInt(jsonData[i]["sales"]) > maxSales) {
            maxSales = jsonData[i]["sales"];
        }
    }
    return maxSales;
}

function getMaxComplaints(jsonData) {
    let maxComplaints = 0;
    for (let i = 0; i < jsonData.length; i++) {
        if (parseInt(jsonData[i]["complaints"]) > maxComplaints) {
            maxComplaints = jsonData[i]["complaints"];
        }
    }
    return maxComplaints;
}

function ComplaintsSalesChart(props) {
    const [rechartsData, setRechartsData] = useState({});
    const [maxSales, setMaxSales] = useState(0);
    const [maxComplaints, setMaxComplaints] = useState(0);

    useEffect(async () => {
        await Axios.post("/api/v1/recharts", {"make": props.make, "model": props.model }).then((response) => {
            setRechartsData(response.data.data);
            setMaxSales(parseInt(getMaxSales(response.data.data)));
            setMaxComplaints(parseInt(getMaxComplaints(response.data.data)));
            console.log(response.data.data);
        });
    }, [props]);

    return (
        <div>
            <h2 class="chart-title">{props.make} {props.model}: Complaints and Sales per Year</h2>
            <ComposedChart width={800} height={350} data={rechartsData} margin={{ top: 0, right: 100, bottom: 30, left: 30 }}  class="charts">
                <XAxis interval={1} dataKey="year">
                <Label value="Year" offset={-10} position="insideBottom" />

                </XAxis>
                <YAxis yAxisId={2} orientation="right" label={{ value: 'Complaints', angle: 90, dx: 30 }} domain={[0, maxComplaints]} />

                <YAxis yAxisId={1} orientation="left" label={{ value: 'Sales', angle: -90, dx: -50 }} domain={[0, maxSales]} />
                <Tooltip />
                <Legend wrapperStyle={{bottom: 0}} layout="horizontal" verticalAlign="bottom" align="center" />
                <CartesianGrid strokeDasharray="3 3" />
                <Line yAxisId={1} type="monotone" dataKey="sales" lineSize={40} fill="#413ea0" />
                <Line yAxisId={2} type="monotone" dataKey="complaints" stroke="#ff0000" />
            </ComposedChart>
        </div>

    );

}

export default ComplaintsSalesChart;