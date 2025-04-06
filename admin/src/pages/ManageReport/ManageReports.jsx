import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageReports.css';

const ManageReports = () => {
  const [files, setFiles] = useState([]);
 
  // Fetch files
  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:4000/files");
      setFiles(response.data);
    } catch (error) {
      alert("Error fetching files");
    }
  };

  // View file
  const viewFile = (filePath) => {
    window.open(`http://localhost:4000${filePath}`, '_blank');
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

  //  files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="ucontainer">
      <h1 className='my-title'>Manage Report Files</h1>
      <ul className="report-list">
      {files.map((file) => (
          <li key={file._id} className="file-item">
            <a
              href={`http://localhost:4000${file.filePath}`}
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
};

export default ManageReports;
