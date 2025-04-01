import React, { useState } from "react";
import { useNavigate,Link  } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState(""); // For user messages
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setFeedback("❌ Invalid email format.");
      return;
    }
  
    // Validate password length
    if (password.length < 6) {
      setFeedback("❌ Password must be at least 6 characters.");
      return;
    }
  
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
      setLoading(false);
  
      if (response.ok) {
        setFeedback(result.message);
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to the dashboard after successful login
        }, 1500);
      } else {
        setFeedback(result.message); // Show error message
      }
    } catch (error) {
      setFeedback("❌ Error during login. Please try again.");
      setLoading(false);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🔑 Login to Family Tree</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="📧 Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔒 Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {feedback && <p className="feedback">{feedback}</p>}
        <p className="signup-link">
          Not registered yet? <Link to="/signup">Sign Up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
