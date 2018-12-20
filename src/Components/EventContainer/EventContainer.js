import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom'
import EventCard from './EventCard.js'
import { connect } from 'react-redux';
import { fetchEvents } from '../../Actions/EventActions.js'


class EventContainer extends Component {
  componentWillMount() {
    this.props.fetchEvents()
  }

  renderEvents = () => {
    return this.props.allEvents.map(event => {
      return(<EventCard key={event.id} event={event} />)
    })
  }

  render() {
    return (
      <div>
        <h4>My Events</h4>
        {this.renderEvents()}
      </div>

    );
  }
}

EventContainer.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  allEvents: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  allEvents: state.events.allEvents
})

export default connect(mapStateToProps, { fetchEvents })(EventContainer);
