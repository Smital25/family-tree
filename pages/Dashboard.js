import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import "./Dashboard.css";
import addMemberImg from "../assets/add-member.jpg";
import memoriesImg from "../assets/memories.jpg";
import familyTreeImg from "../assets/family-tree.webp";

const Dashboard = () => {
    const [username, setUsername] = useState("");
    const [memberCount, setMemberCount] = useState(0);
    const [memoryCount, setMemoryCount] = useState(0);
    const [generationCount, setGenerationCount] = useState(0);

    useEffect(() => {
        // Fetch the username from localStorage
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername || "User");

        // Fetch family data from the backend
        const fetchFamilyData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/family-stats");
                const data = await response.json();
                if (response.ok) {
                    setMemberCount(data.memberCount);
                    setMemoryCount(data.memoryCount);
                    setGenerationCount(data.generationCount);
                } else {
                    console.error("Error fetching family data:", data.message);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchFamilyData();
    }, []);

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <nav className="sidebar">
                <h2>📌 Dashboard</h2>
                <ul>
                    <li><Link to="/family-tree">🌳 Family Tree</Link></li>
                    <li><Link to="/add-member">➕ Add Member</Link></li>
                    <li><Link to="/memories">📷 Memories</Link></li>
                    <li><Link to="/settings">⚙ Settings</Link></li>
                    <li><Link to="/">🚪 Logout</Link></li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className="main-content">
                <header>
                    <h2>Welcome, {username || "User"}! 👋</h2>
                    <p>Here's a quick overview of your family tree.</p>
                </header>

                {/* Statistics Section */}
                <div className="stats-container">
                    <div className="stat-box">
                        <h3>👨‍👩‍👧‍👦 {memberCount}</h3>
                        <p>Family Members</p>
                    </div>
                    <div className="stat-box">
                        <h3>📷 {memoryCount}</h3>
                        <p>Memories Shared</p>
                    </div>
                    <div className="stat-box">
                        <h3>🕰️ {generationCount}</h3>
                        <p>Generations</p>
                    </div>
                </div>

                {/* Steps to Follow Section */}
                <section className="steps-guide">
                    <h2>📌 Steps to Build Your Family Tree</h2>
                    <div className="steps-wrapper">

                        {/* Step 1: Add Family Members */}
                        <div className="step-box">
                            <img src={addMemberImg} alt="Add Family Members" />
                            <h3>Step 1: Add Family Members</h3>
                            <p>Start by adding your family members, defining their relationships, and connecting generations.</p>
                        </div>

                        {/* Step 2: Upload Family Memories */}
                        <div className="step-box">
                            <img src={memoriesImg} alt="Upload Memories" />
                            <h3>Step 2: Upload Family Memories</h3>
                            <p>Share cherished moments by uploading photos, videos, and stories of your family.</p>
                        </div>

                        {/* Step 3: View Family Tree */}
                        <div className="step-box">
                            <img src={familyTreeImg} alt="View Family Tree" />
                            <h3>Step 3: View Your Family Tree</h3>
                            <p>Visualize your family lineage in a structured tree format with easy navigation.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
