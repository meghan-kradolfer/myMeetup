import React from 'react'
import { Modal, popover, tooltip } from 'react-bootstrap'

class AddEvent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      name: '',
      date: '',
      fee: '',
      time: '',
      participant: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    let newState = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState)
  }
  render() {
    const { open, close, add } = this.props;
    return (
      <Modal show={open} onHide={close} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ e => { e.preventDefault(); add(this.state); close(); }}>
            <div className="form-group">
              <input placeholder="Event Name" type="text" id="name" onChange={ this.handleChange } className="form-control" value={this.state.name} />
            </div>
            <div className="form-group">
              <input placeholder="Event Date" type="date" id="date" onChange={ this.handleChange } className="form-control" value={this.state.date} />
            </div>
            <div className="form-group">
              <input placeholder="Event time" type="time" id="time" onChange={ this.handleChange } className="form-control" value={this.state.time} />
            </div>
            <div className="form-group">
              <input placeholder="Event fee" type="text" id="fee" onChange={ this.handleChange } className="form-control" value={this.state.fee} />
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
}

export default AddEvent