import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../../Actions/UserActions.js'
import { fetchIdeas } from '../../Actions/IdeaActions.js'
import { fetchEvents } from '../../Actions/EventActions.js'
import OptionCard from './OptionCard/OptionCard.js'
import './EventDetails.css'


class EventDetails extends Component {
  componentWillMount() {
    this.props.fetchIdeas()
    this.props.fetchEvents()
  }

  renderEvent = () => {
    // debugger
    const thisEvent = this.props.allEvents.find(event => {
      return event.id === Number(this.props.match.params.eventId)
    })

    const guests = thisEvent.guests
    const thisGuest = guests.find(g => { return g.user.id === this.props.userId  })
    const userIsHost = thisGuest.host

    switch (userIsHost) {
      case true:
        if (thisEvent.winner) {
          return this.renderWinner(thisEvent)
        } else {
          return this.renderActivePoll(thisEvent)
        }

        break;
      case false:
        if (thisGuest.rsvp === "yes") {
          if (thisEvent.winner) {
            return this.renderWinner(thisEvent)
          } else {
            return this.renderActivePoll(thisEvent)
          }
        } else if (thisGuest.rsvp === "no") {
          return this.renderSaidNo(thisEvent)

        } else {
          if (thisEvent.winner) {
            // return this.renderRsvpChangePage(thisEvent)
            return this.renderWinner(thisEvent)
          } else {
            return this.renderVotePage(thisEvent)
          }
        }
        break;
      default:
        return <h4>Hmm... this event has been cancelled.</h4>
    }
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
      let cost
      switch (winningIdea.price_range) {
        case 0:
          cost = 'FREE'
          break;
        case 1:
          cost = '$'
          break;
        case 2:
          cost = '$$'
          break;
        case 3:
          cost = '$$$'
          break;
        default:

      }

    return(
      <div className="event-container">
        <div >
          <h3>{winningIdea.title}
          <br/>
          {month} {thisEvent.day} at {thisEvent.hour}:{thisEvent.minute} {thisEvent.am ? "am":"pm"}</h3>
            <p>{cost}</p>
            <p>{winningIdea.neighborhood}</p>
            <p>{winningIdea.street}</p>
            <p>{winningIdea.city}, {winningIdea.state} {winningIdea.zip}</p>
            <p>{winningIdea.details}</p>
            <br/>
            <h4>Guests</h4>
            {this.renderGuests(thisEvent)}
          </div>

      </div>
    )
  }

