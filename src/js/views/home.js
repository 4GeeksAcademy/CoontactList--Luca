import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import EditContactModal from "./EditContactModal";
import DeleteContactModal from "./DeleteContactModal"; // Import DeleteContactModal here

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing delete modal
  const [selectedContact, setSelectedContact] = useState(null);

  const handleDeleteContact = (contactId) => {
    actions.deleteContact(contactId);
    setShowDeleteModal(false); // Close delete modal after deletion
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const handleSaveEditedContact = (editedContact) => {
    actions.editContact(editedContact);
    setShowEditModal(false);
  };

  const handleShowDeleteModal = (contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  return (
    <div className="container">
      <div className="phone-mockup">
        <Link to="/addContact" className="addContactBtn">
          <button className="btn btn-success" type="button">
            Add new contact
          </button>
        </Link>
        <div className="contacts-list">
          {store.contacts.map((contact) => (
            <div key={contact.id} className="contact">
              <img
                src={`https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=`}
                alt="Contact"
              />
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p>
                  <i className="fas fa-map-marker-alt"></i> Address:{" "}
                  {contact.address}
                </p>
                <p>
                  <i className="fas fa-phone"></i> Phone: {contact.phone}
                </p>
                <p>
                  <i className="fas fa-envelope"></i> Email: {contact.email}
                </p>
              </div>
              <div className="contact-actions">
                <button onClick={() => handleEditContact(contact)}>
                  <i className="fas fa-pen"></i>
                </button>
                <button onClick={() => handleShowDeleteModal(contact)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showEditModal && (
        <EditContactModal
          contact={selectedContact}
          onSave={handleSaveEditedContact}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteContactModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={() => handleDeleteContact(selectedContact.id)} // Pass onDelete function to handle deletion
        />
      )}
    </div>
  );
};