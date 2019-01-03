import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUsers, assignUser, fetchCurrentUser } from '../../Actions/UserActions.js'
import login from '../../Images/log_in.png'
import './Login.css'


class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  componentWillMount() {
    this.props.fetchUsers()
    // window.clearInterval(NOTIFICATION_CHECKER)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const user = this.props.allUsers.find(userObj => userObj.username.toLowerCase() === this.state.username.toLowerCase())
    if (user) {
      if (user.password === this.state.password) {
        this.props.assignUser(user.id)
        this.props.fetchCurrentUser(user.id)
        this.props.history.push('/');
      } else {
        alert("Incorrect password. Try again.")
      }
    } else {
      alert("That username does not exist. Try again.")
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleClick = () => {
    this.props.history.push('/sign-up');
  }

  render() {
    return (
      <div className="login-form">
        <img src={login} onClick={this.handleClick} alt="login toggle" width="200px" />
        <form onSubmit={this.handleSubmit} >
          Username:<br/>
          <input type="text" name="username" value={this.state.username} onChange={this.handleInput}/>
          <br/>
          Password:<br/>
          <input type="password" name="password" value={this.state.password} onChange={this.handleInput}/>
          <br/><br/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  assignUser: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  allUsers: state.users.allUsers,
  currentUser: state.users.currentUser
})

export default connect(mapStateToProps, { fetchUsers, assignUser, fetchCurrentUser })(Login);
