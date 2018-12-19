import { CURRENT_USER, NEW_USER, FETCH_USERS } from './types'

// export const fetchCurrentUser = (userId) => dispatch => {
//     fetch('http://localhost:4000/api/v1/users')
//     .then(resp => resp.json())
//     .then(users => {
//       console.log(users)
//       const currentUser = users.map(userObj =>{
//         if (userObj.id === userId) {
//           return  userObj
//         }
//       })[0]
//       dispatch({
//       type: CURRENT_USER,
//       payload: ideas
//     })}
//   )
// }

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
