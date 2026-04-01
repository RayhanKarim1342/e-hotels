import React, { useState } from "react";

function EmployeePage() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Portal</h2>

      <section
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Convert Booking to Renting (Check-in)</h3>
        <form
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}
        >
          <label>
            Booking ID:{" "}
            <input type="number" placeholder="Enter Booking ID" required />
          </label>
          <label>
            Employee ID:{" "}
            <input type="text" placeholder="Enter your ID" required />
          </label>
          <label>
            Payment Amount: $<input type="number" step="0.01" required />
          </label>
          <button type="submit" style={{ maxWidth: "200px" }}>
            Check In & Rent Room
          </button>
        </form>
      </section>

      <section
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Direct Renting (Walk-in Customer)</h3>
        <form
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}
        >
          <label>
            Customer ID:{" "}
            <input type="text" placeholder="Existing Customer ID" required />
          </label>
          <label>
            Room ID: <input type="number" placeholder="Room ID" required />
          </label>
          <label>
            Check-in Date: <input type="date" required />
          </label>
          <label>
            Check-out Date: <input type="date" required />
          </label>
          <label>
            Employee ID:{" "}
            <input type="text" placeholder="Enter your ID" required />
          </label>
          <label>
            Payment Amount: $<input type="number" step="0.01" required />
          </label>
          <button type="submit" style={{ maxWidth: "200px" }}>
            Process Direct Renting
          </button>
        </form>
      </section>

      <section style={{ padding: "15px", border: "1px solid #ccc" }}>
        <h3>Add Payment to Existing Renting</h3>
        <form
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}
        >
          <label>
            Renting ID: <input type="number" required />
          </label>
          <label>
            Additional Payment Amount: $
            <input type="number" step="0.01" required />
          </label>
          <button type="submit" style={{ maxWidth: "200px" }}>
            Apply Payment
          </button>
        </form>
      </section>
    </div>
  );
}

export default EmployeePage;
