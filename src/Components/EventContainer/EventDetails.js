import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../../Actions/UserActions.js'
import { fetchIdeas } from '../../Actions/IdeaActions.js'
import { fetchEvents } from '../../Actions/EventActions.js'
import OptionCard from './OptionCard/OptionCard.js'


class EventDetails extends Component {
  componentWillMount() {
    this.props.fetchCurrentUser(this.props.userId)
    this.props.fetchIdeas()
    this.props.fetchEvents()
  }

  renderEvent = () => {
    const thisEvent = this.props.allEvents.find(event => {
      return event.id === Number(this.props.match.params.eventId)
    })

    const guests = thisEvent.guests
    const thisGuest = guests.find(g => { return g.user.id === this.props.userId  })
    const userIsHost = thisGuest.host

    // switch (userIsHost) {
      // case true:
      //   if (thisEvent.winner) {
      //     return this.renderWinner(thisEvent)
      //   } else {
      //     return this.renderActivePoll(thisEvent)
      //   }
      //
      //   break;
      // case false:
        // if (thisGuest.rsvp === "yes") {
        //   if (thisEvent.winner) {
        //     return this.renderWinner(thisEvent)
        //   } else {
        //     return this.renderActivePoll(thisEvent)
        //   }
        // } else if (thisGuest.rsvp === "no") {
        //   return this.renderSaidNo(thisEvent)
        //
        // } else {
        //   if (thisEvent.winner) {
        //     return this.renderRsvpChangePage(thisEvent)
        //   } else {
            return this.renderVotePage(thisEvent)
    //       }
    //     }
    //     break;
    //   default:
    //     return <h4>Hmm... this event has been cancelled.</h4>
    // }
  }

  renderWinner = (thisEvent) => {
    const eventGuests = thisEvent.guests
    console.log(eventGuests);
    console.log(thisEvent);
    const winningIdea = this.props.allIdeas.find(idea => { return idea.id === thisEvent.winner })
    const host = thisEvent.guests.find(guest => { return guest.host === true }).user
    let month
    switch (thisEvent.month) {
        case 1:
          month = 'Jan.'
        break;
        case 2:
          month = 'Feb.'
        break;
        case 3:
          month = 'Mar.'
        break;
        case 4:
          month = 'Apr.'
        break;
        case 5:
          month = 'May'
        break;
        case 6:
          month = 'June'
        break;
        case 7:
          month = 'July'
        break;
        case 8:
          month = 'Aug.'
        break;
        case 9:
          month = 'Sept.'
        break;
        case 10:
          month = 'Oct.'
        break;
        case 11:
          month = 'Nov.'
        break;
        case 12:
          month = 'Dec.'
        break;
        default:
      }

    return(
      <div>
        <div>
          <h2>{winningIdea.title}</h2>
          <h3>{month} {thisEvent.day} at {thisEvent.hour}:{thisEvent.minute} {thisEvent.am ? "am":"pm"}</h3>
          <div>
            <h4>Details</h4>
            <p>{winningIdea.price_range}</p>
            <p>{winningIdea.neighborhood}</p>
            <p>{winningIdea.street}</p>
            <p>{winningIdea.city}, {winningIdea.state} {winningIdea.zip}</p>
            <p>{winningIdea.duration}</p>
            <p>{winningIdea.details}</p>
          </div>
          <div>
            <h4>Guests</h4>
            {this.renderGuests(thisEvent)}
          </div>
          <div style={host.id === this.props.userId ? {} : { display: 'none' }}>
            <h4>put a cancel button here</h4>
          </div>
        </div>
      </div>
    )
  }

  renderGuests = (thisEvent) => {
    const eventGuests = thisEvent.guests
    return eventGuests.map(guest => {
      console.log('guest',guest);
      return(
        <p>{guest.host ? "(HOST) ":null}{guest.user.first_name} {guest.user.last_name}: {guest.user.rsvp ? guest.user.rsvp:"No Response"}</p>
      )
    })
  }

