import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import '../IdeaContainer.css'
import { connect } from 'react-redux';
import { saveIdea, removeIdea } from '../../../Actions/IdeaActions.js'
import { updateUser } from '../../../Actions/UserActions.js'

// import { createBrowserHistory } from 'history';
// import IdeaDetails from '../IdeaDetails/IdeaDetails.js'



class IdeaCard extends Component {

  handleSaveIdea = () => {
    console.log('saving this one');
    const ideaId = this.props.idea.id
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
  }

  alreadySaved = () => {
    const savedIdeaIds = this.props.savedIdeas.map(ideaObj => ideaObj.idea.id)
    const ideaId = this.props.idea.id
    if (savedIdeaIds.includes(ideaId)) {
      return true
    } else  {
      return false
    }
  }

  handleRemoveIdea = () => {
    console.log('removing this one');
    const ideaId = this.props.idea.id
    const record = this.props.savedIdeas.find(record =>(record.idea.id === ideaId))
    let updatedUserObj = {...this.props.currentUser}

    this.props.removeIdea(record.id)

    const ideasToKeep = updatedUserObj.user_ideas.filter(idea=>{
      return idea.id !== record.id
    })

    updatedUserObj.user_ideas = [ ...ideasToKeep ]
    this.props.updateUser(updatedUserObj)
  }

  render() {

    return (
        <div className="idea-card" data-id={this.props.idea.id} >
          <button onClick={this.alreadySaved() ? this.handleRemoveIdea:this.handleSaveIdea}>{this.alreadySaved() ? "x":"+"}</button>
          <Link to={`/ideas/${this.props.idea.id}`}>
          <br/>
          <br/>
          <h4>{this.props.idea.title}</h4>
          </Link>
        </div>

    );
  }
}

IdeaCard.propTypes = {
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

export default connect(mapStateToProps, { updateUser, saveIdea, removeIdea })(IdeaCard);
