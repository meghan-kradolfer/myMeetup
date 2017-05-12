import React from 'react'
import { Modal, Row, Col } from 'react-bootstrap'

class AddGuest extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      name: '',
      guests: '',
      paid: '',
      error: false
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
  handleSubmit(e) {
    e.preventDefault();

    const { name, guests } = this.state;
    const { event, add, close } = this.props;

    if (name && guests) {
      add(this.state, event.id);
      close();
    } else {
      this.setState({error: true});
    }
  }
  render() {
    const { open, close, event } = this.props;
    return (
      <Modal show={open === event.id} onHide={close} >
        <Modal.Body>
          <Modal.Header closeButton>
            <h3 className="text-center mb-1">Add a guest for <span>{event.name}</span></h3>
            <hr />
          </Modal.Header>

          <form className="mt-1" onSubmit={ e => this.handleSubmit(e) }>
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
            { this.state.error  && <p className="text-danger mb-2 text-center">Please fill in all fields</p> }
            <Row>
              <Col md={6} className="form-group">
                <p><span>Total guest cost:</span> ${this.state.paid ? this.state.paid : event.fee}</p>
              </Col>
              <Col md={6} className="form-group">
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