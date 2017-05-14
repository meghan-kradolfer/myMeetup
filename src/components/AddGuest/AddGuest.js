import React from 'react'
import { Modal, Row, Col } from 'react-bootstrap'

class AddGuest extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      name: '',
      guests: '',
      paid: '',
      eventId: this.props.event.id,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    let newState = {};
    newState[e.target.id] = e.target.value;

    if(e.target.id === 'guests') {
      newState.paid = (Number(e.target.value)+1) * this.props.event.fee;
    }
    this.setState(newState)
  }
  handleSubmit(e) {
    e.preventDefault();

    const { name, guests } = this.state;
    const { add, close, event } = this.props;
    if (name && guests) {
      if(Number(guests)+1 > event.guestsRemaining) {
        this.setState({
          error: 'Guest list exceeded, please limit to a maximum '+(event.guestsRemaining-1)+' guests'});
      } else {
        add(this.state);
        close();
        this.setState({
          name: '',
          guests: '',
          paid: '',
          error: false
        });
      }
    } else {
      this.setState({error: 'Please fill in all fields'});
    }
  }
  render() {
    const { open, close, event } = this.props;
    return (
      <Modal show={open === event.id} onHide={close} >
        <Modal.Header closeButton>
          <h3 className="text-center mb-1">Add a guest for <span>{event.name}</span></h3>
          <hr />
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={ e => this.handleSubmit(e) }>
            <Row>
              <Col md={12} className="form-group">
                <h5><span>Total guest cost:</span> ${this.state.paid ? this.state.paid : event.fee}</h5>
              </Col>
              <Col sm={8} className="form-group">
                <label htmlFor="name">Guest Name</label>
                <input type="text" id="name" onChange={ this.handleChange } className="form-control" value={this.state.name} />
              </Col>

              <Col sm={4} className="form-group">
                <label htmlFor="name">Extra guests</label>
                <input type="number" id="guests" onChange={ this.handleChange } className="form-control" value={this.state.guests} />
              </Col>
            </Row>

            <Row>
              { this.state.error  && <p className="text-danger mb-2 text-center">{this.state.error}</p> }
              <Col md={12} className="form-group">
                <button type="submit" className="btn btn-block btn-secondary" >
                  Add guest
                </button>
              </Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddGuest