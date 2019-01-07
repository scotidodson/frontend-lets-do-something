import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { saveIdea, fetchIdeas, removeIdea, fetchUserIdeas } from '../Actions/IdeaActions.js'
import { updateUser } from '../Actions/UserActions.js'
import '../Stylesheets/IdeaDetails.css'


class IdeaDetails extends Component {
  //
  // componentWillMount() {
  //   this.props.fetchUserIdeas()
  // }

  handleSaveIdea = () => {
    console.log('saving this one');
    const ideaId = Number(this.props.match.params.ideaId)
    const ideaSaved = this.props.allIdeas.find(record =>(record.id === ideaId))
    const saveThisIdea = {
      idea_id: ideaId,
      user_id: this.props.userId,
      archive: false,
      experience_count: 0
    }
    let updatedUserObj = {...this.props.currentUser}

    fetch('http://localhost:4000/api/v1/user_ideas', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(saveThisIdea)
    })
      .then(resp =>resp.json())
      .then(newUserIdea => {

        updatedUserObj.user_ideas = [
          ...updatedUserObj.user_ideas,
          {
            id: newUserIdea.id,
            idea: ideaSaved
          }]
        this.props.updateUser(updatedUserObj)
      })

    this.props.history.push('/saved-ideas');
    // window.location.href = "http://localhost:3000/brainstorm"
  }

  handleRemoveIdea = () => {
    console.log('removing this one');
    const ideaId = Number(this.props.match.params.ideaId)
    const record = this.props.savedIdeas.find(record =>(record.idea.id === ideaId))
    let updatedUserObj = {...this.props.currentUser}

    console.log(record.id);
    this.props.removeIdea(record.id)

    const ideasToKeep = updatedUserObj.user_ideas.filter(idea=>{
      return idea.id !== record.id
    })

    updatedUserObj.user_ideas = [ ...ideasToKeep ]
    this.props.updateUser(updatedUserObj)
    this.props.history.push('/saved-ideas');
  }

  checkPrice = (idea) => {
    let price = ''
    switch (idea.price_range) {
      case 0:
        price = "free"
      break;
      case 1:
        price = "$"
      break;
      case 2:
        price = "$$"
      break;
      case 3:
        price = "$$$"
      break;
      default:
        price = "?"
    }
    return price
  }

  alreadySaved = () => {
    const savedIdeaIds = this.props.savedIdeas.map(ideaObj => ideaObj.idea.id)
    const ideaId = Number(this.props.match.params.ideaId)
    if (savedIdeaIds.includes(ideaId)) {
      return true
    } else  {
      return false
    }
  }

  handleBack = () => {
    this.props.history.goBack()
  }


  render() {
    const idea = this.props.allIdeas.find(idea => {
      return idea.id === Number(this.props.match.params.ideaId)
    })


    return (
      <div className="idea-details-page">
        <div className="idea-container">
          <div>
            <h3> {idea.title} </h3>
          </div>
          <div>
            <p>Location: {idea.street} {idea.city} {idea.state} {idea.zip}</p>
            <p>Neighborhood: {idea.neighborhood}</p>
            <p>Category: {idea.category}</p>
            <p>Price Range: {this.checkPrice(idea)}</p>
            <p>Good For:
              {idea.winter ? " Winter" : null}
              {idea.spring ? " Spring" : null}
              {idea.summer ? " Summer" : null}
              {idea.fall ? " Fall" : null}</p>
            <p>Duration: {idea.duration}</p>
            <p>Category: {idea.category}</p>
            { idea.expiration ? <p>Have to go by: {idea.expiration.date}</p> : null }
            { idea.website.length > 0  ? <p>Website: {idea.website}</p> : null }
            <p>Details: {idea.details}</p>

            <br/><br/>
            <div className="teal-button">
              <button className="teal-button" onClick={this.handleBack}>Back</button>
              <button className="teal-button" onClick={this.alreadySaved() ? this.handleRemoveIdea:this.handleSaveIdea}>{this.alreadySaved() ? "Remove Idea":"Save Idea"}</button>
            </div>
        </div>
        </div>
      </div>
    );
  }
}

IdeaDetails.propTypes = {
  fetchIdeas: PropTypes.func.isRequired,
  saveIdea: PropTypes.func.isRequired,
  allIdeas: PropTypes.array.isRequired,
  savedIdeas: PropTypes.array.isRequired,
  removeIdea: PropTypes.func.isRequired,
  fetchUserIdeas: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  allIdeas: state.ideas.allIdeas,
  userIdeas: state.ideas.userIdeas,
  currentUser: state.users.currentUser,
  savedIdeas: state.ideas.savedIdeas,
  userId: state.users.userId
})

export default connect(mapStateToProps, { updateUser, fetchIdeas, saveIdea, removeIdea, fetchUserIdeas })(IdeaDetails);
