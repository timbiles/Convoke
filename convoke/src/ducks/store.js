import { createStore } from 'redux';

import eventReducer from './eventReducer';

const store = createStore(eventReducer);

export default store;
