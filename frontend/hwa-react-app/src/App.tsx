import React from 'react';
import { RouterProvider } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { MapProvider } from 'react-map-gl';
import MapBox from './components/Map/MapBox';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar/SideBar';
import HomePage from './routes/pages/HomePage';
import router from './routes';

function App() {
  return <div className="App"></div>;
}

export default App;
