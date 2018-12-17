import { FETCH_IDEAS, NEW_IDEA, SAVE_IDEA } from '../../Actions/types'


const initialState = {
  items: [],
  item: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_IDEAS:
      return {
        ...state,
        items: action.payload
      }
    case NEW_IDEA:
      return {
        ...state,
        item: action.payload
      }
    case SAVE_IDEA:
      return {
        ...state,
        item: action.payload
      }
    default:
      return state;

  }
}