  renderActivePoll = (thisEvent) => {
    // current results poll happening
    // include cancel button for host

    const eventGuests = thisEvent.guests
    console.log(eventGuests);
    console.log(thisEvent);
    const host = thisEvent.guests.find(guest => { return guest.host === true }).user
    let month
    switch (thisEvent.month) {
        case 1:
          month = 'Jan.'
        break;
        case 2:
          month = 'Feb.'
        break;
        case 3:
          month = 'Mar.'
        break;
        case 4:
          month = 'Apr.'
        break;
        case 5:
          month = 'May'
        break;
        case 6:
          month = 'June'
        break;
        case 7:
          month = 'July'
        break;
        case 8:
          month = 'Aug.'
        break;
        case 9:
          month = 'Sept.'
        break;
        case 10:
          month = 'Oct.'
        break;
        case 11:
          month = 'Nov.'
        break;
        case 12:
          month = 'Dec.'
        break;
        default:
      }

    return(
      <div>
        <div>
          <h2>Poll in Process</h2>
          <h3>{month} {thisEvent.day} at {thisEvent.hour}:{thisEvent.minute} {thisEvent.am ? "am":"pm"}</h3>
          <div>
            <h4>Options</h4>
            {this.renderOptionCards(thisEvent, false)}
          </div>
          <div>
            <h4>Guests</h4>
            {this.renderGuests(thisEvent)}
          </div>
          <div style={host.id === this.props.userId ? {} : { display: 'none' }}>
            <h4>put a cancel button here</h4>
          </div>
        </div>
      </div>
    )

  }

  renderOptionCards = (thisEvent, votingOptions) => {
    const options = thisEvent.options
    console.log(options);
    return options.map(opt => {
      return <OptionCard key={opt.id} option={opt} idea={opt.idea} votingOptions={votingOptions}/>
    })

  }

  renderVotePage = (thisEvent) => {
    const eventGuests = thisEvent.guests
    console.log(eventGuests);
    console.log(thisEvent);
    const host = thisEvent.guests.find(guest => { return guest.host === true }).user
    let month
    switch (thisEvent.month) {
        case 1:
          month = 'Jan.'
        break;
        case 2:
          month = 'Feb.'
        break;
        case 3:
          month = 'Mar.'
        break;
        case 4:
          month = 'Apr.'
        break;
        case 5:
          month = 'May'
        break;
        case 6:
          month = 'June'
        break;
        case 7:
          month = 'July'
        break;
        case 8:
          month = 'Aug.'
        break;
        case 9:
          month = 'Sept.'
        break;
        case 10:
          month = 'Oct.'
        break;
        case 11:
          month = 'Nov.'
        break;
        case 12:
          month = 'Dec.'
        break;
        default:
      }

    return(
      <div>
        <div>
          <h2>Poll in Process</h2>
          <h3>{month} {thisEvent.day} at {thisEvent.hour}:{thisEvent.minute} {thisEvent.am ? "am":"pm"}</h3>
          <div>
            <h4>Options</h4>
            {this.renderOptionCards(thisEvent, true)}
          </div>
          <div>
            <h4>Guests</h4>
            {this.renderGuests(thisEvent)}
          </div>
          <div style={host.id === this.props.userId ? {} : { display: 'none' }}>
            <h4>put a cancel button here</h4>
          </div>
        </div>
      </div>
    )
  }

  renderRsvpChangePage = (thisEvent) => {
    return <h3>You already sent an RSVP to say you can't make it. :( </h3>
  }

  renderSaidNo = (thisEvent) => {
    return <h3>You already sent an RSVP to say you can't make it. :( </h3>
    }

  render() {


    return (
      <div>
        {this.renderEvent()}
      </div>
    );
  }
}

EventDetails.propTypes = {
  currentUser: PropTypes.object.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchIdeas: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  userId: state.users.userId,
  allIdeas: state.ideas.allIdeas,
  allEvents: state.events.allEvents
})

export default connect(mapStateToProps, { fetchCurrentUser, fetchIdeas, fetchEvents })(EventDetails);
