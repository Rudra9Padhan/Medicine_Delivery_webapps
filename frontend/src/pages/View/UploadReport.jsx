import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UploadReport.css"; // Import the CSS file

function UploadReport() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload file
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:4000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
      fetchFiles(); // Refresh file list
    } catch (error) {
      alert("Error Uploading File");
    }
  };

  // Fetch files
  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:4000/files");
      setFiles(response.data);
    } catch (error) {
      alert("Error fetching files");
    }
  };

  // Delete file
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/files/${id}`);
      alert(response.data.message);
      fetchFiles(); // Refresh file list
    } catch (error) {
      alert("Error deleting file");
    }
  };

  // Fetch files on component
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="ucontainer">
      <h1 className="title">Prescription & Report Files Upload </h1>

      <div className="upload-section">
        <input
          type="file"
          className="file-input"
          onChange={handleFileChange}
        />
        <button className="upload-button" onClick={handleUpload}>
          Upload
        </button>
      </div>

      <h2 className="subtitle">Your File</h2>
      <ul className="file-list">
        {files.map((file) => (
          <li key={file._id} className="file-item">
            <a
              href={`http://localhost:4000/uploads/${file.filename}`}
              target="_blank"
              rel="noopener noreferrer"
              className="file-link"
            >
              {file.filename}
            </a>
            <button
              className="delete-button"
              onClick={() => handleDelete(file._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UploadReport;
