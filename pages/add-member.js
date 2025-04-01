import React, { useState, useEffect } from "react";
import { FaUser, FaBirthdayCake, FaLink, FaCalendarAlt, FaUpload, FaIdCard } from "react-icons/fa";
import "./AddMember.css";

const AddMember = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [dob, setDob] = useState("");
    const [relation, setRelation] = useState("");
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [username, setUsername] = useState("");
    const [familyId, setFamilyId] = useState("");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedFamilyId = localStorage.getItem("familyId");
        setUsername(storedUsername || "User");
        setFamilyId(storedFamilyId || "");
    }, []);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !age || !dob || !relation || !photo || !familyId) {
            setFeedback("⚠️ Please fill in all fields and upload a photo.");
            return;
        }
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("dob", dob);
        formData.append("relation", relation);
        formData.append("photo", photo);
        formData.append("username", username);
        formData.append("familyId", familyId);
    
        try {
            const response = await fetch("http://localhost:5000/api/add-member", {
                method: "POST",
                body: formData,  // Don't set Content-Type manually
            });
            const data = await response.json();
            setFeedback(data.message);
            if (data.message.includes("successful")) {
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 1000);
            }
        } catch (error) {
            setFeedback("❌ Error adding member.");
        }
    };
    

    return (
        <div className="add-member-container">
            <h2>👨‍👩‍👦 Add Family Member</h2>
            {feedback && <div className="feedback">{feedback}</div>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaBirthdayCake className="input-icon" />
                    <input
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaCalendarAlt className="input-icon" />
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaLink className="input-icon" />
                    <input
                        type="text"
                        placeholder="Relation"
                        value={relation}
                        onChange={(e) => setRelation(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaIdCard className="input-icon" />
                    <input
                        type="text"
                        placeholder="Family ID"
                        value={familyId}
                        onChange={(e) => setFamilyId(e.target.value)}
                        required
                    />
                </div>
                <div className="photo-upload">
                    <label className="photo-label" htmlFor="photoInput">
                        <FaUpload /> Upload Photo
                    </label>
                    <input
                        type="file"
                        id="photoInput"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{ display: "none" }}
                    />
                    {preview && (
                        <img
                            className="photo-preview"
                            src={preview}
                            alt="Preview"
                        />
                    )}
                </div>
                <button type="submit" className="add-btn">➕ Add Member</button>
            </form>
        </div>
    );
};

export default AddMember;
