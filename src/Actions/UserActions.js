import { CURRENT_USER, FETCH_USERS, SAVED_IDEAS, UPDATE_USER
 } from './types'

// export const fetchCurrentUser = (userId) => dispatch => {
//     fetch('http://localhost:4000/api/v1/users')
//     .then(resp => resp.json())
//     .then(users => {
//     const current = users.filter(userObj => {
//       return userObj.id === userId
//     })[0]
//       dispatch({
//         type: CURRENT_USER,
//         payload: current
//     })
//   })
// }

export const fetchUsers = () => dispatch => {
    fetch('http://localhost:4000/api/v1/users')
    .then(resp => resp.json())
    .then(allUsers => {
      const current = allUsers.filter(userObj => {
        return userObj.id === 1
      })[0]
      dispatch({
      type: FETCH_USERS,
      payload: allUsers
      })
      dispatch({
        type: CURRENT_USER,
        payload: current
      })
      dispatch({
        type: SAVED_IDEAS,
        payload: current.user_ideas
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
    }).then(resp=>{
      fetchUsers()
    })
}

export const removeFriend = (friendship_one, friendship_two) => dispatch => {
  console.log('f 1 id', friendship_one);
  console.log('f 2 id', friendship_two);
    // const userId = friendship_one.user_id
    fetch(`http://localhost:4000/api/v1/friendships/${friendship_one}`, {
      method: 'DELETE'
    })

    fetch(`http://localhost:4000/api/v1/friendships/${friendship_two}`, {
      method: 'DELETE'
    })
    fetchUsers()
}

export const updateUser = (userObj) => dispatch => {
  console.log('in update user', userObj);
  dispatch({
    type: CURRENT_USER,
    payload: userObj
  })
  dispatch({
    type: SAVED_IDEAS,
    payload: userObj.user_ideas
  })
}
