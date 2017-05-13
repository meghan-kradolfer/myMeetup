import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import events from './reducers/events';

export function configureStore() {

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

  const persistedState = loadState();

  const reducer = combineReducers({
    events
  });

  const store = createStore(
    reducer,
    persistedState,
    compose(
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