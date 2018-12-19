import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
// import { createBrowserHistory } from 'history';
import IdeaDetails from '../IdeaDetails/IdeaDetails.js'



class IdeaCard extends Component {
  render() {

    return (
      <Link to={`/ideas/${this.props.idea.id}`}>
        <div data-id={this.props.idea.id} >
          <h4>-- {this.props.idea.title} --</h4>
        </div>
      </Link>

    );
  }
}

export default IdeaCard;

//
