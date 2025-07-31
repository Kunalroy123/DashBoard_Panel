import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import UserTable from "./components/UserTable";
import "./App.css"; // <-- Make sure to import CSS

function App() {
  return (
    <div className="app-wrapper d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1">
        <Navbar />
        <div className="container-fluid px-4 py-3">
          <UserTable />
        </div>
      </div>
    </div>
  );
}

export default App;
