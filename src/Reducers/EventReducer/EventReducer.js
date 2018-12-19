// import { ALL_EVENTS } from '../../Actions/types'


const initialState = {
  allEvents: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload
      }
    default:
      return state;
  }
}
