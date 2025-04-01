import React, { useState } from "react";
import "./Memories.css";
import { v4 as uuidv4 } from "uuid";

const Memories = () => {
    const [memories, setMemories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [location, setLocation] = useState("");
    const [comment, setComment] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle File Selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setIsModalOpen(true);
        }
    };

    // Handle Memory Submission
    const handleMemorySubmit = () => {
        if (!selectedFile || !location || !comment) {
            alert("Please fill in all details.");
            return;
        }

        const newMemory = {
            id: uuidv4(),
            imageUrl: URL.createObjectURL(selectedFile),
            date: new Date().toLocaleDateString(),
            location,
            comment,
        };

        setMemories([...memories, newMemory]);
        setSelectedFile(null);
        setLocation("");
        setComment("");
        setIsModalOpen(false);
    };

    // Handle Delete
    const handleDelete = (id) => {
        setMemories(memories.filter((memory) => memory.id !== id));
    };

    // Filter Memories
    const filteredMemories = memories.filter((memory) =>
        memory.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="memories-container">
            <h2>📸 Family Memories</h2>
            <p className="sub-text">Capture and cherish your family's best moments forever.</p>

            {/* Upload Section */}
            <div className="upload-section">
                <label htmlFor="file-upload" className="custom-file-upload">
                    📤 Upload Memory
                </label>
                <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            {/* Search Memories */}
            <input
                type="text"
                className="search-bar"
                placeholder="🔍 Search memories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* How to Search Section */}
            <div className="search-guide">
                <h3>🔍 How to Search for Memories?</h3>
                <p>Use the search bar to find memories by keywords in comments.  
                Try searching for locations, names, or special events to filter your photos.</p>
            </div>

            {/* Memories Display */}
            <div className="memories-gallery">
                {filteredMemories.length > 0 ? (
                    filteredMemories.map((memory) => (
                        <div key={memory.id} className="memory-card">
                            <img src={memory.imageUrl} alt="Memory" />
                            <div className="memory-info">
                                <p>📅 {memory.date} | 📍 {memory.location}</p>
                                <p className="comment">💬 {memory.comment}</p>
                                <button className="delete-btn" onClick={() => handleDelete(memory.id)}>❌ Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-memories">No memories found. Start by uploading your favorite moments! 😊</p>
                )}
            </div>

            {/* Modal for Image Details */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>🖼️ Add Memory Details</h3>
                        <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="preview-img" />
                        <input
                            type="text"
                            placeholder="📍 Enter Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <textarea
                            placeholder="💬 Add a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button className="save-btn" onClick={handleMemorySubmit}>✅ Save Memory</button>
                        <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>❌ Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Memories;
