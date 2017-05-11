import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import events from './reducers/events';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(initialState) {

    const reducer = combineReducers({
        events
    });

    const store = createStore(
        reducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunkMiddleware)
        )
    );

    return store;
}