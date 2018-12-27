import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFriend, removeFriend, fetchUsers } from '../../../Actions/UserActions.js'
import { updateUser } from '../../../Actions/UserActions.js'
// import { Route, Link } from 'react-router-dom'
// import { createBrowserHistory } from 'history';
import FriendButton from '../FriendButton/FriendButton.js'



class ContactCard extends Component {
  constructor(props) {
    super()
    this.state = {
    friendStatus: props.alreadyFriended
    }
  }

  handleFriendship = (e) => {
    const allUserData = this.props.allUsers
    const user = this.props.currentUser
    const userId = this.props.currentUser.id
    const friend = this.props.user
    const friendId = this.props.user.id
    console.log(this.props.user);
    console.log(friendId);

    if (e.target.name === "removeFriend") {
      const friendship_one = user.friendships.filter(friendshipObj => {
        return friendshipObj.friend.id === friend.id })[0]

      const friendObj = allUserData.filter(user=>{ return user.id === friendId })[0]

      const friendship_two = friendObj.friendships.filter(friendshipObj => { return friendshipObj.friend.id === user.id })[0]

      // console.log(user.friendships);
      // console.log(friendObj.friendships);
      // console.log(friendship_one, friendship_two);

      this.props.removeFriend(friendship_one.id, friendship_two.id)
      this.removeFriend(friendship_one.id)

    } else {
      this.addFriend(userId, friendId, friend)
    }
  }

  removeFriend = (friendshipId) => {
    let updatedUserObj = {...this.props.currentUser}
    const updatedFriendships = updatedUserObj.friendships.filter(friendship=>{
      return friendship.id !== friendshipId
    })

    updatedUserObj.friendships = [ ...updatedFriendships ]
    this.props.updateUser(updatedUserObj)

  }

  addFriend = (userId, friendId, friend) => {
    let updatedUserObj = {...this.props.currentUser}

    updatedUserObj.friendships = [
      ...updatedUserObj.friendships,
      {
        id: 0,
        friend: { ...friend }
      }]
      this.props.updateUser(updatedUserObj)

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
    // this.props.history.push('/contacts');

  }


  render() {

    return (
        <div data-id={this.props.user.id} >
          {this.props.alreadyFriended ? <button data-id={this.props.user.id} name="removeFriend"
          onClick={this.handleFriendship}> Remove Friend </button> : <button data-id={this.props.user.id} name="addFriend"
          onClick={this.handleFriendship}> Add Friend </button>}


          <h4>{this.props.user.first_name} {this.props.user.last_name} </h4>
          <p>Username: {this.props.user.username} </p>
          <p>City: {this.props.user.default_city} </p>
          <p>Bio: {this.props.user.bio} </p>

          <br/>
          <br/>
        </div>
    );
  }
}

ContactCard.propTypes = {
  currentUser: PropTypes.object.isRequired,
  allUsers: PropTypes.array.isRequired,
  addFriend: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  allUsers: state.users.allUsers
})

export default connect(mapStateToProps, { updateUser, addFriend, removeFriend, fetchUsers })(ContactCard);
