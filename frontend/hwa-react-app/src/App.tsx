import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MapProvider } from 'react-map-gl';
import MapBox from './components/Map/MapBox';
import NavBar from './components/NavBar';

// Dashboard
// MapBox
// Blog
//

function App() {
  return (
    <div className="App">
      <MapProvider>
        <NavBar />
        <MapBox />
      </MapProvider>
    </div>
  );
}

export default App;
