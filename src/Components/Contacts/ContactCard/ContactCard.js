import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom'
// import { createBrowserHistory } from 'history';
// import IdeaDetails from '../IdeaDetails/IdeaDetails.js'



class ContactCard extends Component {
  render() {
    return (
        <div data-id={this.props.user.id} >
          <h3>{this.props.user.first_name} {this.props.user.last_name} </h3>
          <h4>{this.props.user.username} </h4>
          <h4>{this.props.user.default_city} </h4>
          <h4>{this.props.user.bio} </h4>
        </div>
    );
  }
}

export default ContactCard;

//      <Link to={`/ideas/${this.props.idea.id}`}>
      // </Link>
