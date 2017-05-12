import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const initialState = {
    events: [
        {
            id: 1,
            name: 'My first event',
            date: '2017-05-12T04:03:41.124Z',
            fee: 20,
            max_guests: 6,
            participant: [
                {
                    id: 1,
                    name: 'Meghan',
                    paid: 20,
                    guests: 4
                },
                {
                    id: 2,
                    name: 'Meghan',
                    paid: 23,
                    guests: 0
                }
            ]
        },
        {
            id: 2,
            name: 'My second event',
            date: '2017-05-12T04:03:41.124Z',
            fee: 0,
          max_guests: 20,
            participant: [
                {
                    id: 1,
                    name: 'Meghan',
                    paid: 0,
                    guests: 0
                }
            ]
        }
    ]
};

const store = configureStore(initialState);

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);
