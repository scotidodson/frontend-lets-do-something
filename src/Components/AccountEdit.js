import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { assignUser, patchUser, fetchCurrentUser } from '../Actions/UserActions.js'
import account from '../Images/account.png'
import avatars from '../Images/avatars/avatars.js'
import '../Stylesheets/Account.css'

class AccountEdit extends Component {
  state = {
    id: this.props.currentUser.id,
    first_name: this.props.currentUser.first_name,
    last_name: this.props.currentUser.last_name,
    username: this.props.currentUser.username,
    password: this.props.currentUser.password,
    phone: this.props.currentUser.phone,
    email: this.props.currentUser.email,
    birthday: this.props.currentUser.birthday,
    default_city: this.props.currentUser.default_city,
    bio: this.props.currentUser.bio,
    app_member: true,
    img_url: this.props.currentUser.img_url
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {...this.state}
    this.props.patchUser(this.props.userId, updatedUser)
    this.props.fetchCurrentUser(this.props.userId)
    this.props.redirect()
  }

  handleAvatar = (e) => {
    console.log(e.target.dataset.id);
    const avatarKeys = Object.keys(avatars)
    const lastIndex = avatarKeys.length - 1
    let current = avatarKeys.indexOf(e.target.dataset.id)

    switch (e.target.name) {
      case 'next':
        if (current === lastIndex) {
          this.setState({ img_url: avatarKeys[0] })
        } else {
          this.setState({ img_url: avatarKeys[++current] })
        }
        break;
      case 'back':
        if (current === 0) {
          this.setState({ img_url: avatarKeys[lastIndex] })
        } else {
          let newIndex = current -= 1
          this.setState({ img_url: avatarKeys[newIndex] })
        }
        break;
      default:
    }
  }


  render() {
    return (
      <div>

        <img src={avatars[this.state.img_url]} value={this.state.img_url} alt="account" height="200px" />
        <br/>
        <a onClick={this.handleAvatar} data-id={this.state.img_url} name='back'> ⬅️ </a>
        <a onClick={this.handleAvatar} data-id={this.state.img_url} name='next'> ➡️ </a>

        <div className="sign-up-form">
          <form onSubmit={this.handleSubmit}>

            <label>Name: </label>
            <input type="text" name="first_name" onChange={this.handleChange}
            placeholder="First Name" value={this.state.first_name} />

            <input type="text" name="last_name" onChange={this.handleChange}
            placeholder="Last Name" value={this.state.last_name} /><br/><br/>

            <label>Username: </label>
            <input type="text" name="username" onChange={this.handleChange}
            placeholder="Username" value={this.state.username} /><br/><br/>

            <label>Password: </label>
            <input type="password" name="password" onChange={this.handleChange}
            placeholder="Password" value={this.state.password} /><br/><br/>

            <label>Location: </label>
            <select name="city" onChange={this.handleChange}>
            <option value="NYC">NYC</option>
            </select><br/><br/>

            <label>Phone: </label>
            <input type="text" name="phone" onChange={this.handleChange}
            placeholder="Phone"
            value={this.state.phone} /><br/><br/>

            <label>Email: </label>
            <input type="text" name="email" onChange={this.handleChange}
            placeholder="Email" value={this.state.email} /><br/><br/>

            <label>Birthday: </label>
            <input type="text" name="birthday" onChange={this.handleChange}
            placeholder="Birthday" value={this.state.birthday} /><br/><br/>

            <label>Bio: </label>
            <textarea type="text" name="bio" onChange={this.handleChange}
            placeholder="Bio"
             value={this.state.bio} /><br/><br/>

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

AccountEdit.propTypes = {
  currentUser: PropTypes.object.isRequired,
  assignUser: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  userId: state.users.userId
})

export default connect(mapStateToProps, { assignUser, patchUser, fetchCurrentUser })(AccountEdit);
