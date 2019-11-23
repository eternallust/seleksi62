import {createStore, applyMiddleware} from 'redux';
import appReducer from '../redux/reducers';
import middleware from '../redux/middleware';

const store = createStore(appReducer, {}, applyMiddleware(...middleware));

export {store};
