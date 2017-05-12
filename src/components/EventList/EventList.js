import React from 'react';
import { Accordion, Panel, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import GuestList  from '../GuestList/GuestList';
import AddGuest from '../AddGuest/AddGuest';
import Event from '../Event/Event';
import './EventList.css';

function sort(arr) {
  return arr.sort((a, b) => a.date > b.date);
}

const eventHeader = (event) => (
  <Row className="EventList-Header" >
   <Col md={3}>
     <p className="EventList-label">event name</p>
     <p>{event.name}</p>
   </Col>
    <Col md={3}>
      <p className="EventList-label" >event date</p>
      <p><Moment format="DD MMM, YYYY">{event.date}</Moment></p>
    </Col>
    <Col md={3}>
      <p className="EventList-label" >event time</p>
      <p>{event.time}</p>
    </Col>
    <Col md={3}>
      <p className="EventList-label" >guests attending</p>
      <p><span>{event.guestCount}</span> / {event.max_participants}</p>
    </Col>
  </Row>
);

class EventList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      editEvent: false,
      addGuest: false
    };
    this.openAddGuest = this.openAddGuest.bind(this);
    this.openEditEvent = this.openEditEvent.bind(this);
    this.closeAddGuest = this.closeAddGuest.bind(this);
    this.closeEditEvent = this.closeEditEvent.bind(this);
  }
  closeAddGuest() {
    this.setState({addGuest: false});
  }
  openAddGuest(id) {
    this.setState({addGuest: id});
  }
  openEditEvent(id) {
    this.setState({editEvent: id});
  }
  closeEditEvent() {
    this.setState({editEvent: false});
  }
  render() {
    const { events, handleAddNewGuest, handleEditEvent, handleEditGuest } = this.props;
    return (
      <Accordion className="EventList mt-1">
        { sort(events).map( event => {
          event.guestCount = event.participant ? event.participant.length + event.participant.reduce(function(total,x){return total + x.guests}, 0) : 0;
          event.finances = event.participant ? event.participant.reduce(function(total,x){return total + x.paid}, 0) : 0;

          return (
            <Panel key={event.id} className="EventList-Row" header={eventHeader(event)} eventKey={event.id}>
              <strong onClick={()=> this.openEditEvent(event.id)}>edit</strong>
              <Event open = {this.state.editEvent}
                     close = {this.closeEditEvent}
                     edit = { handleEditEvent }
                     event={ event } />
              <GuestList participant={event.participant} handleEditGuest={handleEditGuest} event={event}/>
              <button className="btn btn-primary" onClick={()=> this.openAddGuest(event.id)}>Add</button>
              <AddGuest open = {this.state.addGuest}
                        close = {this.closeAddGuest}
                        add = { handleAddNewGuest }
                        event = { event }/>
            </Panel>
          )
        })}
      </Accordion>
    );
  }
}

export default EventList
