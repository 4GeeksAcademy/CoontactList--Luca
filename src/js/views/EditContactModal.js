import React, { useState } from "react";
import "../../styles/modal.css";

const EditContactModal = ({ contact, onSave, onClose }) => {
  const [editedContact, setEditedContact] = useState(contact);
  const [warnings, setWarnings] = useState({}); // Object to store warnings for each field

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    validateInput(id, value); // Validate input on change
    setEditedContact({ ...editedContact, [id]: value });
  };

  const validateInput = (id, value) => {
    if (id === "phone" && !/^(\+)?\d*$/.test(value)) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        [id]: "Please enter a valid phone number starting with '+' and containing only numbers.",
      }));
    } else {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        [id]: "", // Clear warning if format is correct
      }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!editedContact.name.trim()) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        name: "Name cannot be empty.",
      }));
      return;
    }
    // Check if there are any warnings before saving
    if (Object.values(warnings).some((warning) => warning)) {
      return; // Don't save if there are warnings
    }
    onSave(editedContact);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSave}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Edit Contact</h2>
          <div className="input-container">
            <label className="label" htmlFor="name">
              Name and Surname
            </label>
            <input
              className="input-field"
              type="text"
              id="name"
              value={editedContact.name}
              onChange={handleInputChange}
            />
            {warnings.name && (
              <div className="alert alert-warning">{warnings.name}</div>
            )}
          </div>
          <div className="input-container">
            <label className="label" htmlFor="address">
              Address
            </label>
            <input
              className="input-field"
              type="text"
              id="address"
              value={editedContact.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="phone">
              Phone number
            </label>
            <input
              className="input-field"
              type="text"
              id="phone"
              value={editedContact.phone}
              onChange={handleInputChange}
            />
            {warnings.phone && (
              <div className="alert alert-warning">{warnings.phone}</div>
            )}
          </div>
          <div className="input-container">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input-field"
              type="email"
              id="email"
              value={editedContact.email}
              onChange={handleInputChange}
            />
            {warnings.email && (
              <div className="alert alert-warning">{warnings.email}</div>
            )}
          </div>
          <button className="btn btn-success" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContactModal;