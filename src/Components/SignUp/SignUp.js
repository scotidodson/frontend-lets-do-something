import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createUser } from '../../Actions/UserActions.js'
import avatars from '../../Images/avatars/avatars.js'
import signup from '../../Images/sign_up.png'
import './SignUp.css'
// import IdeaCard from '../IdeaCard/IdeaCard.js'
// import Home from './Home/Home.js'


class SignUp extends Component {
  state = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    phone: '',
    email: '',
    birthday: '',
    default_city: 'NYC',
    bio: '',
    app_member: true,
    img_url: 'britt'
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {...this.state}
    this.props.createUser(newUser)
  }

  handleClick = () => {
    this.props.history.push('/login');
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
      <div className="sign-up-form">
        <img src={signup} onClick={this.handleClick} alt="signup toggle" width="200px" />

        <h2>Sign Up</h2>

        <label>Choose an Avatar</label><br/>
        <a onClick={this.handleAvatar} data-id={this.state.img_url} name='back'> ⬅️ </a>
        <img src={avatars[this.state.img_url]} value={this.state.img_url} alt="account" height="200px" />
        <a onClick={this.handleAvatar} data-id={this.state.img_url} name='next'> ➡️ </a>


        <form onSubmit={this.handleSubmit}>

          <select name="city" onChange={this.handleChange}>
          <option value="NYC">NYC</option>
          </select><br/><br/>

          <input type="text" name="first_name" onChange={this.handleChange}
          placeholder="First Name" value={this.state.first_name} />

          <input type="text" name="last_name" onChange={this.handleChange}
          placeholder="Last Name" value={this.state.last_name} /><br/><br/>

          <input type="text" name="username" onChange={this.handleChange}
          placeholder="Username" value={this.state.username} />

          <input type="password" name="password" onChange={this.handleChange}
          placeholder="Password" value={this.state.password} /><br/><br/>

          <input type="text" name="phone" onChange={this.handleChange}
          placeholder="Phone"
          value={this.state.phone} />

          <input type="text" name="email" onChange={this.handleChange}
          placeholder="Email" value={this.state.email} /><br/><br/>

          <input type="text" name="birthday" onChange={this.handleChange}
          placeholder="Birthday" value={this.state.birthday} /><br/><br/>

          <textarea type="text" name="bio" onChange={this.handleChange}
          placeholder="Bio"
           value={this.state.neighborhood} /><br/><br/>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  createUser: PropTypes.func.isRequired
}

export default connect(null, { createUser })(SignUp);


// expiration: null,
// expiration_date: null,
