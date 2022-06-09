import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import LineChartRoute from './routes/line-chart/line-chart.component';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation/>} >
        <Route index element={<Home/>} />
        <Route path='/line-chart' element={<LineChartRoute/>} />
      </Route>
    </Routes>
  );
}

export default App;
