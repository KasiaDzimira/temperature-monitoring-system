import { combineReducers } from 'redux';
import profileReducer from './reducers/profile-reducers';

const rootReducer = combineReducers({
    profile: profileReducer
});

export default rootReducer;
