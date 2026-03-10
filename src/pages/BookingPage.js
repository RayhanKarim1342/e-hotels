import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookingPage({ onBook }) {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook({
      hotelId,
      ...formData,
      bookingDate: new Date().toISOString(),
    });
    setSubmitted(true);
    setTimeout(() => {
      navigate('/reservations');
    }, 2000);
  };

  if (submitted) {
    return (
      <main>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2 style={{ color: '#28a745', marginBottom: '20px' }}>Booking Confirmed! ✓</h2>
          <p>Thank you for your reservation.</p>
          <p style={{ marginTop: '20px', color: '#666' }}>
            Redirecting to your reservations...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Complete Your Booking</h1>
      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Guest Information</h2>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <h2 style={{ marginTop: '30px' }}>Booking Details</h2>

        <div className="form-group">
          <label htmlFor="checkIn">Check-in Date</label>
          <input
            id="checkIn"
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="checkOut">Check-out Date</label>
          <input
            id="checkOut"
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="guests">Number of Guests</label>
          <input
            id="guests"
            type="number"
            name="guests"
            min="1"
            max="10"
            value={formData.guests}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialRequests">Special Requests</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="Any special requests or requirements?"
          />
        </div>

        <button type="submit">Confirm Booking</button>
      </form>
    </main>
  );
}

export default BookingPage;
