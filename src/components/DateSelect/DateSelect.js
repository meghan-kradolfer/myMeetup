import React from 'react';
import Datetime  from 'react-datetime';
import './DateSelect.css';

const DateSelect = ({date, handleChange}) => (
  <Datetime
    input={false}
    value={date}
    onChange={handleChange} />
);

export default DateSelect