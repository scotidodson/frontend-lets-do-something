import { combineReducers } from 'redux';
import IdeaReducer from './IdeaReducer/IdeaReducer.js'
import UserReducer from './UserReducer/UserReducer.js'
import EventReducer from './EventReducer/EventReducer.js'

export default combineReducers({
  ideas: IdeaReducer,
  users: UserReducer,
  events: EventReducer
});
