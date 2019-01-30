import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import '../Stylesheets/IdeaContainer.css'
import { connect } from 'react-redux';
import { saveIdea, removeIdea } from '../Actions/IdeaActions.js'
import { updateUser } from '../Actions/UserActions.js'

class OptionCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      votingOptions: props.votingOptions,
      option: props.idea
    }
  }

  castVote = (e) => {
    const optId = this.props.option.id
    const option = this.props.option
    const thisEvent = this.props.thisEvent
    const eventGuests = thisEvent.guests
    const thisGuest = eventGuests.find(g => { return g.user.id === this.props.userId  })
    const updatedOption = {
      ...option,
      votes: ++option.votes
    }
    const updatedGuest = {
      id: thisGuest.id,
      rsvp: "yes",
      voted: true
    }
    fetch(`http://localhost:4000/api/v1/options/${optId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedOption)
    })
    fetch(`http://localhost:4000/api/v1/guests/${thisGuest.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedGuest)
    })
    this.props.redirect()
  }

  render() {

    return (
        <div className="idea-card" data-id={this.props.idea.id} >
          {this.state.votingOptions ? <button id={this.state.option.id} onClick={this.castVote}>✓</button>:null}
          <Link to={`/ideas/${this.props.idea.id}`}>
          <h4>{this.props.idea.title}</h4>
          </Link>
        </div>

    );
  }
}

OptionCard.propTypes = {
  saveIdea: PropTypes.func.isRequired,
  removeIdea: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  savedIdeas: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  allIdeas: state.ideas.allIdeas,
  currentUser: state.users.currentUser,
  savedIdeas: state.ideas.savedIdeas,
  userId: state.users.userId

})

export default connect(mapStateToProps, { updateUser, saveIdea, removeIdea })(OptionCard);
