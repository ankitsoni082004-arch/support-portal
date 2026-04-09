import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tickets
  const fetchTickets = () => {
    fetch("https://support-portal-backend-bnrq.onrender.com/api/tickets")
      .then((res) => res.json())
      .then((data) => setTickets(data));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Create ticket (temporary)
  const createTicket = () => {
    if (!title) return;

    const newTicket = { title };

    setTickets([...tickets, newTicket]);
    setTitle("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Support Portal 🚀</h1>

      <h2>Create Ticket</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter issue..."
      />
      <button onClick={createTicket}>Add</button>

      <h2>Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        tickets.map((t, index) => (
          <div key={index} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            {t.title}
          </div>
        ))
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);