import React, { useState, useEffect } from 'react';
import './index.css';
import Axios from 'axios';
import './App.css';

// Component for automakers dropdown
function MakesDropdown() {
    const [makes, setMakes] = useState([]);
    const makesArray = [];

    useEffect(() => {
        // Update the document title using the browser API
        Axios.get("/api/v1/car-makers").then((response) => {
            console.log(response.data.carMakes);
            setMakes(response.data.carMakes);
        });
        /*
        makes.map((carmaker) =>
        makesArray.push(carmaker)
        );
        */
        const numbers = [4, 9, 16, 25];
        const newArr = numbers.map(Math.sqrt)

    }, []);




    return (
        <div className="App">
            <select name="makes" id="makes">
                <option value="" disabled selected>Make</option>

                {makes.map((maker, i) =>
                    <option value={"bananas"}>{makes[i]}</option>

                )}
            </select>
        </div>
    );
}

export default MakesDropdown;