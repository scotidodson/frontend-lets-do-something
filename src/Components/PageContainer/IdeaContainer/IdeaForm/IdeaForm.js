import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Link, Switch} from 'react-router-dom'
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createIdea } from '../../../../Actions/IdeaActions.js'
// import IdeaCard from '../IdeaCard/IdeaCard.js'
// import Home from './Home/Home.js'


class IdeaForm extends Component {
  state = {
    title: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const newIdea = {
      title: this.state.title,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    }
    this.props.createIdea(newIdea)
    // return <Redirect to="/brainstorm"/>
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        Title:<br/>
        <input type="text" name="title" onChange={this.handleChange} value={this.state.title} /><br/>

        Location:<br/>
        <input type="text" name="street" onChange={this.handleChange} value={this.state.street} /><br/>

        <input type="text" name="city" onChange={this.handleChange} value={this.state.city} /><br/>

        <input type="text" name="state" onChange={this.handleChange} value={this.state.state} /><br/>

        <input type="text" name="zip" onChange={this.handleChange} value={this.state.zip} /><br/><br/>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

IdeaForm.propTypes = {
  createIdea: PropTypes.func.isRequired
}
export default connect(null, { createIdea })(IdeaForm);
