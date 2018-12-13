import { combineReducers } from 'redux';
import IdeaReducer from './IdeaReducer/IdeaReducer.js'

export default combineReducers({
  ideas: IdeaReducer
});

// add reducers inside
