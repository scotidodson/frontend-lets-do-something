import { combineReducers } from 'redux';
import IdeaReducer from './IdeaReducer/IdeaReducer.js'
import UserReducer from './UserReducer/UserReducer.js'

export default combineReducers({
  ideas: IdeaReducer,
  users: UserReducer
});

// add reducers inside
