import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { configureStore } from './store'
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const store = configureStore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( <Provider store={store}>
    <App />
  </Provider>, div);
});