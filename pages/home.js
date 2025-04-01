import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the new CSS file
import family1 from "../assets/family1.avif";
import family2 from "../assets/family2.avif";
import family3 from "../assets/family3.jpg";
import family4 from "../assets/family4.webp";
import benefit1 from "../assets/benefit1.avif";
import benefit2 from "../assets/benefit2.png";
import feature1 from "../assets/feature1.jpg";
import feature2 from "../assets/feature2.webp";
import step1 from "../assets/step1.webp";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.jpg";      // Change step2 to step3

const FamilyTreeHome = () => {
  const [popupImage, setPopupImage] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo">🌳 Family Tree Legacy</div>
      </header>
      
      
      {/* Hero Section */}
      <section className="hero">
    <h1>CONNECTING GENERATIONS</h1>
    <p>Discover your family's history and preserve your legacy.</p>
    <div className="btn-container">
    <button className="btn" onClick={() => navigate("/login")}>Login</button>
    <button className="btn" onClick={() => navigate("/signup")}>SignUp</button>
    </div>
    </section>


{/* Family Tree Cards with Reviews */}
<section className="floating-section">
  <h2>🌟 Our Family Stories & Reviews</h2>
  <div className="card-container">
    {[
      { img: family1, name: "Emily Johnson", review: "Exploring my family tree was an emotional journey!" },
      { img: family2, name: "Michael Smith", review: "Amazing platform to connect with my roots!" },
      { img: family3, name: "Sophia Lee", review: "I discovered relatives I never knew existed!" },
      { img: family4, name: "Daniel Brown", review: "A beautiful way to preserve our legacy!" },
    ].map((person, index) => (
      <div key={index} className="floating-card" onClick={() => setPopupImage(person.img)}>
        <img src={person.img} alt={person.name} />
        <h3>{person.name}</h3>
        <p className="review-text">{person.review}</p>
      </div>
    ))}
  </div>
</section>


{/* Benefits Section */}
<section className="template-section">
  <h2>🌱 Why Create a Family Tree?</h2>
  <div className="template-container">
    <div className="benefit-card">
      <img src={benefit1} alt="Benefit 1" />
      <h3>Preserve Family Heritage</h3>
      <p>Keep track of your family's rich history and pass it on to future generations.</p>
    </div>

    <div className="benefit-card">
      <img src={benefit2} alt="Benefit 2" />
      <h3>Strengthen Family Bonds</h3>
      <p>Reconnect with distant relatives and strengthen relationships across generations.</p>
    </div>
  </div>
</section>


{/* Features Section */}
<section className="floating-section">
  <h2>🛠 Features</h2>
  <div className="card-container">
    <div className="feature-card" onClick={() => setPopupImage(feature1)}>
      <img src={feature1} alt="Feature 1" />
      <h3>Interactive 3D Family Tree</h3>
      <p>Visualize your family connections in an interactive 3D model.</p>
    </div>

    <div className="feature-card" onClick={() => setPopupImage(feature2)}>
      <img src={feature2} alt="Feature 2" />
      <h3>Drag & Drop Relationship Mapping</h3>
      <p>Effortlessly link family members with a user-friendly drag-and-drop interface.</p>
    </div>
  </div>
</section>


     
{/* Steps to Build Your Family Tree */}
<section className="template-section">
  <h2>📜 Steps to Build Your Tree</h2>
  <div className="template-container">
    
    <div className="step-card">
      <img src={step1} alt="Step 1" />
      <h3>Step 1: Login / Register</h3>
      <p>Create an account to start building your family tree.</p>
    </div>

    <div className="step-card">
      <img src={step2} alt="Step 2" /> 
      <h3>Step 2: Add Members & Memories</h3>
      <p>Add your family members and upload memorable moments.</p>
    </div>

    <div className="step-card">
      <img src={step3} alt="Step 3" /> 
      <h3>Step 3: View & Expand Your Family Tree</h3>
      <p>Explore your family connections in an interactive format.</p>
    </div>
  </div>
</section>

<section className="about-section">
  <h2>📌 About Us</h2>
  <div className="about-container">
    <div className="about-content">
      <p>
        Welcome to <strong>Family Tree Legacy</strong> – a platform dedicated to preserving your family's history and connections.  
        Our mission is to help individuals and families **document their lineage, store memories, and cherish relationships**.
      </p>
      <p>
        With advanced **3D visualization, real-time collaboration, and AI-powered ancestry suggestions**, we make it easy for you 
        to explore and expand your family tree.
      </p>
    </div>
    </div>
    </section>


      {/* Pop-up Image View */}
      {popupImage && (
        <div className="popup" onClick={() => setPopupImage(null)}>
          <img src={popupImage} alt="Popup" />
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div>
          <h3>📢 Latest Updates</h3>
          <p>📅 15 Mar 2025 - AI-powered ancestry insights.</p>
          <p>📅 10 Mar 2025 - Enhanced 3D family tree visualization.</p>
        </div>
        <div>
          <h3>📞 Contact Us</h3>
          <p>📧 Email: support@familytree.com</p>
          <p>📞 Phone: +123 456 7890</p>
        </div>
      </footer>
    </div>
  );
};

export default FamilyTreeHome;
