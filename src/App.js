import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MovieReservation from './components/MovieReservation';
import SeatSelection from './components/SeatSelection'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieReservation />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
      </Routes>
    </Router>
  );
};

export default App;
