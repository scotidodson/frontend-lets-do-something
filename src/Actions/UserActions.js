import { CURRENT_USER, NEW_USER, FETCH_USERS
 } from './types'

export const fetchCurrentUser = (userId) => dispatch => {
    fetch('http://localhost:4000/api/v1/users')
    .then(resp => resp.json())
    .then(users => {
      console.log(users)
      const currentUser = users.map(userObj =>{
        if (userObj.id === userId) {
          return  userObj
        }
      })[0]
      dispatch({
      type: CURRENT_USER,
      payload: currentUser
    })}
  )
}

export const fetchUsers = () => dispatch => {
    fetch('http://localhost:4000/api/v1/users')
    .then(resp => resp.json())
    .then(allUsers => {
      dispatch({
      type: FETCH_USERS,
      payload: allUsers
    })}
  )
}

export const createUser = (userData) => dispatch => {
    fetch('http://localhost:4000/api/v1/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(resp => resp.json())
    .then(newUser => {
      dispatch({
      type: NEW_USER,
      payload: newUser
    })}
  )
}

export const addFriend = (userId, friendId) => dispatch => {
    fetch('http://localhost:4000/api/v1/friendships', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        friend_id: friendId
      })
    })
    fetch('http://localhost:4000/api/v1/friendships', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        user_id: friendId,
        friend_id: userId
      })
    })
    fetchCurrentUser(userId)
}

export const removeFriend = (friendship_one, friendship_two) => dispatch => {
    const userId = friendship_one.user_id
    fetch(`http://localhost:4000/api/v1/friendships/${friendship_one.id}`, {
      method: 'DELETE'
    })

    fetch(`http://localhost:4000/api/v1/friendships/${friendship_two.id}`, {
      method: 'DELETE'
    })
    fetchCurrentUser(userId)
}
