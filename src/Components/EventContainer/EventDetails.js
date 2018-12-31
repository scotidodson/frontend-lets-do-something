import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
// import { saveIdea, fetchIdeas, removeIdea, fetchUserIdeas } from '../../Actions/IdeaActions.js'


class EventDetails extends Component {



  render() {
    const event = this.props.currentUser.events.find(event => {
      return event.id === Number(this.props.match.params.eventId)
    })


    return (
      <div>
        <h4>-- {event.id} --</h4>
        <p>details</p>

      </div>
    );
  }
}

EventDetails.propTypes = {
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
})

export default connect(mapStateToProps)(EventDetails);



// <p>Location: {event.street} {event.city} {event.state} {event.zip}</p>
// <p>Neighborhood: {event.neighborhood}</p>
// <p>Category: {event.category}</p>
// <p>Price Range: {this.checkPrice(event)}</p>
// <p>Good For:
//   {event.winter ? " Winter" : null}
//   {event.spring ? " Spring" : null}
//   {event.summer ? " Summer" : null}
//   {event.fall ? " Fall" : null}</p>
// <p>Duration: {event.duration}</p>
// <p>Category: {event.category}</p>
// { event.expiration ? <p>Have to go by: {event.expiration.date}</p> : null }
// { event.website.length > 0  ? <p>Website: {event.website}</p> : null }
// <p>Details: {event.details}</p>
//
// <br/><br/>
