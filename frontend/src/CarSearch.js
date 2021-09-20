import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import logo from './logo.svg';
import Axios from 'axios';
import './App.css';
import MakesDropdown from './MakesDropdown.js';
import YearDropdown from './YearDropdown.js';

// Component for automakers dropdown
function CarSearch() {
    const [years, setYears] = useState([]);
    const yearsArray = [];




    return (
        <div>
            <YearDropdown />
        </div>
    );
}

export default CarSearch;