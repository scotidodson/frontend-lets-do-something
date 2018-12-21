import React, { Component } from 'react';

class FriendButton extends Component {

  render() {

    return (
        <div>
          <button hidden> {this.props.friendStatus ? "Remove Friend" : "Add Friend"} </button>
        </div>
    );
  }
}


export default FriendButton
