import React, { useState } from 'react';
import HotelCard from '../components/HotelCard';
import SearchFilter from '../components/SearchFilter';

function HotelsPage() {
  // Sample hotel data
  const sampleHotels = [
    {
      id: 1,
      name: 'Grand Luxury Hotel',
      rating: 5,
      pricePerNight: 250,
      description: 'Experience luxury at its finest with world-class amenities.',
      image: 'https://via.placeholder.com/300x200?text=Grand+Luxury',
      amenities: ['WiFi', 'Pool', 'Gym', 'Spa'],
    },
    {
      id: 2,
      name: 'Comfort Inn & Suites',
      rating: 4,
      pricePerNight: 120,
      description: 'Perfect for business and leisure travelers.',
      image: 'https://via.placeholder.com/300x200?text=Comfort+Inn',
      amenities: ['WiFi', 'Parking', 'Gym'],
    },
    {
      id: 3,
      name: 'Budget Stay Hostel',
      rating: 3,
      pricePerNight: 50,
      description: 'Affordable accommodation for backpackers.',
      image: 'https://via.placeholder.com/300x200?text=Budget+Stay',
      amenities: ['WiFi'],
    },
    {
      id: 4,
      name: 'Beachfront Paradise Resort',
      rating: 5,
      pricePerNight: 300,
      description: 'Stunning ocean views and private beach access.',
      image: 'https://via.placeholder.com/300x200?text=Beachfront',
      amenities: ['WiFi', 'Pool', 'Spa', 'Parking'],
    },
    {
      id: 5,
      name: 'Mountain View Lodge',
      rating: 4,
      pricePerNight: 180,
      description: 'Peaceful retreat in the heart of nature.',
      image: 'https://via.placeholder.com/300x200?text=Mountain+View',
      amenities: ['WiFi', 'Gym', 'Parking'],
    },
    {
      id: 6,
      name: 'City Center Boutique Hotel',
      rating: 4,
      pricePerNight: 160,
      description: 'Modern hotel in the heart of downtown.',
      image: 'https://via.placeholder.com/300x200?text=Boutique',
      amenities: ['WiFi', 'Pool', 'Gym'],
    },
  ];

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 500,
    ratings: [],
    amenities: [],
  });

  const filteredHotels = sampleHotels.filter((hotel) => {
    const priceMatch =
      hotel.pricePerNight >= filters.minPrice &&
      hotel.pricePerNight <= filters.maxPrice;

    const ratingMatch =
      filters.ratings.length === 0 || filters.ratings.includes(hotel.rating);

    const amenityMatch =
      filters.amenities.length === 0 ||
      filters.amenities.some((amenity) => hotel.amenities.includes(amenity));

    return priceMatch && ratingMatch && amenityMatch;
  });

  return (
    <main>
      <h1 style={{ marginBottom: '30px' }}>Find Your Perfect Hotel</h1>
      <div className="filter-container">
        <SearchFilter filters={filters} onFilterChange={setFilters} />
        <div>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            Found <strong>{filteredHotels.length}</strong> hotels
          </p>
          <div className="hotels-grid">
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                <p>No hotels match your criteria. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default HotelsPage;
