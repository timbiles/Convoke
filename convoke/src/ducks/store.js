import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import eventReducer from './eventReducer';
import createReducer from './createReducer';
import userReducer from './userReducer';
import userEventReducer from './userEventReducer';

const combinedReducers = combineReducers({
  events: eventReducer,
  create: createReducer,
  user: userReducer,
  userEvents: userEventReducer
});

const middlewares = applyMiddleware(promiseMiddleware());

const store = createStore(combinedReducers, middlewares);

export default store;
