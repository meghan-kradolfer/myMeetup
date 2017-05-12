import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import { addNewEvent, addNewGuest, editEvent, editGuest } from '../actions/eventActions';
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
    console.log(value);
    this.props.addEvent(value);
  }
  handleAddNewGuest(value, eventId) {
    this.props.addGuest(value, eventId);
  }
  handleEditEvent(value) {
    this.props.editEvent(value);
  }
  handleEditGuest(value, eventId) {
    this.props.editGuest(value, eventId);
  }
  render() {
    const { events, participants } =this.props;
    return (
      <div className="App">
        <div className="App-header text-center">
          <Grid className="mt-1">
            <p>12 Jun, 2017</p>
            <h1 className="mt-1">myMeetup</h1>
            <p className="mt-1">no events set for today</p>
            <button className="btn btn-primary mt-1" onClick={() => this.openAddEvent()}>Add an event</button>
          </Grid>
        </div>
        <Grid>
          <Row>
            <EventList
              events={ events }
              participants = { participants }
              editEvent={this.openEditEvent}
              handleAddNewGuest = {this.handleAddNewGuest}
              handleEditEvent = {this.handleEditEvent}
              handleEditGuest={this.handleEditGuest}/>
          </Row>
        </Grid>
        <AddEvent open={this.state.addEvent}
                  close={this.closeAddEvent}
                  add={this.handleAddNewEvent}
                  events={ events }/>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
