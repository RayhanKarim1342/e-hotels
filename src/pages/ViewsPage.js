import React, { useState } from "react";

function ViewsPage() {
  const [activeView, setActiveView] = useState("view1");

  // Static mock data since there is no backend
  const view1Data = [
    { area: "New York", available_rooms: 45 },
    { area: "Los Angeles", available_rooms: 12 },
    { area: "Chicago", available_rooms: 30 },
    { area: "Miami", available_rooms: 8 },
  ];

  const view2Data = [
    { hotel_id: 101, hotel_name: "Marriott Downtown", total_capacity: 150 },
    { hotel_id: 102, hotel_name: "Marriott Airport", total_capacity: 80 },
    { hotel_id: 201, hotel_name: "Hilton Bay", total_capacity: 200 },
    { hotel_id: 305, hotel_name: "Hyatt Central", total_capacity: 120 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Database Views Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveView("view1")}
          style={{
            fontWeight: activeView === "view1" ? "bold" : "normal",
            padding: "10px",
            marginRight: "10px",
          }}
        >
          View 1: Available Rooms Per Area
        </button>
        <button
          onClick={() => setActiveView("view2")}
          style={{
            fontWeight: activeView === "view2" ? "bold" : "normal",
            padding: "10px",
          }}
        >
          View 2: Aggregated Capacity of Hotel Rooms
        </button>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        {activeView === "view1" ? (
          <div>
            <h3>Available Rooms By Area</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Area / Address
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Total Available Rooms
                  </th>
                </tr>
              </thead>
              <tbody>
                {view1Data.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {row.area}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        textAlign: "center",
                      }}
                    >
                      {row.available_rooms}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h3>Aggregated Room Capacity Per Hotel</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Hotel ID
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Hotel Name/Location
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Total Combined Capacity
                  </th>
                </tr>
              </thead>
              <tbody>
                {view2Data.map((row, idx) => (
                  <tr key={idx}>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        textAlign: "center",
                      }}
                    >
                      {row.hotel_id}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {row.hotel_name}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        textAlign: "center",
                      }}
                    >
                      {row.total_capacity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewsPage;
