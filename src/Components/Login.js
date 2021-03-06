import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUsers, fetchCurrentUser, assignUser } from '../Actions/UserActions.js'
import { fetchIdeas } from '../Actions/IdeaActions.js'
import { fetchEvents } from '../Actions/EventActions.js'
import login from '../Images/log_in.png'
import logo from '../Images/lds_logo.png'


class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  componentWillMount() {
    this.props.fetchUsers()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.fetchIdeas()
    this.props.fetchEvents()
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
      <div className="welcome">
        <div className="welcome-header">
          <img src={logo} alt="Let's Do Something" className="welcome-logo" /><br/>
          <img src={login} onClick={this.handleClick} className="toggle" alt="Log In" width="220px" /><br/>
        </div>
        <div className="login-form">
          <form onSubmit={this.handleSubmit}>
            <div>
              <h4>Username:</h4>
              <input type="text" name="username" value={this.state.username} onChange={this.handleInput}/>
              <h4>Password:</h4>
              <input type="password" name="password" value={this.state.password} onChange={this.handleInput}/>
            </div>

            <input className="welcome-button" type="submit" value="Login" height="80px"/>
          </form>
          </div>
      </div>
    );
  }
}

Login.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetchIdeas: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  assignUser: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  allUsers: state.users.allUsers,
  currentUser: state.users.currentUser
})

export default connect(mapStateToProps, { fetchUsers, assignUser, fetchCurrentUser, fetchIdeas, fetchEvents })(Login);
