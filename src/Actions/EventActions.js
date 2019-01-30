import { ALL_EVENTS } from './types'

export const createEvent = (eventData) => dispatch => {
  fetch(`http://localhost:4000/api/v1/events`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(eventData)
  })
}

export const fetchEvents = () => dispatch => {
    fetch('http://localhost:4000/api/v1/events')
    .then(resp => resp.json())
    .then(events => {
      dispatch({
      type: ALL_EVENTS,
      payload: events
    })}
  )
}
