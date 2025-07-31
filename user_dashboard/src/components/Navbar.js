import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light" style={{ marginLeft: "250px" }}>
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">User Dashboard</span>
        <span className="text-secondary">Admin</span>
      </div>
    </nav>
  );
}
