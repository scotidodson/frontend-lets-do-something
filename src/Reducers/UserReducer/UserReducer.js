import { CURRENT_USER, ALL_USERS } from '../../Actions/types'


const initialState = {
  currentUser: {},
  allUsers: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      }
    default:
      return state;
  }
}
