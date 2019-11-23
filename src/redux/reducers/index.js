import {combineReducers} from 'redux';

import reducer from './reducer';

const appReducer = combineReducers({
  data: reducer,
});

export default appReducer;
