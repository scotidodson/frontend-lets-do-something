import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom'
import OptionsHolder from '../OptionsHolder.js'
import { connect } from 'react-redux';
import { createEvent } from '../../../Actions/EventActions.js'


class EventForm extends Component {

  state = {
    dateStage: true,
    ideaStage: false,
    guestStage: false,
    event_id: 0,
    date: "",
    past: false,
    time: "",
    rating: '',
    winner: '',
    options: [],
    guests: [{
        user_id: 1,
        host: true
      }]
  }

  handleChange = (e) => {
    console.log(e.target.value);
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
    setTimeout(()=> {console.log(this.state);}, 300)
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
          ...this.state.guests,
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

    console.log('ideas', ideas);
    console.log('suggestions', suggestions);
    return ideas.map(idea =>{
      return(
          <p>
            <input key={idea.id} type="checkbox" name="idea" data-id={idea.id} onChange={this.handleCheckbox} />
            {idea.title}
          </p>)
    })
  }

  renderFriends = () => {
    const userFriendships = this.props.currentUser.friendships
      return userFriendships.map(friendship =>{
        return(
          <p>
            <input type="checkbox" name="guests" data-id={friendship.friend.id} onChange={this.handleCheckbox} />
            {friendship.friend.first_name} {friendship.friend.last_name}
          </p>
      )
    })
  }

  handleDateSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      date: this.state.date,
      past: this.state.past,
      time: this.state.time,
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
        event_id: this.state.event_id
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

    newGuests.forEach(guestObj=> {
      const newGuest = {
        user_id: guestObj.user_id,
        host: guestObj.host,
        event_id: this.state.event_id
      }
      console.log(newGuest);
      this.createNotification(newGuest)
      this.submitGuests(newGuest)
    })

    this.setState({
      ideaStage: false,
      guestStage: true
    })
    this.props.history.push('/events');
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

  render() {
    return (
      <div>
        <form onSubmit={this.handleDateSubmit} style={this.state.dateStage ? {} : { display: 'none' }}>
          <br/>
            <h4>Let's do something on:
            <input type="date" name="date" onChange={this.handleChange}
               value={this.state.date}
               min="2018-01-01" max="2020-12-31" />
            at
            <input name="time" onChange={this.handleChange} /> </h4>
            <input type="submit" value="Submit" />
        </form>

        <div style={this.state.ideaStage ? {} : { display: 'none' }}>
            <h4>ideas</h4>
            <OptionsHolder selectedOptions={this.state.options} />
          <form onSubmit={this.handleOptionSubmit} >
              {this.state.options.length < 3 ? this.renderIdeas():<p>Great - time to invite guests!</p>}
              <input type="submit" value="Submit" />
          </form>
        </div>

        <form onSubmit={this.handleGuestSubmit} style={this.state.guestStage ? {} : { display: 'none' }}>
          <h4>invite</h4>
          {this.renderFriends()}
          <input type="submit" value="Submit" />

        </form>
      </div>
    );
  }
}

EventForm.propTypes = {
  createEvent: PropTypes.func.isRequired,
  allIdeas: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  savedIdeas: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  allIdeas: state.ideas.allIdeas,
  currentUser: state.users.currentUser,
  savedIdeas: state.ideas.savedIdeas
})

export default connect(mapStateToProps, { createEvent })(EventForm);
