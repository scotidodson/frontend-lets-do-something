import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
// import { createBrowserHistory } from 'history';
import EventDetails from './EventDetails.js'



class EventCard extends Component {
  render() {

    return (

        <div data-id={this.props.event.id} >
          <h4>-- {this.props.event.title} --</h4>
        </div>


    );
  }
}

export default EventCard;

//<Link to={`/ideas/${this.props.idea.id}`}>
// </Link>
