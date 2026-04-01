import React, { useState } from "react";

function AdminPage() {
  const [activeTab, setActiveTab] = useState("customers");

  const tabs = ["Customers", "Employees", "Hotels", "Rooms"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Administration Panel</h2>
      <p>Data Management for {activeTab}</p>

      <div style={{ marginBottom: "20px" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            style={{
              fontWeight: activeTab === tab.toLowerCase() ? "bold" : "normal",
              padding: "10px",
              marginRight: "10px",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ border: "1px solid #ccc", padding: "20px" }}>
        <h3>
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          Form
        </h3>

        <form
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          <div>
            <label>Operation Type:</label>
            <select name="action" style={{ width: "100%", padding: "5px" }}>
              <option value="insert">Insert New</option>
              <option value="update">Update Existing</option>
              <option value="delete">Delete Existing</option>
            </select>
          </div>

          {activeTab === "customers" && (
            <>
              <div>
                <label>Customer ID (SSN/SIN/Driving License)</label>
                <input type="text" placeholder="ID" />
              </div>
              <div>
                <label>Name</label>
                <input type="text" placeholder="Full Name" />
              </div>
              <div>
                <label>Address</label>
                <input type="text" placeholder="Address" />
              </div>
              <div>
                <label>Date of Registration</label>
                <input type="date" />
              </div>
            </>
          )}

          {activeTab === "employees" && (
            <>
              <div>
                <label>National ID</label>
                <input type="text" placeholder="National ID" />
              </div>
              <div>
                <label>Name</label>
                <input type="text" placeholder="Full Name" />
              </div>
              <div>
                <label>Hotel ID (Assignment)</label>
                <input type="number" placeholder="Hotel ID" />
              </div>
              <div>
                <label>Role</label>
                <input type="text" placeholder="Role (e.g. Manager, Clerk)" />
              </div>
              <div>
                <label>Address</label>
                <input type="text" placeholder="Address" />
              </div>
            </>
          )}

          {activeTab === "hotels" && (
            <>
              <div>
                <label>Hotel ID</label>
                <input type="number" placeholder="Hotel ID" />
              </div>
              <div>
                <label>Chain ID</label>
                <input type="number" placeholder="Chain ID" />
              </div>
              <div>
                <label>Rating (1-5)</label>
                <input type="number" min="1" max="5" />
              </div>
              <div>
                <label>Manager National ID</label>
                <input type="text" placeholder="Manager ID" />
              </div>
              <div>
                <label>Address</label>
                <input type="text" placeholder="Address" />
              </div>
              <div>
                <label>Email</label>
                <input type="email" placeholder="Hotel Email" />
              </div>
            </>
          )}

          {activeTab === "rooms" && (
            <>
              <div>
                <label>Room ID</label>
                <input type="number" placeholder="Room ID" />
              </div>
              <div>
                <label>Hotel ID</label>
                <input type="number" placeholder="Hotel ID" />
              </div>
              <div>
                <label>Room Number</label>
                <input type="text" placeholder="Room number" />
              </div>
              <div>
                <label>Price</label>
                <input type="number" step="0.01" />
              </div>
              <div>
                <label>Capacity</label>
                <select>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>
              <div>
                <label>View</label>
                <input type="text" placeholder="Sea/City view" />
              </div>
              <div>
                <label>Status</label>
                <input type="text" placeholder="Available/Maintenance" />
              </div>
              <div>
                <label>Extendable</label>
                <input type="checkbox" />
              </div>
            </>
          )}

          <div style={{ ...{ gridColumn: "span 2" }, marginTop: "10px" }}>
            <button type="submit" style={{ padding: "10px 20px" }}>
              Execute Operation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPage;
