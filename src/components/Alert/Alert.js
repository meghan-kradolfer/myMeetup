import React from 'react';

import './Alert.css';

const Alert = ({alert}) => (
  <div className={`Alert Alert-${alert.type} ${alert.type ? 'show' : ''}`}>
    <h4>{alert.type}!</h4>
    <p>{alert.value} has been {alert.func}</p>
  </div>
);

export default Alert