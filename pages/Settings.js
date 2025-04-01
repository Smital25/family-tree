import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  // State for different settings
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+123456789",
    address: "123 Main Street, City",
  });

  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [treeView, setTreeView] = useState("binary");
  const [familyPrivacy, setFamilyPrivacy] = useState("public");
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleThemeToggle = () => setTheme(theme === "light" ? "dark" : "light");
  const handleNotificationsToggle = () => setNotifications(!notifications);
  const handleDeleteAccount = () => setShowDeletePopup(true);

  return (
    <div className="settings-container">
      <h2>⚙️ Settings</h2>

      {/* User Profile Settings */}
      <div className="settings-section">
        <h3>👤 Profile Settings</h3>
        <input type="text" name="name" value={profile.name} onChange={handleProfileChange} placeholder="Full Name" />
        <input type="email" name="email" value={profile.email} onChange={handleProfileChange} placeholder="Email" />
        <input type="tel" name="phone" value={profile.phone} onChange={handleProfileChange} placeholder="Phone" />
        <input type="text" name="address" value={profile.address} onChange={handleProfileChange} placeholder="Address" />
      </div>

      {/* Family Preferences */}
      <div className="settings-section">
        <h3>👨‍👩‍👧 Family Preferences</h3>
        <label>Tree View:</label>
        <select value={treeView} onChange={(e) => setTreeView(e.target.value)}>
          <option value="binary">Binary Tree</option>
          <option value="list">List View</option>
        </select>

        <label>Privacy:</label>
        <select value={familyPrivacy} onChange={(e) => setFamilyPrivacy(e.target.value)}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      {/* Security Settings */}
      <div className="settings-section">
        <h3>🔒 Security</h3>
        <button className="security-btn">Change Password</button>
        <button className="security-btn">Enable 2FA</button>
      </div>

      {/* Theme & Display */}
      <div className="settings-section">
        <h3>🎨 Theme & Display</h3>
        <button className="toggle-btn" onClick={handleThemeToggle}>
          {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Notifications */}
      <div className="settings-section">
        <h3>🔔 Notifications</h3>
        <label>
          <input type="checkbox" checked={notifications} onChange={handleNotificationsToggle} /> Enable Notifications
        </label>
      </div>

      {/* Delete Account */}
      <div className="settings-section">
        <h3>🚨 Danger Zone</h3>
        <button className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="delete-popup">
          <p>Are you sure you want to delete your account? This action is irreversible.</p>
          <button className="cancel-btn" onClick={() => setShowDeletePopup(false)}>Cancel</button>
          <button className="confirm-btn">Yes, Delete</button>
        </div>
      )}
    </div>
  );
};

export default Settings;
