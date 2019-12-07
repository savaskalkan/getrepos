import { combineReducers } from 'redux';
import ReposReducers from './ReposReducers';

export default combineReducers({ 
    ReposResponse: ReposReducers
});