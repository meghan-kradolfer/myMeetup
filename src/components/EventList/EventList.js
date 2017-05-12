import React from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import GuestList  from '../GuestList/GuestList';
import AddGuest from '../AddGuest/AddGuest';
import Event from '../Event/Event';
import './EventList.css';

function sort(arr) {
  return arr.sort((a, b) => a.date > b.date);
}

const eventHeader = (event, guestCount) => (
  <div>
    name: {event.name}
    date: {event.date}
    fee: {event.fee}
    guests: {guestCount}
  </div>
);

class EventList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      open: true,
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
      <Accordion className="Event-List">
        { sort(events).map( event => {
          const guestCount = event.participant ? event.participant.length + event.participant.reduce(function(total,x){return total + x.guests}, 0) : 0;
          const finances = event.participant ? event.participant.reduce(function(total,x){return total + x.paid}, 0) : 0;
          return (
            <Panel key={event.id} className="Event-Row" header={eventHeader(event, guestCount)} eventKey={event.id}>
              name: {event.name} {event.id}
              date: {event.date}
              fee: {event.fee}
              guests: {guestCount}
              <strong onClick={()=> this.openEditEvent(event.id)}>edit</strong>
              <Event open = {this.state.editEvent}
                     close = {this.closeEditEvent}
                     edit = { handleEditEvent }
                     event={ event } />
              <GuestList participant={event.participant} handleEditGuest={handleEditGuest} event={event}/>
              <AddGuest open = {this.state.addGuest}
                        close = {this.closeAddGuest}
                        add = { handleAddNewGuest }
                        event = { event }/>
              <button className="btn" onClick={()=> this.openAddGuest(event.id)}>Add</button>
            </Panel>
          )
        })}
      </Accordion>
    );
  }
}

export default EventList
