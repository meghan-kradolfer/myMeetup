import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import events from './reducers/events';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(initialState) {

  const loadState = () => {
    try {
      const serialisedState = localStorage.getItem('state');
      if (serialisedState === null) {
        return undefined;
      }
      return JSON.parse(serialisedState);
    } catch (err) {
      return undefined;
    }
  };

  const saveState = (state) => {
    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem('state', serialisedState);
    } catch (err) {
      return undefined;
    }
  };

  const reducer = combineReducers({
    events
  });

  const persistedState = loadState();

  console.log(persistedState);

  const store = createStore(
    reducer,
    persistedState,
    composeEnhancers(
      applyMiddleware(thunkMiddleware)
    )
  );

  store.subscribe(() => {
    saveState({
      events: store.getState().events
    });
  });

  return store;
}