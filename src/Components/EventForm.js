import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OptionsHolder from './OptionsHolder.js'
import { connect } from 'react-redux';
import { createEvent, fetchEvents } from '../Actions/EventActions.js'


class EventForm extends Component {

  state = {
    dateStage: true,
    ideaStage: false,
    guestStage: false,
    event_id: 0,
    year: 2019,
    month: 1,
    day: 3,
    hour: 7,
    minute: 30,
    am: false,
    past: false,
    rating: '',
    winner: '',
    options: [],
    guests: [
      { user_id: this.props.userId,
        host: true,
        rsvp: "yes"
      }
    ]
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCheckbox = (e) => {
    const targetId = Number(e.target.dataset.id)
    switch (e.target.name) {
      case "idea":
        this.ideaChecked(e, targetId)
        break;
      case "guests":
          this.guestChecked(e, targetId)
        break;
      default:
        return
    }
  }

  ideaChecked = (e, targetId) => {
    if (e.target.checked === true) {
      const ideaToAdd = this.props.allIdeas.find(idea => idea.id === targetId )
      this.setState((currentState) => {
      return {
        options: [
          ...currentState.options,
          { ...ideaToAdd }
        ]
      }})
    } else {
      this.setState((currentState) => {
        console.log('currentState', currentState);
        const reducedIdeaSets = currentState.options.filter(idea => {
          return idea.idea_id !== targetId
        })
        console.log('reducedIdeaSets', reducedIdeaSets);
        return {
          options: [...reducedIdeaSets]
        }
      })
    }
  }

  guestChecked = (e, targetId) => {
    if (e.target.checked === true) {
      this.setState((currentState) => {
      return {
        guests: [
          ...currentState.guests,
          {user_id: targetId, host: false}
        ]
      }
    })} else {
      this.setState((currentState) => {
        console.log('currentState', currentState);
        const reducedGuestSets = currentState.guests.filter(guest => {
          return guest.user_id !== targetId
        })
        console.log('reducedGuestSets', reducedGuestSets);
        return {
          guests: [...reducedGuestSets]
        }
      })
    }
  }

  renderIdeas = () => {
    const ideas = this.props.savedIdeas.map(ideaObj=> ideaObj.idea )
    const mySaved = ideas.map(idea => { return idea.id })
    const suggestions = this.props.allIdeas.filter(idea=> {  return !mySaved.includes(idea.id) })
    return ideas.map(idea =>{
      return(
          <p key={idea.id}>
            <input type="checkbox" name="idea" data-id={idea.id} onChange={this.handleCheckbox} />
            {idea.title}
          </p>)
    })
  }

  renderFriends = () => {
    const userFriendships = this.props.currentUser.friendships
      return userFriendships.map(friendship =>{
        return(
          <p key={friendship.id}>
          <input  type="checkbox" name="guests" data-id={friendship.friend.id} onChange={this.handleCheckbox} />
          {friendship.friend.first_name} {friendship.friend.last_name}
          </p>
        )
      })
  }

  handleDateSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      year: this.state.year,
      month: this.state.month,
      day: this.state.day,
      hour: this.state.hour,
      minute: this.state.minute,
      am: this.state.am,
      past: this.state.past,
      rating: this.state.rating,
      winner: this.state.winner
    }

    this.props.createEvent(newEvent)

