import React from 'react'
import { Modal } from 'react-bootstrap'

const AddGuest = ({ open, close, add }) => {
    let vals = {
        name: '',
        guests: 1
    };
    return (
        <Modal show={open} onHide={close} >
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={ e => { e.preventDefault(); add(vals); close();}}>
                    <div className="form-group">
                        <input placeholder="Event Name" type="text" id="name" onChange={ e => vals[e.target.id] = e.target.value} className="form-control"/>
                    </div>

                    <button type="submit" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                        Add Event
                    </button>
                </form>

            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}

export default AddGuest