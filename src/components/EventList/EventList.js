import React from 'react';
import { Accordion, Panel, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import GuestList  from '../GuestList/GuestList';
import AddGuest from '../AddGuest/AddGuest';
import Event from '../Event/Event';
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm';
import './EventList.css';


function sort(arr) {
  return arr.sort((a, b) => a.date > b.date);
}

const eventHeader = (event) => (
  <Row className="EventList-Header">
   <Col md={3}>
     <p className="EventList-label">event name</p>
     <p>{event.name}</p>
   </Col>
    <Col md={2}>
      <p className="EventList-label" >event date</p>
      <p><Moment format="DD MMM, YYYY">{event.date}</Moment></p>
    </Col>
    <Col md={2}>
      <p className="EventList-label" >event time</p>
      <p><Moment format="h:mm A">{event.date}</Moment></p>
    </Col>
    <Col md={2}>
      <p className="EventList-label" >guests attending</p>
      <p><span>{event.guestCount}</span> / {event.max_guests}</p>
    </Col>
    <Col md={2}>
      <p className="EventList-label" >finances available</p>
      <p>${event.finances}</p>
    </Col>
  </Row>
);

class EventList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      editEvent: false,
      deleteEvent: false,
      addGuest: false
    };
    this.openAddGuest = this.openAddGuest.bind(this);
    this.openEditEvent = this.openEditEvent.bind(this);
    this.closeAddGuest = this.closeAddGuest.bind(this);
    this.closeEditEvent = this.closeEditEvent.bind(this);
    this.openDeleteEvent = this.openDeleteEvent.bind(this);
    this.closeDeleteEvent = this.closeDeleteEvent.bind(this);
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
  openDeleteEvent(id) {
    this.setState({deleteEvent: id});
  }
  closeDeleteEvent() {
    this.setState({deleteEvent: false});
  }
  render() {
    const { events, handleAddNewGuest, handleEditEvent, handleEditGuest, handleDeleteEvent, handleDeleteGuest } = this.props;
    return (
      <Accordion className="EventList mt-1">
        { sort(events).map( event => {
          event.guestCount = event.participant ? event.participant.length + event.participant.reduce(function(total,x){return total + Number(x.guests)}, 0) : 0;
          event.finances = event.participant ? event.participant.reduce(function(total,x){return total + Number(x.paid)}, 0) : 0;
          return (
            <Panel key={event.id} className="EventList-Row" header={eventHeader(event)} eventKey={event.id}>
             <Row>
               <Col md={2} mdOffset={8}>
                 <span className="btn btn-block EventList-btn" onClick={()=> this.openEditEvent(event.id)}><i className="fa fa-pencil"></i> Edit event</span>
               </Col>
               <Col  md={2} >
                 <span className="btn btn-block EventList-delete" onClick={()=> this.openDeleteEvent(event.id)}><i className="fa fa-trash"></i> Delete event</span>
                 <DeleteConfirm open={ this.state.deleteEvent }
                                close={ this.closeDeleteEvent }
                                remove={ handleDeleteEvent }
                                component={ event } />
               </Col>
             </Row>
              <Event open={ this.state.editEvent }
                     close={ this.closeEditEvent }
                     edit={ handleEditEvent }
                     event={ event } />

              <GuestList participant={event.participant}
                         handleEditGuest={handleEditGuest}
                         handleDeleteGuest={handleDeleteGuest}
                         event={event} />

              { event.guestCount < event.max_guests &&
              <button className="btn btn-primary EventList-Add" onClick={()=> this.openAddGuest(event.id)}>Add a guest</button>
              }
              { event.guestCount >= event.max_guests &&
              <button className="btn btn-primary EventList-Add" disabled>Guest list full</button>
              }

              <AddGuest open={ this.state.addGuest }
                        close={ this.closeAddGuest }
                        add={ handleAddNewGuest }
                        event={ event }/>
            </Panel>
          )
        })}
      </Accordion>
    );
  }
}

export default EventList
