import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';

class Guest extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      ...this.props.participant,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    let newState = this.state;
    newState[e.target.id] = e.target.value;

    if(e.target.id === 'guests') {
      newState.paid = (e.target.value++) * this.props.event.fee;
    }

    this.setState(newState)
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.edit(this.state);
    this.props.close();
  }
  render() {
    const { open, close, participant, event } = this.props;
    participant.eventId = event.id;
    return (
      <Modal show={open === participant.id} onHide={close} >
        <Modal.Header closeButton>
          <h3 className="text-center mb-1">Edit <span>{participant.name}</span></h3>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ e => this.handleSubmit(e)}>
            <Row>
              <Col md={8} className="form-group">
                <label htmlFor="name">Guest Name</label>
                <input type="text" id="name" onChange={ this.handleChange } className="form-control" value={this.state.name} />
              </Col>
              <Col md={4} className="form-group">
                <label htmlFor="name">Extra guests</label>
                <input type="number" id="guests" onChange={ this.handleChange } className="form-control" value={this.state.guests} />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="form-group">
                <p><span>Total guest cost:</span> ${this.state.paid ? this.state.paid : event.fee}</p>
              </Col>
              <Col md={6} className="form-group">
                <button type="submit" className="btn btn-block btn-secondary" >
                  Update guest
                </button>
              </Col>
            </Row>
          </form>

        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    );
  }
}
export default Guest