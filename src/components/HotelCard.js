import React from 'react';
import { useNavigate } from 'react-router-dom';

function HotelCard({ hotel }) {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate(`/booking/${hotel.id}`);
  };

  return (
    <div className="hotel-card">
      <div className="hotel-card-image">
        <img
          src={hotel.image || 'https://via.placeholder.com/300x200?text=Hotel'}
          alt={hotel.name}
        />
      </div>
      <div className="hotel-card-content">
        <h3 className="hotel-card-title">{hotel.name}</h3>
        <div className="hotel-rating">
          {'⭐'.repeat(hotel.rating)} {hotel.rating}/5
        </div>
        <p className="hotel-description">{hotel.description}</p>
        <div className="amenities-tags">
          {hotel.amenities && hotel.amenities.map((amenity, index) => (
            <span key={index} className="amenity-tag">
              {amenity}
            </span>
          ))}
        </div>
        <div className="hotel-price">
          ${hotel.pricePerNight.toFixed(2)} <span style={{ fontSize: '0.6em' }}>per night</span>
        </div>
        <button onClick={handleBook}>Book Now</button>
      </div>
    </div>
  );
}

export default HotelCard;
