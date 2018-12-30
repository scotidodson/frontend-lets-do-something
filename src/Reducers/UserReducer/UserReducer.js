import { CURRENT_USER, FETCH_USERS, USER_ID } from '../../Actions/types'


const initialState = {
  currentUser: {},
  allUsers: [],
  userId: 5
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case FETCH_USERS:
      return {
        ...state,
        allUsers: action.payload
      }
    case USER_ID:
      return {
        ...state,
        userId: action.payload
      }
    default:
      return state;
  }
}
