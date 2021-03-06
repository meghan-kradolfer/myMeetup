import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import DateSelect from '../DateSelect/DateSelect';

class EditEvent extends React.Component {
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
    const { name, date, fee, max_guests } = this.state;
    const { edit, close } = this.props;

    if (name && date && fee && max_guests) {
      edit(this.state);
      this.setState({error: false});
      close();
    } else {
      this.setState({error: 'Please fill in all fields'});
    }
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
            <Row>
              <Col xs={12} className="form-group">
                <label>Select date & time</label>
                <DateSelect date={moment(this.state.date)} handleChange={this.handleChange} />
              </Col>

              <Col xs={12} className="form-group">
                <label htmlFor="name">Event Name</label>
                <input type="text" id="name" onChange={ this.handleChange } className="form-control" value={this.state.name} />
              </Col>

              <Col xs={12} className="form-group">
                <label htmlFor="name">Event Address</label>
                <input type="text" id="address" onChange={ this.handleChange } className="form-control" value={this.state.address} />
              </Col>

              <Col sm={6} className="form-group">
                <label htmlFor="fee">Event Fee</label>
                <input type="number" id="fee" onChange={ this.handleChange } className="form-control" value={this.state.fee} />
              </Col>

              <Col sm={6} className="form-group">
                <label htmlFor="max">Maximum Guests</label>
                <input type="number" id="max_guests" onChange={ this.handleChange } className="form-control" value={this.state.max_guests} />
              </Col>
            </Row>

            <Row>
              { this.state.error  && <p className="text-danger mb-2 text-center">{this.state.error}</p> }
              <Col xs={12} className="form-group">
                <button type="submit" className="btn btn-block btn-secondary" >
                  Update event
                </button>
              </Col>
            </Row>
          </form>

        </Modal.Body>
      </Modal>
    );
  }
}
export default EditEvent