    fetch(`http://localhost:4000/api/v1/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    }).then(resp => resp.json())
    .then(newEvent => {
      this.setState({
        event_id: newEvent.id,
        dateStage: false,
        ideaStage: true
      })
      })
  }

  handleOptionSubmit = (e) => {
    e.preventDefault();

    const newOptions = [...this.state.options]

    newOptions.forEach(optObj=> {
      const newOption = {
        idea_id: optObj.id,
        event_id: this.state.event_id,
        votes: 0
      }
      this.submitOptions(newOption)
    })

    this.setState({
      ideaStage: false,
      guestStage: true
    })
  }

  handleGuestSubmit = (e) => {
    e.preventDefault();
    const newGuests = [...this.state.guests]
    const thisEventId = this.state.event_id
    this.prepareGuestObjs(newGuests, thisEventId)
  }

  prepareGuestObjs = (newGuests, thisEventId) => {
    newGuests.forEach(guestObj=> {
      const newGuest = {
        user_id: guestObj.user_id,
        host: guestObj.host,
        rsvp: guestObj.rsvp,
        event_id: thisEventId
      }
      this.createNotification(newGuest)
      this.submitGuests(newGuest)
    })
    this.props.history.push('/');
  }

  createNotification = (newGuest) => {
    if (newGuest.host) {
      const newNotification = {
        user_id: newGuest.user_id,
        event_id: this.state.event_id,
        seen: false,
        message: "You created an event. Poll in process."
      }
      this.submitNotification(newNotification)
    } else {
      const newNotification = {
        user_id: newGuest.user_id,
        event_id: this.state.event_id,
        seen: false,
        message: "You have been invited to an event - cast your vote on what to do!"
      }
      this.submitNotification(newNotification)
    }
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

  submitGuests = (newGuest) => {
    fetch(`http://localhost:4000/api/v1/guests`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newGuest)
    })
    this.props.fetchEvents()
  }

  submitOptions = (newOptions) => {
    fetch(`http://localhost:4000/api/v1/options`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newOptions)
    })
  }

  startPoll = () => {
    const eventId = this.state.event_id
  }

  renderDayDropdown = () => {
    const arr = [...Array(32).keys()].slice(3,32)
    return arr.map(x => {
      return <option key={x} value={x}>{x}</option>
    })
  }

  render() {
    return (
      <div className="event-form-page">
          <div className="event-form" style={this.state.dateStage ? {} : { display: 'none' }}>
            <form onSubmit={this.handleDateSubmit} >
              <h1>WHEN</h1>
              <br/>
                <h4>{"Let's do something on:  "}
                  <select type="month" name="month" onChange={this.handleChange} value={this.state.month}>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>

                  <select type="day" name="day" onChange={this.handleChange} value={this.state.day}>
                    {this.renderDayDropdown()}
                  </select>
                  {' at '}
                <select type="hour" name="hour" onChange={this.handleChange} value={this.state.hour}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>

                <select type="minute" name="minute" onChange={this.handleChange} value={this.state.minute}>
                  <option value="0">00</option>
                  <option value="30">30</option>
                </select>

                <select type="am" name="am" onChange={this.handleChange} value={this.state.am}>
                  <option value="true">am</option>
                  <option value="false">pm</option>
                </select></h4><br/><br/>

                <input className="event-teal-button" type="submit" value="Submit" />
            </form>
          </div>

          <div className="event-form" style={this.state.ideaStage ? {} : { display: 'none' }}>
              <h1>WHAT</h1>
                <div className="options-holder">
                <OptionsHolder selectedOptions={this.state.options} />
                </div>
              <div>
            <form onSubmit={this.handleOptionSubmit} >
                {this.state.options.length < 3 ? this.renderIdeas():<p>Great - time to invite guests!</p>}
                <input type="submit" value="Submit" />
            </form>
          </div>
          </div>
          <div className="event-form" style={this.state.guestStage ? {} : { display: 'none' }}>
          <form onSubmit={this.handleGuestSubmit} >
            <h1>WHO</h1>
            {this.state.guestStage ? this.renderFriends():null}
            <input type="submit" value="Submit" />

          </form>
        </div>
      </div>
    );
  }
}

EventForm.propTypes = {
  createEvent: PropTypes.func.isRequired,
  allIdeas: PropTypes.array.isRequired,
  allEvents: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  savedIdeas: PropTypes.array.isRequired,
  fetchEvents: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  allIdeas: state.ideas.allIdeas,
  currentUser: state.users.currentUser,
  savedIdeas: state.ideas.savedIdeas,
  userId: state.users.userId,
  allEvents: state.events.allEvents

})

export default connect(mapStateToProps, { createEvent, fetchEvents })(EventForm);
