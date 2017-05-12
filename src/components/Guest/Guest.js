import React from 'react'
import { Modal } from 'react-bootstrap'

class Guest extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      participant: this.props.participant
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    let newState = this.state.participant;
    newState[e.target.id] = e.target.value;
    this.setState(newState)
  }
  render() {
    const { open, close, edit, participant, event } = this.props;
    return (
      <Modal show={open === participant.id} onHide={close} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ e => { e.preventDefault(); edit(participant, event.id); close();}}>
            <div className="form-group">
              <input placeholder="Event Name" type="text" id="name" onChange={ this.handleChange } className="form-control" value={this.state.participant.name} />
            </div>

            <button type="submit" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Edit guest
            </button>
          </form>

        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    );
  }
}
export default Guest