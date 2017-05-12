import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Guest from '../Guest/Guest';
import './GuestList.css';

class GuestList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      editGuest: false
    };
    this.openEditGuest = this.openEditGuest.bind(this);
    this.closeEditGuest = this.closeEditGuest.bind(this);
  }
  openEditGuest(id) {
    this.setState({editGuest: id});
  }
  closeEditGuest() {
    this.setState({editGuest: false});
  }
  render() {
    const { participant, handleEditGuest, event } = this.props;
    return (
      <div className="GuestList">
        <h4>guests attending</h4>
        { participant.map( part => (
          <div key={part.id} className="GuestList-List">
            <Row>
              <Col md={3}>
                <p className="GuestList-label">guest name</p>
                <p>{part.name}</p>
              </Col>
              <Col md={3}>
                <p className="GuestList-label">number of guests</p>
                <p>{part.guests}</p>
              </Col>
              <Col md={3}>
                <p className="GuestList-label">amount paid</p>
                <p>${part.paid}</p>
              </Col>
              <Col md={3}>
                <p className="GuestList-label text-right link" onClick={()=> this.openEditGuest(part.id)}><i className="fa fa-pencil"></i> edit guest</p>
              </Col>
            </Row>
              <Guest open={ this.state.editGuest }
                     close={ this.closeEditGuest }
                     edit={ handleEditGuest }
                     participant={ part }
                     event={ event } />
          </div>
        ))}
      </div>
    );
  }
}

export default GuestList
