import React, { useState, useEffect } from 'react';
import './index.css';
import Axios from 'axios';
import './App.css';

// Component for automakers dropdown
function YearDropdown() {
    const [years, setYears] = useState([]);
    const yearsArray = [];

    useEffect(() => {
        // Update the document title using the browser API
        Axios.get("/api/v1/years").then((response) => {
            console.log(response.data.years);
            setYears(response.data.years);
        });


    }, []);


    return (
        <div className="App">
            <select name="makes" id="makes">
                <option value="" selected>Year</option>

                {years.map((maker, i) =>
                    <option value={"bananas"}>{years[i]}</option>

                )}
            </select>
        </div>
    );
}

export default YearDropdown;