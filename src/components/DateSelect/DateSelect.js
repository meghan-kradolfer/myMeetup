import React from 'react';
import Datetime  from 'react-datetime';
import './DateSelect.css';

const valid = (current) => current.isAfter( Datetime.moment().subtract( 1, 'day' ) );

const DateSelect = ({date, handleChange}) => (
  <Datetime
    input={false}
    isValidDate={ valid }
    value={date}
    onChange={handleChange} />
);

export default DateSelect