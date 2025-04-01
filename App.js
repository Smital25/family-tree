import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FamilyTree from "./pages/family-tree" // Family Tree Component
import AddMember from "./pages/add-member"; // Add Member Component
import Memories from "./pages/memories"; // Memories Component
import Settings from "./pages/Settings";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/family-tree" element={<FamilyTree />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/settings" element={<Settings />} />

      </Routes>
    </Router>
  );
}

export default App;
