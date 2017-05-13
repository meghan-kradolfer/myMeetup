import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';

const DeleteConfirm = ({open, close, remove, component}) => (
  <Modal show={open === component.id} onHide={close} >
    <Modal.Body>
      <Modal.Header closeButton>
        <h3 className="text-center mb-1">Are you sure you want to remove <span>{component.name}</span>?</h3>
        <hr />
      </Modal.Header>
      <Row>
        <Col md={6} className="form-group">
          <button type="submit" className="btn btn-block btn-default" onClick={() => close()} >
            Cancel
          </button>
        </Col>
        <Col md={6} className="form-group">
          <button type="submit" className="btn btn-block btn-secondary" onClick={() => {remove(component); close()}}>
            Confirm
          </button>
        </Col>
      </Row>
    </Modal.Body>
  </Modal>
);

export default DeleteConfirm