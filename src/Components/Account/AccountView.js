import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { assignUser } from '../../Actions/UserActions.js'
import account from '../../Images/account.png'
import avatars from '../../Images/avatars/avatars.js'
// import  PropTypes from 'prop-types'

class AccountView extends Component {


  render() {
    return (
      <div>
        <img src={account} alt="account" height="200px" />
        <img src={avatars.charlie} alt="account" height="200px" />
        <h4>Name: {this.props.currentUser.first_name} {this.props.currentUser.last_name}</h4>
        <p>Username: {this.props.currentUser.username}</p>
        <p>Password: ******* </p>
        <p>Location: {this.props.currentUser.default_city}</p>
        <p>Phone: {this.props.currentUser.phone}</p>
        <p>Email: {this.props.currentUser.email}</p>
        <p>Birthday: {this.props.currentUser.birthday}</p>
        <p>Bio: {this.props.currentUser.bio}</p>
      </div>
    );
  }
}

AccountView.propTypes = {
  currentUser: PropTypes.object.isRequired,
  assignUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
})

export default connect(mapStateToProps, { assignUser })(AccountView);
