import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";

const Registration = () => {
    const [formData, setFormData] = useState({
        familyId: "",
        name: "",
        contact: "",
        age: "",
        email: "",
        dob: "",
        gender: "Male",
        address: "",
        username: "",
        password: "",
        photo: null,
    });

    const [feedback, setFeedback] = useState(""); // User feedback messages
    const [loading, setLoading] = useState(false); // Button loading state
    const navigate = useNavigate(); // Navigate after successful signup

    // Handle text input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input change
   // Handle file input change
const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        setFormData((prevData) => ({
            ...prevData,
            photo: e.target.files[0],
        }));
        setFeedback(`✅ File selected: ${e.target.files[0].name}`);
    } else {
        setFeedback("❌ No file selected.");
    }
};


    // Form submission with validation
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading state

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                body: formDataToSend,
            });

            const result = await response.json();
            setLoading(false); // Hide loading state

            if (response.ok) {
                setFeedback("✅ Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000); // Redirect after 2 sec
            } else {
                setFeedback(`❌ ${result.message}`); // Show error message
            }
        } catch (error) {
            setFeedback("❌ Error during registration. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>👨‍👩‍👦 Family Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>🏠 Family ID:</label>
                        <input type="text" name="familyId" value={formData.familyId} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>👤 Full Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>📞 Contact Number:</label>
                        <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>🎂 Age:</label>
                        <input type="number" name="age" min="1" value={formData.age} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>📧 Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>📅 Date of Birth:</label>
                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>⚤ Gender:</label>
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>🔑 Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>🔒 Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                <div className="form-group">
                        <label>📷 Upload Photo:</label>
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            id="fileUpload"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="fileUpload" className="custom-file-upload">
                            Choose File
                        </label>
                        {formData.photo && <p className="file-preview">✅ {formData.photo.name}</p>}
                    </div>
                </div>

                <div className="form-group full-width">
                    <label>🏡 Address:</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>
                </div>

                <button type="submit" className="register-btn" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
                {feedback && <p className="feedback">{feedback}</p>}
                <p className="login-link">
                    Already registered? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Registration;
