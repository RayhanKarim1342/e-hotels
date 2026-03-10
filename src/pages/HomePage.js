import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = React.useState('');
  const [checkOut, setCheckOut] = React.useState('');
  const [guests, setGuests] = React.useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/hotels');
  };

  return (
    <main>
      <section className="hero">
        <h1>Welcome to Hotel Booking System</h1>
        <p>Find and book your perfect hotel for your next adventure</p>
      </section>

      <section className="search-container">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="checkin">Check-in Date</label>
            <input
              id="checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="checkout">Check-out Date</label>
            <input
              id="checkout"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="guests">Guests</label>
            <input
              id="guests"
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              placeholder="Enter city or destination"
              defaultValue=""
            />
          </div>
          <button type="submit">Search Hotels</button>
        </form>
      </section>

      <section style={{ marginTop: '60px' }}>
        <h2 style={{ marginBottom: '30px', fontSize: '1.8rem' }}>Why Choose Us?</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px',
          }}
        >
          <div style={{ padding: '25px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '10px', color: '#667eea' }}>💰 Best Prices</h3>
            <p>Get the best deals on hotels worldwide with our price guarantee.</p>
          </div>
          <div style={{ padding: '25px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '10px', color: '#667eea' }}>✨ Quality Selection</h3>
            <p>Browse from thousands of verified and reviewed hotels.</p>
          </div>
          <div style={{ padding: '25px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '10px', color: '#667eea' }}>🚀 Fast Booking</h3>
            <p>Complete your booking in just a few clicks with our simple process.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
