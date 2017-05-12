import React from 'react';
import Guest from '../Guest/Guest';

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
      <div>
        { participant.map( part => (
          <div key={part.id} >
            {part.name}
              <strong onClick={()=> this.openEditGuest(part.id)}>edit</strong>
              <Guest open = {this.state.editGuest}
                     close = {this.closeEditGuest}
                     edit = { handleEditGuest }
                     participant ={ part }
                     event = {event} />
          </div>
        ))}
      </div>
    );
  }
}

export default GuestList
