import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFriend, removeFriend, fetchCurrentUser } from '../../../Actions/UserActions.js'
// import { Route, Link } from 'react-router-dom'
// import { createBrowserHistory } from 'history';
// import IdeaDetails from '../IdeaDetails/IdeaDetails.js'



class ContactCard extends Component {
  state = {
    alreadyFriended: false,
    friendship_one: {},
    friendship_two: {}
  }

  componentWillMount() {

    // console.log(this.props.user);
    // console.log(this.props.currentUser);
  }

  handleFriendship = (e) => {
    const userId = this.props.currentUser.id
    const friendId = this.props.user.id

    if (e.target.name === "removeFriend") {
      const friendship_one = this.props.currentUser.friendships.find(friendshipObj => { return friendshipObj.friend_id === this.props.user.id })

      const friendship_two = this.props.user.friendships.find(friendshipObj => { return friendshipObj.user_id === this.props.currentUser.id })

      this.props.removeFriend(friendship_one, friendship_two)
    } else {
      this.props.addFriend(userId, friendId)
    }
  }
  //
  // alreadyFriended = () => {
  //   // const friends = this.props.currentUser.friends
  //
  //   // debugger
  //   console.log('this.state.currentUser', this.state.currentUser);
  //   let friendStatus = false
  //   // if (friends.length > 0) {
  //   //   friends.forEach(friendObj => {
  //   //     if (friendObj.id === this.props.user.id) {
  //   //       friendStatus = true
  //   //     }
  //   //   })
  //   // }
  //   const usersFriends = this.props.user.friends
  //
  //   // const friendIdArr = friends.map(friendObj => {
  //   //   return friendObj.id
  //   // })
  //
  //   // debugger
    // if (friendStatus) {
    //   const f_one = friends.find(friendshipObj => { return friendshipObj.friend_id === this.props.user.id })
    //   const f_two = usersFriends.find(friendshipObj => { return friendshipObj.user_id === this.props.currentUser.id })
    //
    //   this.setState({
    //     alreadyFriended: true,
    //     friendship_one: f_one,
    //     friendship_two: f_two
    //   })
    // }
  // }

  alreadyFriended = () => {
    if (this.props.currentUser) {
      if (this.props.currentUser.friends.includes(this.props.user)) {
        this.setState({ alreadyFriended: true })
      }

    }
  }

  render() {

    return (
        <div data-id={this.props.user.id} >
          {console.log(this.props.currentUser)}
          <button data-id={this.props.user.id} name={addFriend}
          onClick={this.handleFriendship}> Add Friend </button>

          <button data-id={this.props.user.id} name={removeFriend}
          onClick={this.handleFriendship}> Remove Friend </button>
          <h4>{this.props.user.first_name} {this.props.user.last_name} </h4>
          <p>Username: {this.props.user.username} </p>
          <p>City: {this.props.user.default_city} </p>
          <p>Bio: {this.props.user.bio} </p>
        </div>
    );
  }
}

ContactCard.propTypes = {
  currentUser: PropTypes.object.isRequired,
  allUsers: PropTypes.array.isRequired,
  addFriend: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  allUsers: state.users.allUsers
})

export default connect(mapStateToProps, { addFriend, removeFriend, fetchCurrentUser })(ContactCard);
