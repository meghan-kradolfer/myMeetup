import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import GuestList  from '../GuestList/GuestList';
import AddGuest from '../AddGuest/AddGuest';
import EditEvent from '../EditEvent/EditEvent';
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm';
import './EventList.css';

function sort(arr) {
  return arr.sort((a, b) => a.date > b.date);
}

class EventList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      editEvent: false,
      deleteEvent: false,
      addGuest: false,
      open: false
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
      <div className="EventList">
        { events.length === 0 &&
        <div className="mt-1 mb-1">
          <p><em>You currently do not have any events, start creating events by clicking the 'Add event' button!</em></p>
        </div>
        }

        { events.length > 0 &&
        <div className="EventList-Contain">
          { sort(events).map( event => {
            event.guestCount = event.participant ? event.participant.length + event.participant.reduce(function(total,x){return total + Number(x.guests)}, 0) : 0;
            event.guestsRemaining = event.max_guests - event.guestCount;
            event.finances = event.participant ? event.participant.reduce(function(total,x){return total + Number(x.paid)}, 0) : 0;

            return (
              <div key={event.id} className={`EventList-Row ${event.past ? 'EventList-Past' : ''}`} >
                <Row>
                  <Col xs={12}>
                    <h4 className="EventList-Title">{event.name}</h4>
                    <h2 className="EventList-Date"><Moment format="DD MMM YYYY">{event.date}</Moment></h2>
                    <p className="EventList-Details"><i className="fa fa-clock-o"></i> <Moment format="h:mm A">{event.date}</Moment></p>
                    <p className="EventList-Details"><i className="fa fa-map-marker"></i> {event.address}</p>
                    <p className="EventList-Details"><i className="fa fa-usd"></i> {event.finances} | <span><small>total income</small></span></p>
                    <p className="EventList-Guests" onClick={()=> this.setState({ open: this.state.open === event.id ? false : event.id })}>
                      {event.guestCount} participants attending | <span><small>{event.guestsRemaining} spot{event.guestCount > 1 ? 's' : ''} remaining</small></span>
                      <i className={`fa ${this.state.open === event.id ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
                    </p>

                    <Panel className="EventList-Panel" collapsible expanded={this.state.open === event.id}>
                      <GuestList participant={event.participant}
                                 handleEditGuest={handleEditGuest}
                                 handleDeleteGuest={handleDeleteGuest}
                                 event={event} />

                      <Row className="text-center">
                        { event.guestCount < event.max_guests &&
                        <button className="btn btn-primary EventList-Add" onClick={()=> this.openAddGuest(event.id)}>Add a guest</button>
                        }
                        { event.guestCount >= event.max_guests &&
                        <button className="btn btn-primary EventList-Add" disabled>Guest list full</button>
                        }
                      </Row>
                    </Panel>
                  </Col>
                </Row>

                <Row>
                  <Col sm={3} smOffset={6}>
                    <button className="btn btn-secondary btn-block mb-2" onClick={()=> this.openEditEvent(event.id)}><i className="fa fa-pencil"></i> Edit event</button>
                  </Col>

                  <Col sm={3}>
                    <button className="btn btn-default btn-block mb-2" onClick={()=> this.openDeleteEvent(event.id)}><i className="fa fa-trash"></i> Delete event</button>

                    <DeleteConfirm open={ this.state.deleteEvent }
                                   close={ this.closeDeleteEvent }
                                   remove={ handleDeleteEvent }
                                   component={ event } />
                  </Col>
                </Row>

                <EditEvent open={ this.state.editEvent }
                           close={ this.closeEditEvent }
                           edit={ handleEditEvent }
                           event={ event } />

                <AddGuest open={ this.state.addGuest }
                          close={ this.closeAddGuest }
                          add={ handleAddNewGuest }
                          event={ event }/>
              </div>
            )
          })}
        </div>
        }
      </div>
    );
  }
}

export default EventList
