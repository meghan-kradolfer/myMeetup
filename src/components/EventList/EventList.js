import React from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import GuestList  from '../GuestList/GuestList';
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
            open: true
        };
    }
    render() {
        const { events, addGuest } = this.props;
        return (
            <Accordion className="Event-List">
                { sort(events).map( event => {
                    const guestCount = event.participant ? event.participant.length + event.participant.reduce(function(total,x){return total + x.guests}, 0) : 0;
                    return (
                        <Panel key={event.id} className="Event-Row" header={eventHeader(event, guestCount)} eventKey={event.id}>
                            name: {event.name}
                            date: {event.date}
                            fee: {event.fee}
                            guests: {guestCount}
                            { event.participant &&
                            <GuestList participant={event.participant}/>
                            }
                            <button className="btn" onClick={()=> addGuest(event.id)}>Add</button>
                        </Panel>
                    )
                })}
            </Accordion>
        );
    }
}

export default EventList
