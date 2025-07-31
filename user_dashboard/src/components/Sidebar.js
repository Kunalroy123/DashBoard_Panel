import React from "react";
import { FaUsers, FaHome } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 position-fixed" style={{ width: "250px" }}>
      <h4 className="p-3 border-bottom">Dashboard</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link text-white" href="/"><FaHome /> Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/"><FaUsers /> Users</a>
        </li>
      </ul>
    </div>
  );
}
