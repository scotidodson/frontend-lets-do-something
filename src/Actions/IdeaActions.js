import { FETCH_IDEAS, NEW_IDEA, SAVE_IDEA } from './types'

export const fetchIdeas = () => dispatch => {
    fetch('http://localhost:4000/api/v1/ideas')
    .then(resp => resp.json())
    .then(ideas => {
      console.log(ideas)
      dispatch({
      type: FETCH_IDEAS,
      payload: ideas
    })}
  )
}

export const createIdea = (ideaData) => dispatch => {
    fetch('http://localhost:4000/api/v1/ideas', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(ideaData)
    })
    .then(resp => resp.json())
    .then(newIdea => {
      dispatch({
      type: NEW_IDEA,
      payload: newIdea
    })}
  )
}

export const saveIdea = (ideaData) => dispatch => {
    fetch('http://localhost:4000/api/v1/user_ideas', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(ideaData)
    })
    .then(resp => resp.json())
    .then(savedIdea => {
      dispatch({
      type: SAVE_IDEA,
      payload: savedIdea
    })}
  )
}
