import React, { useEffect, useState } from 'react';
import './AdminContact.css';

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/contact');
        const result = await response.json();
        if (result.success) {
          setContacts(result.data);
        } else {
          alert('Failed to fetch contact submissions.');
        }
      } catch (error) {
        alert('An error occurred while fetching contact Submissions.');
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="admin-contact">
      <h2>Contact Submissions</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
              <td>{new Date(contact.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContact;