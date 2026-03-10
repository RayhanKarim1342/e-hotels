import React from 'react';
import { Link } from 'react-router-dom';

function ReservationsPage({ reservations }) {
  const getHotelName = (hotelId) => {
    const hotels = {
      1: 'Grand Luxury Hotel',
      2: 'Comfort Inn & Suites',
      3: 'Budget Stay Hostel',
      4: 'Beachfront Paradise Resort',
      5: 'Mountain View Lodge',
      6: 'City Center Boutique Hotel',
    };
    return hotels[hotelId] || 'Hotel';
  };

  return (
    <main>
      <h1 style={{ marginBottom: '30px' }}>My Reservations</h1>

      {reservations.length > 0 ? (
        <div className="reservations-container">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-header">
                <h3>{getHotelName(reservation.hotelId)}</h3>
                <span className="reservation-status">Confirmed</span>
              </div>
              <div className="reservation-details">
                <div className="detail-item">
                  <strong>Guest Name:</strong>
                  <p>
                    {reservation.firstName} {reservation.lastName}
                  </p>
                </div>
                <div className="detail-item">
                  <strong>Email:</strong>
                  <p>{reservation.email}</p>
                </div>
                <div className="detail-item">
                  <strong>Phone:</strong>
                  <p>{reservation.phone}</p>
                </div>
                <div className="detail-item">
                  <strong>Check-in:</strong>
                  <p>{reservation.checkIn}</p>
                </div>
                <div className="detail-item">
                  <strong>Check-out:</strong>
                  <p>{reservation.checkOut}</p>
                </div>
                <div className="detail-item">
                  <strong>Guests:</strong>
                  <p>{reservation.guests}</p>
                </div>
              </div>
              {reservation.specialRequests && (
                <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
                  <strong>Special Requests:</strong>
                  <p>{reservation.specialRequests}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No Reservations Yet</h2>
          <p>You haven't made any bookings yet.</p>
          <Link
            to="/hotels"
            style={{
              marginTop: '20px',
              display: 'inline-block',
              backgroundColor: '#667eea',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Browse Hotels
          </Link>
        </div>
      )}
    </main>
  );
}

export default ReservationsPage;
