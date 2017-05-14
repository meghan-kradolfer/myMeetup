import React from 'react';
import { Row, Col } from 'react-bootstrap';
import EditGuest from '../EditGuest/EditGuest';
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm';

import './GuestList.css';

class GuestList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      editGuest: false,
      deleteGuest: false
    };
    this.openEditGuest = this.openEditGuest.bind(this);
    this.closeEditGuest = this.closeEditGuest.bind(this);
    this.openDeleteGuest = this.openDeleteGuest.bind(this);
    this.closeDeleteGuest = this.closeDeleteGuest.bind(this);
  }
  openEditGuest(id) {
    this.setState({editGuest: id});
  }
  closeEditGuest() {
    this.setState({editGuest: false});
  }
  openDeleteGuest(id) {
    this.setState({deleteGuest: id});
  }
  closeDeleteGuest() {
    this.setState({deleteGuest: false});
  }
  render() {
    const { participant, handleEditGuest, event, handleDeleteGuest } = this.props;
    return (
      <div className="GuestList">
        { participant.map( part => {
          part.eventId = event.id;
          return (
            <div key={part.id} className="GuestList-List">
              <Row>
                <Col sm={3}>
                  <p className="GuestList-label">guest name</p>
                  <p>{part.name}</p>
                </Col>

                <Col sm={3}>
                  <p className="GuestList-label">number of guests</p>
                  <p>{part.guests}</p>
                </Col>

                <Col sm={3}>
                  <p className="GuestList-label">amount paid</p>
                  <p>${part.paid}</p>
                </Col>

                <Col sm={3}>
                  <p className="text-right link" onClick={()=> this.openEditGuest(part.id)}><i className="fa fa-pencil"></i> edit guest</p>
                  <p className="GuestList-label text-right link" onClick={()=> this.openDeleteGuest(part.id)}><i className="fa fa-trash"></i> delete guest</p>
                </Col>
              </Row>

              <EditGuest open={this.state.editGuest}
                         close={this.closeEditGuest}
                         edit={handleEditGuest}
                         participant={part}
                         event={event} />

              <DeleteConfirm open={this.state.deleteGuest}
                             close={this.closeDeleteGuest}
                             remove={handleDeleteGuest}
                             component={part} />
            </div>
          )
        })}
        { event.participant.length <= 0 &&
        <em>No guests currently attending</em>
        }
      </div>
    );
  }
}

export default GuestList