  renderGuests = (thisEvent) => {
    const eventGuests = thisEvent.guests
    return eventGuests.map(guest => {
      console.log('guest',guest);
      return(
        <p>{guest.user.first_name} {guest.user.last_name}: {guest.host ? "(HOST) ": guest.rsvp ? guest.rsvp.toUpperCase() : "No Response"}</p>
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
      <div className="idea-details-page">
        <div >
          <div>
          <h3>Poll in Process</h3>
          <h3>{month} {thisEvent.day} at {thisEvent.hour}:{thisEvent.minute} {thisEvent.am ? "am":"pm"}</h3>
          </div>
          <div>
            <h4>Options</h4>
            {this.renderOptionCards(thisEvent, false)}
          </div>
          <div>
            <h4>Guests</h4>
            {this.renderGuests(thisEvent)}
          </div>
          <div style={host.id === this.props.userId ? {} : { display: 'none' }}>
            <button data-eventId={thisEvent.id} onClick={this.endPoll}>END POLL</button>
          </div>
        </div>
      </div>
    )
  }

  endPoll = (e) => {
    const eventId = Number(e.target.dataset.eventid)
    const thisEvent = this.props.allEvents.find(e => { return e.id === eventId })
    // debugger
    this.calculateResults(thisEvent)
  }

  calculateResults = (thisEvent) => {
    console.log('calculating results');
      console.log('thisEvent', thisEvent);
      if (!thisEvent.winner) {
        let votes = []
        const options = thisEvent.options
        const count = options.length
        const results = options.map(option => {
          votes.push(option.votes)
          return { votes: option.votes,
                   idea: option.idea_id }
        })
        const sortedVotes = votes.sort().reverse()
        const winningVoteCount = sortedVotes[0]
        const winningResult = results.find(result => { return result.votes === winningVoteCount })
        const winningIdeaId = winningResult.idea
        let updatedEvent = {...thisEvent}
        updatedEvent.winner = winningIdeaId
        console.log('thisEvent with winner', updatedEvent);
        this.endOfPollAlert(updatedEvent)
      } else {
        return null
      }
  }

  addWinnerToEvent = (updatedEvent) => {
    fetch(`http://localhost:4000/api/v1/events/${updatedEvent.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedEvent)
    })
    this.props.history.push('/')
  }

  endOfPollAlert = (thisEvent) => {
    const eventGuests = thisEvent.guests
    const winningIdea = this.props.allIdeas.find(idea => { return idea.id === thisEvent.winner })
    const host = eventGuests.find(guest => { return guest.host === true }).user
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

    // console.log('winning idea', winningIdea);
    // console.log('host is', host);
    // debugger
    eventGuests.map(guestObj => {
      const customMsg = guestObj.host ? `Your poll ended -- ${winningIdea.title} won!`:`${host.first_name}'s poll ended -- Get ready for ${winningIdea.title} on ${month} ${thisEvent.day} at ${thisEvent.hour}:${thisEvent.minute} ${thisEvent.am ? 'am':'pm'}.`
      const newAlert = {
        user_id: guestObj.user.id,
        event_id: thisEvent.id,
        seen: false,
        message: customMsg
      }
      this.submitNotification(newAlert)
    })
    this.addWinnerToEvent(thisEvent)
  }

  submitNotification = (newNotification) => {
    console.log('submitting alert:', newNotification);
    fetch(`http://localhost:4000/api/v1/notifications`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNotification)
    })
  }

  renderOptionCards = (thisEvent, votingOptions) => {
    const options = thisEvent.options
    console.log(options);
    return options.map(opt => {
      return <OptionCard key={opt.id} thisEvent={thisEvent} option={opt} redirect={this.redirect} idea={opt.idea} votingOptions={votingOptions}/>
    })

  }

  redirect = (thisEvent) => {
    this.props.history.push('/events')
  }



  renderVotePage = (thisEvent) => {
    const eventGuests = thisEvent.guests
    const thisGuest = eventGuests.find(g => { return g.user.id === this.props.userId  })
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
      <div className="event-container">
        <div>
          <h2>Poll in Process</h2>
          <h3>{month} {thisEvent.day} at {thisEvent.hour}:{thisEvent.minute} {thisEvent.am ? "am":"pm"}</h3>
          <div>
            <h4>Can't make it?</h4>
            <button id={thisEvent.id} onClick={this.handleRsvpNo}>Not this time... </button>
            <h4>If you can - what's your preference?</h4>
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

  handleRsvpNo = (e) => {
    const thisEvent = this.props.allEvents.find(event => {
      return event.id === Number(this.props.match.params.eventId)
    })
    const eventGuests = thisEvent.guests
    const thisGuest = eventGuests.find(g => { return g.user.id === this.props.userId  })


    const updatedGuest = {
      id: thisGuest.id,
      rsvp: "no",
      voted: true
    }

    fetch(`http://localhost:4000/api/v1/guests/${thisGuest.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedGuest)
    })
    alert('Thanks!')
    this.props.history.push('/')
  }

  renderRsvpChangePage = (thisEvent) => {
    return <h3>You already sent an RSVP to say you can't make it. :( </h3>
  }

  renderSaidNo = (thisEvent) => {
    return <h3>You already sent an RSVP to say you can't make it. :( </h3>
    }

  render() {


    return (
      <div className="event-details-page">
        {this.renderEvent()}
      </div>
    );
  }
}

EventDetails.propTypes = {
  currentUser: PropTypes.object.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchIdeas: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  allEvents: PropTypes.array.isRequired,
  allIdeas: PropTypes.array.isRequired,
  userId: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  userId: state.users.userId,
  allIdeas: state.ideas.allIdeas,
  allEvents: state.events.allEvents
})

export default connect(mapStateToProps, { fetchCurrentUser, fetchIdeas, fetchEvents })(EventDetails);
