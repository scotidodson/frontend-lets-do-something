// import { ALL_EVENTS } from './types'

export const createEvent = (eventData) => dispatch => {
  fetch(`http://localhost:4000/api/v1/events`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(eventData)
  })
}


// export const fetchCurrentUser = () => dispatch => {
//     fetch('http://localhost:4000/api/v1/events')
//     .then(resp => resp.json())
//     .then(events => {
//       console.log(events)
//       dispatch({
//       type: CURRENT_USER,
//       payload: events
//     })}
//   )
// }

// export const fetch = () => dispatch => {
//     fetch('http://localhost:4000/api/v1/users')
//     .then(resp => resp.json())
//     .then(allUsers => {
//       dispatch({
//       type: FETCH_USERS,
//       payload: allUsers
//     })}
//   )
// }
