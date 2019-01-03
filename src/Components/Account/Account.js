import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { assignUser, deleteUser, fetchCurrentUser } from '../../Actions/UserActions.js'
import AccountEdit from './AccountEdit.js'
import AccountView from './AccountView.js'
import './Account.css'
// import  PropTypes from 'prop-types'

class Account extends Component {
  state = {
    edit: false
  }

  editAccount = () => {
    this.setState({ edit: true })
  }

  logout = () => {
    this.props.assignUser(0)
    window.location.href = "http://localhost:3000/"
    // this.props.history.push('/login');
  }

  deleteAccount = () => {
    const deletedUser = this.props.userId
    fetch('http://localhost:4000/api/v1/friendships')
      .then(resp => resp.json())
      .then(allFriendships => {
        const friendshipsToDelete = allFriendships.filter(friendshipObj => {
          return friendshipObj.friend_id === deleteUser
        })

      if (friendshipsToDelete.length > 0) {
        friendshipsToDelete.forEach(friendship => {
          fetch(`http://localhost:4000/api/v1/friendships/${friendship.id}`, {
            method: 'DELETE' })
        })
      }
    })
    this.props.deleteUser(deletedUser)
    alert('Your account has been deleted.')
    this.props.history.push('/welcome');
  }

  handleRedirect = () => {
    this.setState({ edit: false })

  }

  render() {
    return (
      <div className="account-page">
        {this.state.edit ? <AccountEdit redirect={this.handleRedirect}/>:<AccountView />}
        {this.state.edit ? null:<button onClick={this.editAccount}>Edit</button>}
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.deleteAccount}>Delete Account</button>
      </div>
    );
  }
}

Account.propTypes = {
  currentUser: PropTypes.object.isRequired,
  assignUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  userId: state.users.userId
})

export default connect(mapStateToProps, { assignUser, deleteUser, fetchCurrentUser })(Account);
