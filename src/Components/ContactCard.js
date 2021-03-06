import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFriend, removeFriend, fetchUsers } from '../Actions/UserActions.js'
import { updateUser } from '../Actions/UserActions.js'
import avatars from '../Images/avatars/avatars.js'

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
  }


  render() {

    return (
        <div data-id={this.props.user.id} className="contact-card">
          <img src={avatars[this.props.user.img_url]} value={this.state.img_url} alt="avatar" height="150px" /><br/>
          <h4>{this.props.user.first_name} {this.props.user.last_name} </h4>

          {this.props.alreadyFriended ? <button data-id={this.props.user.id} name="removeFriend"
          onClick={this.handleFriendship} className="remove-friend"> Unfriend </button> : <button data-id={this.props.user.id} name="addFriend"
          onClick={this.handleFriendship} className="add-friend"> Add Friend </button>}
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
  updateUser: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  allUsers: state.users.allUsers
})

export default connect(mapStateToProps, { updateUser, addFriend, removeFriend, fetchUsers })(ContactCard);

// {this.props.alreadyFriended ? null: <p>@{this.props.user.username}</p>}
// {this.props.alreadyFriended ? null: <p>{this.props.user.default_city} </p>}
// {this.props.alreadyFriended ? null: <p>{this.props.user.bio} </p>}
// <br/>
// <br/>
