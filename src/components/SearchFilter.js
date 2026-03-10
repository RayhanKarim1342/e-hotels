import React from 'react';

function SearchFilter({ filters, onFilterChange }) {
  return (
    <div className="filters">
      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="form-group">
          <label>Min: ${filters.minPrice}</label>
          <input
            type="range"
            min="0"
            max="500"
            value={filters.minPrice}
            onChange={(e) =>
              onFilterChange({ ...filters, minPrice: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="form-group">
          <label>Max: ${filters.maxPrice}</label>
          <input
            type="range"
            min="0"
            max="500"
            value={filters.maxPrice}
            onChange={(e) =>
              onFilterChange({ ...filters, maxPrice: parseInt(e.target.value) })
            }
          />
        </div>
      </div>

      <div className="filter-section">
        <h3>Star Rating</h3>
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="filter-option">
            <input
              type="checkbox"
              id={`star-${star}`}
              checked={filters.ratings.includes(star)}
              onChange={(e) => {
                const newRatings = e.target.checked
                  ? [...filters.ratings, star]
                  : filters.ratings.filter((r) => r !== star);
                onFilterChange({ ...filters, ratings: newRatings });
              }}
            />
            <label htmlFor={`star-${star}`}>
              {'⭐'.repeat(star)} {star} Star
            </label>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3>Amenities</h3>
        {['WiFi', 'Pool', 'Gym', 'Parking', 'Spa'].map((amenity) => (
          <div key={amenity} className="filter-option">
            <input
              type="checkbox"
              id={`amenity-${amenity}`}
              checked={filters.amenities.includes(amenity)}
              onChange={(e) => {
                const newAmenities = e.target.checked
                  ? [...filters.amenities, amenity]
                  : filters.amenities.filter((a) => a !== amenity);
                onFilterChange({ ...filters, amenities: newAmenities });
              }}
            />
            <label htmlFor={`amenity-${amenity}`}>{amenity}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchFilter;
