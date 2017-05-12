import React from 'react'
import { Modal, Row, Col } from 'react-bootstrap'
import Datetime  from 'react-datetime'

class AddEvent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      name: '',
      date: '',
      fee: '',
      max_guests: '',
      participant: [],
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    let newState = {};
    if(e._d) {
      newState['date'] = e._d.toISOString();
    } else {
      newState[e.target.id] = e.target.value;
    }
    this.setState(newState)
  }
  handleSubmit(e) {
    e.preventDefault();
    const { name, date, fee, max_guests } = this.state;
    if (name && date && fee && max_guests) {
      this.props.add(this.state);
      this.props.close();
    } else {
      this.setState({error: true});
    }
  }
  render() {
    const { open, close } = this.props;
    return (
      <Modal show={open} onHide={close} >
        <Modal.Header closeButton>
          <h3 className="text-center mb-1">Add a new event</h3>
          <hr />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ e => this.handleSubmit(e) }>
            <div className="form-group">
              <label>Select date & time</label>
              <Datetime locale="au" onChange={this.handleChange} input={false}/>
            </div>
            <div className="form-group">
              <label htmlFor="name">Event Name</label>
              <input type="text" id="name" onChange={ this.handleChange } className="form-control" value={this.state.name} />
            </div>
            <Row>
              <Col md={6} className="form-group">
                <label htmlFor="fee">Event Fee</label>
                <input type="number" id="fee" onChange={ this.handleChange } className="form-control" value={this.state.fee} />
              </Col>
              <Col md={6} className="form-group">
                <label htmlFor="max">Maximum Guests</label>
                <input type="number" id="max_guests" onChange={ this.handleChange } className="form-control" value={this.state.max_guests} />
              </Col>
            </Row>
            { this.state.error  && <p className="text-danger mb-2 text-center">Please fill in all fields</p> }
            <button type="submit" className="btn btn-block btn-secondary" >
              Add guest
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddEvent