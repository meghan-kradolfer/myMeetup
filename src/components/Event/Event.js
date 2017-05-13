import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import Datetime  from 'react-datetime';
import moment from 'moment';

class Event extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      ...this.props.event,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    let newState = this.state;
    if(e._d) {
      newState['date'] = e._d.toISOString();
    } else {
      newState[e.target.id] = e.target.value;
    }
    this.setState(newState)
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.edit(this.state);
    this.props.close();
  }
  render() {
    const { open, close,  event } = this.props;
    return (
      <Modal show={open === event.id} onHide={close} >
        <Modal.Header closeButton>
          <h3 className="text-center mb-1">Edit <span>{event.name}</span></h3>
          <hr />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ e => { this.handleSubmit(e) }}>
            <div className="form-group">
              <label>Select date & time</label>
              <Datetime
                input={false}
                value={moment(this.state.date)}
                onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="name">Event Name</label>
              <input type="text" id="name" onChange={ this.handleChange } className="form-control" value={this.state.name} />
            </div>
            <div className="form-group">
              <label htmlFor="name">Event Address</label>
              <input type="text" id="address" onChange={ this.handleChange } className="form-control" value={this.state.address} />
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
            <button type="submit" className="btn btn-block btn-secondary" >
              Update Event
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