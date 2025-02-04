import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/health")
      .then((res) => setStatus(res.data.status))
      .catch(() => setStatus("Backend not reachable"));
  }, []);

  return (
    <div className="App">
      <h1>Notes App</h1>
      <p>Backend Status: {status}</p>
    </div>
  );
}

export default App;
