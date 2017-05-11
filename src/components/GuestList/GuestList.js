import React from 'react';

const GuestList = ({ participant }) => (
    <div>
        { participant.map( event => (
            <div key={event.id} >
                {event.name}
                {event.date}
                {event.fee}
            </div>
        ))}
    </div>
);

export default GuestList
