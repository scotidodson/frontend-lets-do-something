import { FETCH_IDEAS, NEW_IDEA, SAVED_IDEAS, USER_IDEAS } from './types'
import { fetchUsers } from './UserActions.js'

export const fetchIdeas = () => dispatch => {
    fetch('http://localhost:4000/api/v1/ideas')
    .then(resp => resp.json())
    .then(ideas => {
      dispatch({
      type: FETCH_IDEAS,
      payload: ideas
    })}
  )
}

export const fetchSavedIdeas = (userId) => dispatch => {
    fetch('http://localhost:4000/api/v1/users')
    .then(resp => resp.json())
    .then(ideas => {
      console.log(ideas)
      const savedIdeas = ideas.map(userObj =>{
        if (userObj.id === userId) {
          return  userObj.ideas
        } else {
          return null
        }
      })[0]
      dispatch({
      type: SAVED_IDEAS,
      payload: savedIdeas
    })
  })
}

export const fetchUserIdeas = () => dispatch => {
    fetch('http://localhost:4000/api/v1/user_ideas')
    .then(resp => resp.json())
    .then(userIdeas => {
      dispatch({
      type: USER_IDEAS,
      payload: userIdeas
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
    })
    fetchIdeas()
  }
  )
}

export const saveIdea = (ideaData) => dispatch => {
    fetch('http://localhost:4000/api/v1/user_ideas', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(ideaData)
    }).then(resp =>{
      fetchUsers()
    })
}

export const removeIdea = (userIdeaId) => dispatch => {
    fetch(`http://localhost:4000/api/v1/user_ideas/${userIdeaId}`, {
      method: 'DELETE'
    })
}
