import React from 'react';
import GuestList  from '../GuestList/GuestList';

function sort(arr) {
    return arr.sort((a, b) => a.date > b.date);
}

const EventList = ({ events, addGuest }) => (
    <div>
        { sort(events).map( event => {
            console.log(event);
            const guestCount = event.participant.length + event.participant.reduce(function(total,x){return total + x.guests}, 0);
            return (
                <div key={event.id} >
                    name: {event.name}
                    date: {event.date}
                    fee: {event.fee}
                    guests: {guestCount}
                    <GuestList participant={event.participant}/>
                    <button className="btn" onClick={()=> addGuest(event.id)}>Add</button>
                </div>
            )
        })}
    </div>
);

export default EventList
