import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createUser } from '../../Actions/UserActions.js'
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
    img_url: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {...this.state}
    this.props.createUser(newUser)
  }

  render() {
    return (
      <div className="sign-up-form">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>

          <select name="city" onChange={this.handleChange}>
          <option value="NYC">NYC</option>
          </select><br/><br/>

          <input type="text" name="first_name" onChange={this.handleChange}
          placeholder="First Name" value={this.state.title} />

          <input type="text" name="last_name" onChange={this.handleChange}
          placeholder="Last Name" value={this.state.street} /><br/><br/>

          <input type="text" name="username" onChange={this.handleChange}
          placeholder="Username" value={this.state.username} />

          <input type="text" name="password" onChange={this.handleChange}
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
