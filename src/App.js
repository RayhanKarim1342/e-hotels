import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import HotelsPage from "./pages/HotelsPage";
import BookingPage from "./pages/BookingPage";
import ReservationsPage from "./pages/ReservationsPage";
import CustomerSearchPage from "./pages/CustomerSearchPage";
import EmployeePage from "./pages/EmployeePage";
import AdminPage from "./pages/AdminPage";
import ViewsPage from "./pages/ViewsPage";
import "./App.css";

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
          <Route path="/search" element={<CustomerSearchPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/views" element={<ViewsPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route
            path="/booking/:hotelId"
            element={<BookingPage onBook={handleBooking} />}
          />
          <Route
            path="/reservations"
            element={<ReservationsPage reservations={reservations} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
