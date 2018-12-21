import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFriend, removeFriend, fetchCurrentUser, fetchUsers } from '../../../Actions/UserActions.js'
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

      console.log(user.friendships);
      console.log(friendObj.friendships);
      console.log(friendship_one, friendship_two);

      this.props.removeFriend(friendship_one.id, friendship_two.id)
      
    } else {
      this.props.addFriend(userId, friendId)
    }
    this.props.fetchUsers()
    this.redirect()
  }

  redirect = () => {
    this.setState((currentState)=>{
      return{friendStatus: !currentState.friendStatus}
    })
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
  fetchUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  allUsers: state.users.allUsers
})

export default connect(mapStateToProps, { addFriend, removeFriend, fetchCurrentUser, fetchUsers })(ContactCard);
