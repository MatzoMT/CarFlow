import React, { useState, useEffect } from 'react';
import './index.css';
import Axios from 'axios';
import './App.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart, Label, ComposedChart, Legend, Bar, domain, ResponsiveContainer } from 'recharts';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircularProgressbar.css';
import './charts.css';



function getMaxComplaints(jsonData) {
    //console.log(jsonData);
    // let dataAsJson = JSON.parse(jsonData);
    let maxValue = 0;
    for (let i = 0; i < jsonData.length; i++) {
        if (parseInt(jsonData[i]["complaints"]) > maxValue) {
            maxValue = jsonData[i]["complaints"];
        }
    }
    return maxValue;
    /*
    let maxValue = dataAsJson["complaints"][0];
    for (let i = 0; i < dataAsJson.length; i++) {
        if (dataAsJson["complaints"][i] > maxValue) {
            maxValue = dataAsJson["complaints"][i];
        }
    }
    console.log(maxValue);
    return maxValue;
    */

}

/*
props:
make - user-defined automaker
model - user-defined car model
*/
function ComplaintsChart(props) {
    const [complaintsChartData, setComplaintsChartData] = useState({});
    const [maxValue, setMaxValue] = useState(0);

    useEffect(async () => {
        await Axios.post("https://zeta-courage-349220.ue.r.appspot.com/api/v1/recharts-complaints", { "make": props.make, "model": props.model }).then((response) => {
            setComplaintsChartData(response.data.data);
            setMaxValue(parseInt(getMaxComplaints(response.data.data)));
        });
    }, [props.year, props.make, props.model]);
    return (
        <div>
            <h2 className="chart-title">{props.make} {props.model}: NHTSA Complaints per Year</h2>
            <ResponsiveContainer width="95%" height={300}>
                <AreaChart width={800} height={250} data={complaintsChartData} margin={{ top: 0, right: 20, bottom: 30, left: 25 }} className="charts">
                    <defs>

                    </defs>
                    <XAxis interval={1} dataKey="year">
                        <Label value="Year" offset={-20} position="insideBottom" />

                    </XAxis>
                    <YAxis domain={[0, maxValue]} label={{ value: 'Complaints', angle: -90, offset: 0, position: 'insideLeft' }} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="complaints" stroke="#BA0C2F" fillOpacity={0.5} fill="#BA0C2F" />
                </AreaChart>
            </ResponsiveContainer>
        </div>

    );
}

export default ComplaintsChart;
