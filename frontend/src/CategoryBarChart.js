import React, { useState, useEffect } from 'react';
import './index.css';
import Axios from 'axios';
import './App.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart, Label, ComposedChart, Legend, Bar, domain, ResponsiveContainer, BarChart } from 'recharts';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircularProgressbar.css';
import './charts.css';

function CategoryBarChart(props) {
    const [categories, setCategories] = useState({});
    const [chartHeight, setChartHeight] = useState(0);
    useEffect(async () => {
        await Axios.post("/api/v1/all-complaint-categories", { "year": props.year, "make": props.make, "model": props.model }).then((response) => {
            console.log(response.data.completeCategories);
            setCategories(response.data.completeCategories);
        });


    }, [props.year, props.make, props.model]);
    return (
        <div>
            <ResponsiveContainer width="100%" height={900}>
                <BarChart
                    width={600}
                    height={390}
                    data={categories}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="category" width={250}/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="numberComplaints" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}


export default CategoryBarChart;