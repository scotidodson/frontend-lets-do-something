import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
// import IdeaCard from './IdeaCard/IdeaCard.js'
import { connect } from 'react-redux';
import { createEvent } from '../../../Actions/EventActions.js'


class EventForm extends Component {

  state = {
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
        if (e.target.checked === true) {
          this.setState((currentState) => {
          return {
            options: [
              ...this.state.options,
              {idea_id: targetId}
            ]
          }
        })} else {
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
        break;
      case "guests":
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
        break;

    }
    setTimeout(()=> {console.log(this.state);}, 300)
  }

  renderIdeas = () => {
    const ideas = [{
        id: 1,
        title: "Times Square",
        street: "1555 Broadway",
        city: "New York",
        state: "NY",
        zip: "10036",
        neighborhood: "Midtown",
        category: "Sightseeing / Tour",
        details: "Bustling destination in the heart of the Theater District known for bright lights, shopping & shows.",
        winter: true,
        spring: true,
        summer: true,
        fall: true,
        price_range: 0,
        duration: "quick",
        website: "timessquarenyc.org",
        expiration: false,
        expiration_date: null,
        private: null,
        submitted_by: null
        }, {
        id: 2,
        title: "Comedy Cellar",
        street: "1267, 117 Macdougal St",
        city: "New York",
        state: "NY",
        zip: "10012",
        neighborhood: "Greenwich Village",
        category: "Comedy",
        details: "Famous comics are often in the lineup at this brick-walled comedy club with several shows nightly.",
        winter: true,
        spring: true,
        summer: true,
        fall: true,
        price_range: 2,
        duration: "evening",
        website: "comedycellar.com",
        expiration: false,
        expiration_date: null,
        private: null,
        submitted_by: null
        }, {
        id: 3,
        title: "Statue of Liberty",
        street: "",
        city: "New York",
        state: "NY",
        zip: "10004",
        neighborhood: "Financial District",
        category: "Sightseeing / Tour",
        details: "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States. The copper statue, a gift from the people of France to the people of the United States, was designed by French sculptor Frédéric Auguste Bartholdi and built by Gustave Eiffel.",
        winter: false,
        spring: true,
        summer: true,
        fall: true,
        price_range: 0,
        duration: "a few hours",
        website: "",
        expiration: false,
        expiration_date: null,
        private: null,
        submitted_by: null
        }]
      return ideas.map(idea =>{
        return(
            <p>
              <input key={idea.id} type="checkbox" name="idea" data-id={idea.id} onChange={this.handleCheckbox} />
              {idea.title}
            </p>)
      })
  }

  renderFriends = () => {
    const friends = [
      {id: 2,
        first_name: "Max",
        last_name: "Petersen",
        username: "max",
        password: "password",
        phone: null,
        email: "email@gmail.com",
        birthday: "1997-01-01",
        gender: "male",
        default_city: "NYC",
        bio: "flatiron student",
        app_member: true,
        img_url: null
        },
        {
        id: 3,
        first_name: "Asaf",
        last_name: "Davidov",
        username: "asaf",
        password: "password",
        phone: null,
        email: "email@gmail.com",
        birthday: "1995-01-01",
        gender: "male",
        default_city: "NYC",
        bio: "flatiron student",
        app_member: true,
        img_url: null
        },
        {
        id: 4,
        first_name: "Jordan",
        last_name: "Farkas",
        username: "jordan",
        password: "password",
        phone: null,
        email: "email@gmail.com",
        birthday: "1991-01-01",
        gender: "male",
        default_city: "NYC",
        bio: "flatiron student",
        app_member: true,
        img_url: null
        }]
      return friends.map(friend =>{
        return(
          <p>
            <input type="checkbox" name="guests" data-id={friend.id} onChange={this.handleCheckbox} />
            {friend.first_name} {friend.last_name}
          </p>
      )
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      date: this.state.date,
      past: this.state.past,
      time: this.state.time,
      rating: this.state.rating,
      winner: this.state.winner
    }
    const newGuests = [...this.state.guests]
    const newOptions = [...this.state.options]
    this.props.createEvent(newEvent)

    fetch(`http://localhost:4000/api/v1/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    }).then(resp => resp.json())
    .then(newEvent => {
      const newRecord = newEvent.id

      newGuests.forEach(guestObj=> {
        const newGuest = {
          user_id: guestObj.user_id,
          host: guestObj.host,
          event_id: newRecord
        }
        this.submitGuests(newGuest)
      })
      newOptions.forEach(optObj=> {
        const newOption = {
          idea_id: optObj.idea_id,
          event_id: newRecord
        }
        this.submitOptions(newOption)
      })
    })
    // window.location.href = "http://localhost:3000/brainstorm"
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
      <form onSubmit={this.handleSubmit}>
        <br/>
        <h4>Let's do something on:
        <input type="date" name="date" onChange={this.handleChange}
           value={this.state.date}
           min="2018-01-01" max="2020-12-31" />
        at
        <input name="time" onChange={this.handleChange} /> </h4>
        <h4>ideas</h4>
        {this.renderIdeas()}
        <h4>invite</h4>
        {this.renderFriends()}


        <input type="submit" value="Submit" />
      </form>
    );
  }
}

EventForm.propTypes = {
  createEvent: PropTypes.func.isRequired
}
export default connect(null, { createEvent })(EventForm);
