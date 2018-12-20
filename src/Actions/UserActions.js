import { CURRENT_USER, FETCH_USERS
 } from './types'

export const fetchCurrentUser = (userId) => dispatch => {
    fetch('http://localhost:4000/api/v1/users')
    .then(resp => resp.json())
    .then(users => {
      // const current = users.filter(userObj => {
      //   return userObj.id === userId
      // })[0]
    //   dispatch({
    //     type: CURRENT_USER,
    //     payload: current
    // })
  })
}

export const fetchUsers = () => dispatch => {
    fetch('http://localhost:4000/api/v1/users')
    .then(resp => resp.json())
    .then(allUsers => {
      dispatch({
      type: FETCH_USERS,
      payload: allUsers
    })
    dispatch({
      type: CURRENT_USER,
      payload: allUsers.filter(userObj => {
        return userObj.id === 1
      })[0]
  })
  }
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
  //   .then(resp => resp.json())
  //   .then(newUser => {
  //     dispatch({
  //     type: NEW_USER,
  //     payload: newUser
  //   })}
  // )
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
    fetchUsers()
}

export const removeFriend = (friendship_one, friendship_two) => dispatch => {
    // const userId = friendship_one.user_id
    fetch(`http://localhost:4000/api/v1/friendships/${friendship_one.id}`, {
      method: 'DELETE'
    })

    fetch(`http://localhost:4000/api/v1/friendships/${friendship_two.id}`, {
      method: 'DELETE'
    })
    fetchUsers()
}
