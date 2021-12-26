import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import logo from './logo.svg';
import Axios from 'axios';
import './App.css';
import './CarView.css';
import MakesDropdown from './MakesDropdown.js';
import YearDropdown from './YearDropdown.js';
import CarSearch from './CarSearch.js';
import CarView from './CarView.js';
import SearchBar from './SearchBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">


      </header>
    </div>
  );
}



ReactDOM.render(
  <React.StrictMode>

    <CarSearch />
    <CarView />

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
