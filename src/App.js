import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import HotelsPage from './pages/HotelsPage';
import BookingPage from './pages/BookingPage';
import ReservationsPage from './pages/ReservationsPage';
import './App.css';

function App() {
  const [reservations, setReservations] = useState([]);

  const handleBooking = (booking) => {
    setReservations([...reservations, { ...booking, id: Date.now() }]);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/booking/:hotelId" element={<BookingPage onBook={handleBooking} />} />
          <Route path="/reservations" element={<ReservationsPage reservations={reservations} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
