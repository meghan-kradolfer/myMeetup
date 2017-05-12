import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { addNewEvent, addNewGuest, editEvent, editGuest, removeEvent, removeGuest } from '../actions/eventActions';
import AddEvent from './AddEvent/AddEvent';
import EventList from './EventList/EventList';

import './App.css';

const mapStateToProps = (state) => {
  return {
    events: state.events
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addEvent: (value) => {
      dispatch(addNewEvent(value));
    },
    addGuest: (value, eventId) => {
      dispatch(addNewGuest(value, eventId));
    },
    editEvent: (value) => {
      dispatch(editEvent(value));
    },
    editGuest: (value, eventId) => {
      dispatch(editGuest(value, eventId));
    },
    removeEvent: (value) => {
      dispatch(removeEvent(value));
    },
    removeGuest: (value) => {
      dispatch(removeGuest(value));
    }
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addEvent: false,
      editEvent: false,
      addGuest: false
    };
    this.openAddEvent = this.openAddEvent.bind(this);
    this.closeAddEvent = this.closeAddEvent.bind(this);
    this.closeAddGuest = this.closeAddGuest.bind(this);
    this.handleAddNewEvent = this.handleAddNewEvent.bind(this);
    this.handleAddNewGuest = this.handleAddNewGuest.bind(this);
    this.handleEditEvent = this.handleEditEvent.bind(this);
    this.handleEditGuest = this.handleEditGuest.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.handleDeleteGuest = this.handleDeleteGuest.bind(this);
  }
  openAddEvent() {
    this.setState({addEvent: true});
  }
  closeAddGuest() {
    this.setState({addGuest: false});
  }
  closeAddEvent() {
    this.setState({addEvent: false});
  }
  handleAddNewEvent(value) {
    this.props.addEvent(value);
  }
  handleAddNewGuest(value, eventId) {
    this.props.addGuest(value, eventId);
  }
  handleEditEvent(value) {
    this.props.editEvent(value);
  }
  handleEditGuest(value) {
    this.props.editGuest(value);
  }
  handleDeleteEvent(value) {
    this.props.removeEvent(value);
  }
  handleDeleteGuest(value) {
    this.props.removeGuest(value);
  }
  render() {
    const { events, participants } =this.props;
    const now = new Date().toISOString().slice(0,10);
    const todaysEvent = events.filter( a => a.date.slice(0,10) === now );
    return (
      <div className="App">
        <div className="App-header text-center">
          <Grid className="mt-1">
            <p><Moment format="DD MMM, YYYY"></Moment></p>
            <h1 className="mt-1 mb-1">myMeetup</h1>
            { todaysEvent.length &&
              <p>Events on today:</p>
            }
            { todaysEvent.length && todaysEvent.map(event => (
              <p key={event.id} >{event.name}: <span><Moment format="h:mm A">{event.date}</Moment></span> </p>
            ))}
            { !todaysEvent.length &&
            <p className="mt-1">no events set for today</p>
            }

            <button className="btn btn-primary mt-1" onClick={() => this.openAddEvent()}>Add an event</button>
          </Grid>
        </div>
        <Grid>
          <Row>
            <EventList
              events={events}
              participants={participants}
              editEvent={this.openEditEvent}
              handleAddNewGuest={this.handleAddNewGuest}
              handleEditEvent={this.handleEditEvent}
              handleEditGuest={this.handleEditGuest}
              handleDeleteEvent={this.handleDeleteEvent}
              handleDeleteGuest={this.handleDeleteGuest} />
          </Row>
        </Grid>
        <AddEvent open={this.state.addEvent}
                  close={this.closeAddEvent}
                  add={this.handleAddNewEvent}
                  events={events}/>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
