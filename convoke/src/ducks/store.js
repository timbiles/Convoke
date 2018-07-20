import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import reducer from './reducer';

const combineReducers = combineReducers({
  eventReducer
});

const middlewares = applyMiddleware(promiseMiddleware);

const store = createStore(combineReducers, middlewares);

export default store;
