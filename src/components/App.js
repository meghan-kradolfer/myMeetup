import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { addNewEvent, addNewGuest } from '../actions/eventActions';
import AddEvent from './AddEvent/AddEvent';
import AddGuest from './AddGuest/AddGuest';
import EventList from './EventList/EventList';

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
        addGuest: (value, id) => {
            dispatch(addNewGuest(value, id));
        }
    }
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addEvent: false,
            addGuest: false,
            eventId: false
        };
        this.openAddEvent = this.openAddEvent.bind(this);
        this.openAddGuest = this.openAddGuest.bind(this);
        this.closeAddEvent = this.closeAddEvent.bind(this);
        this.closeAddGuest = this.closeAddGuest.bind(this);
        this.handleAddNewEvent = this.handleAddNewEvent.bind(this);
        this.handleAddNewGuest = this.handleAddNewGuest.bind(this);
    }
    openAddGuest(id) {
        this.setState({addGuest: true, eventId: id});
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
    handleAddNewGuest(value) {
        this.props.addGuest(value, this.state.eventId);
    }
  render() {
      const { events } =this.props;
    return (
      <div className="App">
          <h2>myMeetup</h2>
          <button className="btn" onClick={() => this.openAddEvent()}>Add</button>
          <EventList events={ events } addGuest={this.openAddGuest} />
          <AddEvent open={this.state.addEvent}
                    close={this.closeAddEvent}
                    add={this.handleAddNewEvent}
                    events={ events }/>
          <AddGuest open={this.state.addGuest}
                    close={this.closeAddGuest}
                    add={this.handleAddNewGuest}
                    events={ events }/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
