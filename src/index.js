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
            date: '2017-11-11',
            time: '13:23:44',
            fee: '20.00',
            max_participants: '100',
            participant: [
                {
                    id: 1,
                    name: 'Meghan',
                    paid: '20.00',
                    guests: 4
                },
                {
                    id: 2,
                    name: 'Meghan',
                    paid: '20.00',
                    guests: 0
                }
            ]
        },
        {
            id: 2,
            name: 'My second event',
            date: '2017-12-11',
            time: '20:23:44',
            fee: 0,
            max_participants: '20',
            participant: [
                {
                    id: 1,
                    name: 'Meghan',
                    paid: '20.00',
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
