import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import { addNewEvent, addNewGuest, editEvent, editGuest, removeEvent, removeGuest } from '../actions/eventActions';
import AddEvent from './AddEvent/AddEvent';
import EventList from './EventList/EventList';
import Alert from './Alert/Alert';

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
      addGuest: false,
      alert: {}
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
    this.showAlert = this.showAlert.bind(this);
  }
  showAlert(type, value, func) {
    this.setState({
      alert: {
        type: type,
        value: value.name,
        func: func
      }
    });
    setTimeout(function() {
      this.setState({alert: {}})
    }.bind(this), 3000);
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
    this.showAlert('success', value, 'added');
  }
  handleAddNewGuest(value, eventId) {
    this.props.addGuest(value, eventId);
    this.showAlert('success', value, 'added');
  }
  handleEditEvent(value) {
    this.props.editEvent(value);
    this.showAlert('success', value, 'edited');
  }
  handleEditGuest(value) {
    this.props.editGuest(value);
    this.showAlert('success', value, 'edited');
  }
  handleDeleteEvent(value) {
    this.props.removeEvent(value);
    this.showAlert('success', value, 'deleted');
  }
  handleDeleteGuest(value) {
    this.props.removeGuest(value);
    this.showAlert('success', value, 'deleted');
  }
  render() {
    const { events, participants } =this.props;

    let dd = new Date().getDate();
    let mm = new Date().getMonth()+1;
    let yyyy = new Date().getFullYear();
    if(dd<10) {
      dd='0'+dd
    }
    if(mm<10) {
      mm='0'+mm
    }
    let today = yyyy+'-'+mm+'-'+dd;

    events.map(event => event.date < today ? event.past = true : event.past = false);

    const todaysEvent = events.filter( a => a.date.slice(0,10) === today);

    return (
      <div className="App">
        <Grid>
          <Row>
            <Col md={9}>
              <h1 className="mt-1">myMeetup</h1>
              <p>Your personal meetup planner</p>
            </Col>
            <Col md={3}>
              <button className="btn btn-primary mt-1" onClick={() => this.openAddEvent()}>Add an event</button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h5 className="mt-1"><Moment format="DD MMM, YYYY"></Moment></h5>
              <p className="mb-1">You have <span>{todaysEvent.length} events</span> on today</p>
              <div className="App-Today">
                { todaysEvent.length > 0 &&
                <div className="App-TodayContain">
                  { todaysEvent.map(event => (
                    <div className="App-Events mb-2">
                      <h2 className="App-Time"><Moment format="hh:mm A">{event.date}</Moment></h2>
                      <p>{event.name}</p>
                    </div>
                  ))}
                </div>
                }
              </div>
            </Col>
          </Row>
          <hr className="App-line"/> All Events
          <Row>
            <Col xs={12}>
              <EventList
                events={events}
                participants={participants}
                editEvent={this.openEditEvent}
                handleAddNewGuest={this.handleAddNewGuest}
                handleEditEvent={this.handleEditEvent}
                handleEditGuest={this.handleEditGuest}
                handleDeleteEvent={this.handleDeleteEvent}
                handleDeleteGuest={this.handleDeleteGuest} />
            </Col>
          </Row>

        </Grid>
        <AddEvent open={this.state.addEvent}
                  close={this.closeAddEvent}
                  add={this.handleAddNewEvent}
                  events={events}/>
        <Alert alert={this.state.alert}  />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
