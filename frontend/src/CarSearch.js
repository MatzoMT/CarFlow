import React, { useState, useEffect } from 'react';
import './index.css';
import Axios from 'axios';
import './App.css';

const filterPosts = (allVehicles, query) => {
    if (!query) {
        return allVehicles;
    }

    return allVehicles.filter((vehicle) => {
        const vehicleName = vehicle.toLowerCase();
        return vehicleName.includes(query);
    });
};


// Component for automakers dropdown
function CarSearch() {
    const [years, setYears] = useState([]);
    const [models, setModels] = useState([]);
    const [yearProp, setYear] = useState("");
    const [makeSelection, setMakeSelection] = useState("");
    const [allVehicles, setAllVehicles] = useState([]);
    const yearsArray = [];

    useEffect(() => {
        // Update the document title using the browser API
        Axios.get("/api/v1/years").then((response) => {
            //console.log(response.data.years);
            setYears(response.data.years);
        });

        Axios.post("/api/v1/models", { year: "2012", make: "NISSAN" }).then((response) => {
            //console.log(response.data.models);
            setModels(response.data.models);
        });

        Axios.get("/api/v1/all-vehicles").then((response) => {
            setAllVehicles(response.data.data);
        });

    }, []);

    return (
        <div>
            {/*
            <form>
                <select name="years" id="years-dropdown">
                    <option value="" selected>Year</option>

                    {years.map((year, i) =>
                        <option value={years[i]}>{years[i]}</option>

                    )}
                </select>
                <select name="makes" id="makes">
                    <option value="" selected>Make</option>

                    {years.map((maker, i) =>
                        <option value={"bananas"}>PLACEHOLDER</option>

                    )}
                </select>
                <select name="models" id="models">
                    <option value="" selected>Model</option>

                    {models.map((maker, i) =>
                        <option value={models[i]}>{models[i]}</option>

                    )}
                </select>
                <button type="submit" id="search-button">CLick Here</button>
            </form>
*/}
        </div>
    );
}

export default CarSearch;