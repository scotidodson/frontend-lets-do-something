import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../IdeaContainer.css'
// import { createBrowserHistory } from 'history';
// import IdeaDetails from '../IdeaDetails/IdeaDetails.js'



class IdeaCard extends Component {
  render() {

    return (
      <Link to={`/ideas/${this.props.idea.id}`}>
        <div className="idea-card" data-id={this.props.idea.id} >
          <h4>-- {this.props.idea.title} --</h4>
        </div>
      </Link>

    );
  }
}

export default IdeaCard;

//
