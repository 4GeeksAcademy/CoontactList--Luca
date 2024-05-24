import React from "react";
import { Button, Modal } from 'react-bootstrap';

function DeleteContactModal({ show, onClose, onDelete }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you 100% sure you want to delete this contact?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>If you continue, this contact will be completelly deleted.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          No
        </Button>
        <Button variant="primary" onClick={onDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteContactModal;