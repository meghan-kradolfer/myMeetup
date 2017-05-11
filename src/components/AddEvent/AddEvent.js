import React from 'react'
import { Modal, popover, tooltip } from 'react-bootstrap'

const AddEvent = ({ open, close, add, events }) => {
    let vals = {
        id: events.length+1,
        name: '',
        date: '',
        fee: ''
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
                    <div className="form-group">
                        <input placeholder="Event Fee" type="number" id="fee" onChange={ e => vals[e.target.id] = e.target.value} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="date" id="date" onChange={ e => vals[e.target.id] = e.target.value} className="form-control"/>
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

export default AddEvent