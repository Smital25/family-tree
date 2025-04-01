import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for routing
import "./FamilyTree.css"; // Ensure the CSS file is properly imported

const FamilyTree = () => {
    const [familyTree, setFamilyTree] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize navigate hook for routing

    useEffect(() => {
        // Fetch the family tree on mount
        fetchFamilyTree();
    }, []);

    const fetchFamilyTree = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/get-family-tree");
            const data = await response.json();
            if (response.ok) {
                setFamilyTree(data.family_tree);
            } else {
                setError(data.message || "Error fetching family tree");
            }
        } catch (error) {
            setError("Error fetching family tree");
        }
    };

    // Handle the back button click to route back to the dashboard
    const handleBackClick = () => {
        navigate("/dashboard");  // Navigate to the dashboard route
    };

    return (
        <div className="family-tree-container">
            <h2 className="title">Family Tree</h2>
            {error && <div className="error-message">{error}</div>}
            {familyTree.length === 0 ? (
                <div className="no-members">No family members found.</div>
            ) : (
                <div className="family-members">
                    {familyTree.map((member, index) => (
                        <div key={index} className="family-member-card">
                            <div className="member-info">
                                <div className="member-name">
                                    {member.name}
                                </div>
                                <div className="member-relation">
                                    ({member.relation})
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button className="back-button" onClick={handleBackClick}>
                Back to Dashboard
            </button>
        </div>
    );
};

export default FamilyTree;
