import React from 'react'
import { Modal } from 'react-bootstrap'

class AddGuest extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      name: '',
      guests: '',
      paid: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    let newState = {};
    newState[e.target.id] = e.target.value;
    if(e.target.id === 'guests') {
      newState.paid = (e.target.value++) * this.props.event.fee;
    }
    this.setState(newState)
  }
  render() {
    const { open, close, add, event } = this.props;
    return (
      <Modal show={open === event.id} onHide={close} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ e => { e.preventDefault(); add(this.state, event.id); close(); }}>
            <div className="form-group">
              <input placeholder="Participant Name" type="text" id="name" onChange={ this.handleChange } className="form-control" value={this.state.name} />
            </div>
            <div className="form-group">
              <input placeholder="Participant's guests" type="number" id="guests" onChange={ this.handleChange } className="form-control" value={this.state.guests} />
            </div>
            <h2>Price for participant plus guests: ${this.state.paid ? this.state.paid : event.fee}</h2>
            <button type="submit" >
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

export default AddGuest