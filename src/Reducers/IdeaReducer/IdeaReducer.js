import { FETCH_IDEAS, NEW_IDEA, SAVED_IDEAS, USER_IDEAS } from '../../Actions/types'


const initialState = {
  allIdeas: [],
  idea: {},
  savedIdeas: [],
  userIdeas: [],
  tester: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_IDEAS:
      return {
        ...state,
        allIdeas: action.payload
      }
    case SAVED_IDEAS:
      return {
        ...state,
        savedIdeas: action.payload
      }
    case NEW_IDEA:
      return {
        ...state,
        idea: action.payload
      }
    case USER_IDEAS:
      return {
        ...state,
        userIdeas: action.payload
      }
    default:
      return state;

  }
}
