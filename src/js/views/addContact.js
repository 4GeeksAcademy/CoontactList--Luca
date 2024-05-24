import React, { useState, useContext } from "react";
import "../../styles/addContact.css";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export const AddContact = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [contact, setContact] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [warning, setWarning] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Validate phone number format
    if (id === "phone" && !/^(\+)?\d*$/.test(value)) {
      setWarning(
        "Please enter a valid phone number starting with '+' and containing only numbers."
      );
    } else {
      setWarning(""); // Clear warning if format is correct
    }

    setContact((prevContact) => ({ ...prevContact, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!contact.name.trim()) {
      setWarning("Name is required.");
      return;
    }

    if (!contact.email.trim() || !contact.email.includes("@")) {
      setWarning("Please provide a valid email address.");
      return;
    }

    try {
      // Create a new contact object based on form input
      const newContact = {
        name: contact.name,
        address: contact.address,
        phone: contact.phone,
        email: contact.email,
      };

      // Call the addContact action
      await actions.addContact(newContact);

      // Redirect to the home page
      navigate("/");

      // Rerender home page to show new contacts
      await actions.getContactList();
    } catch (error) {
      console.error("Error adding contact:", error.message);
      // Handle the error gracefully
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="formTitle">Add a New Contact</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name and Surname</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name and Surname"
              value={contact.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter Address"
              value={contact.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Enter Phone Number"
              value={contact.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={contact.email}
              onChange={handleInputChange}
            />
          </div>
          {warning && <div className="alert alert-warning">{warning}</div>}
          <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link to="/" className="btn btn-primary">
              Go Back Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};