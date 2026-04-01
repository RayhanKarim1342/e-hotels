import React, { useState } from "react";

function CustomerSearchPage() {
  const [searchParams, setSearchParams] = useState({
    startDate: "",
    endDate: "",
    capacity: "",
    area: "",
    chain: "",
    category: "",
    totalRooms: "",
    maxPrice: "",
  });

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert("Searching with criteria: " + JSON.stringify(searchParams));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search for Available Rooms</h2>
      <form
        onSubmit={handleSearch}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          maxWidth: "600px",
        }}
      >
        <div>
          <label>Start Date:</label>
          <br />
          <input
            type="date"
            name="startDate"
            value={searchParams.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <br />
          <input
            type="date"
            name="endDate"
            value={searchParams.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Room Capacity:</label>
          <br />
          <select
            name="capacity"
            value={searchParams.capacity}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </select>
        </div>

        <div>
          <label>Area (City):</label>
          <br />
          <input
            type="text"
            name="area"
            value={searchParams.area}
            onChange={handleChange}
            placeholder="e.g. New York"
          />
        </div>

        <div>
          <label>Hotel Chain:</label>
          <br />
          <select
            name="chain"
            value={searchParams.chain}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="Marriott">Marriott</option>
            <option value="Hilton">Hilton</option>
            <option value="Hyatt">Hyatt</option>
            <option value="Wyndham">Wyndham</option>
            <option value="Choice Hotels">Choice Hotels</option>
          </select>
        </div>

        <div>
          <label>Category (Stars):</label>
          <br />
          <select
            name="category"
            value={searchParams.category}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        <div>
          <label>Total Rooms in Hotel:</label>
          <br />
          <input
            type="number"
            name="totalRooms"
            value={searchParams.totalRooms}
            onChange={handleChange}
            min="1"
            placeholder="Minimum rooms"
          />
        </div>

        <div>
          <label>Max Price ($):</label>
          <br />
          <input
            type="number"
            name="maxPrice"
            value={searchParams.maxPrice}
            onChange={handleChange}
            min="1"
            placeholder="e.g. 200"
          />
        </div>

        <button type="submit" style={{ gridColumn: "span 2", padding: "10px" }}>
          Search Rooms
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h3>Available Rooms</h3>
      <p>Results will appear here...</p>
    </div>
  );
}

export default CustomerSearchPage;
