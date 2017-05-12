import React from 'react'
import { Modal } from 'react-bootstrap'

class Event extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      event: this.props.event
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    let newState = this.state.event;
    newState[e.target.id] = e.target.value;
    this.setState(newState)
  }
    render() {
    const { open, close, edit, event } = this.props;
      return (
        <Modal show={open === event.id} onHide={close} >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={ e => { e.preventDefault(); edit(event); close();}}>
              <div className="form-group">
                <input placeholder="Event Name" type="text" id="name" onChange={ this.handleChange } className="form-control" value={this.state.event.name} />
              </div>
              <div className="form-group">
                <input placeholder="Event Date" type="date" id="date" onChange={ this.handleChange } className="form-control" value={this.state.event.date} />
              </div>
              <div className="form-group">
                <input placeholder="Event time" type="time" id="time" onChange={ this.handleChange } className="form-control" value={this.state.event.time} />
              </div>
              <div className="form-group">
                <input placeholder="Event fee" type="number" id="fee" onChange={ this.handleChange } className="form-control" value={this.state.event.fee} />
              </div>

              <button type="submit" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                Edit Event
              </button>
            </form>

          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
      );
  }
}
export default Event