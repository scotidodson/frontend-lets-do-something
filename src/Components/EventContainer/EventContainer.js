import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom'
import EventCard from './EventCard.js'
import EventDetails from './EventDetails.js'
import { connect } from 'react-redux';
import { fetchEvents } from '../../Actions/EventActions.js'
import './EventContainer.css'


class EventContainer extends Component {

  renderEvents = () => {
    const events = this.props.currentUser.events
    console.log(events);
    // return this.props.allEvents.map(event => {
    //   return(<EventCard key={event.id} event={event} />)
    // })
    if (events && events.length > 0) {
      return events.map(thisEvent => {
        // console.log(thisEvent);
        return (
          <div className="event-card" key={thisEvent.id} data-id={thisEvent.id} onClick={this.handleClick}>
            {thisEvent.winner ? <h4 data-id={thisEvent.id}>{thisEvent.winner}</h4>:<h4 data-id={thisEvent.id}>Poll in Process</h4>}
            <p data-id={thisEvent.id}> {thisEvent.date}</p>
            <p data-id={thisEvent.id}>{thisEvent.time}</p>
          </div>
        )
      })
    } else {
      return <h4>You don't have any events yet!</h4>
    }
  }

  handleClick = (e) => {
    this.props.history.push(`/events/${e.target.dataset.id}`)

  }

  render() {
    return (
      <div>
        <h4>My Events</h4>
        <div className="event-card-container">
          {this.renderEvents()}
        </div>
      </div>

    );
  }
}

EventContainer.propTypes = {
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
})

export default connect(mapStateToProps)(EventContainer);
