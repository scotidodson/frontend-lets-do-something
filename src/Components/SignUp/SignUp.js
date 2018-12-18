import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createUser } from '../../Actions/UserActions.js'
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
    gender: '',
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
      <form onSubmit={this.handleSubmit}>

        First Name:<br/>
        <input type="text" name="first_name" onChange={this.handleChange} value={this.state.title} /><br/><br/>

        Last Name:<br/>
        <input type="text" name="last_name" onChange={this.handleChange} value={this.state.street} /><br/><br/>

        Username:<br/>
        <input type="text" name="username" onChange={this.handleChange} value={this.state.neighborhood} /><br/><br/>

        Password:<br/>
        <input type="text" name="password" onChange={this.handleChange} value={this.state.neighborhood} /><br/><br/>

        Phone:<br/>
        <input type="text" name="phone" onChange={this.handleChange} value={this.state.neighborhood} /><br/><br/>

        Email:<br/>
        <input type="text" name="email" onChange={this.handleChange} value={this.state.neighborhood} /><br/><br/>

        Birthday:<br/>
        <input type="text" name="birthday" onChange={this.handleChange} value={this.state.neighborhood} /><br/><br/>

        Gender:<br/>
        <select name="gender" onChange={this.handleChange}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select><br/><br/>

        City:<br/>
        <select name="city" onChange={this.handleChange}>
          <option value="NYC">NYC</option>
        </select><br/><br/>

        Bio:<br/>
        <textarea type="text" name="bio" onChange={this.handleChange} value={this.state.neighborhood} /><br/><br/>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

SignUp.propTypes = {
  createUser: PropTypes.func.isRequired
}

export default connect(null, { createUser })(SignUp);


// expiration: null,
// expiration_date: null,
