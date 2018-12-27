import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import IdeaCard from '../IdeaCard/IdeaCard.js'

import { connect } from 'react-redux';


class IdeaBoard extends Component {

  renderSavedIdeaCards = () => {
    if (this.props.savedIdeas.length === 0) {
      return(
        <h3>You don't have anything saved yet!</h3>
      )
    } else {
      return this.props.savedIdeas.map(ideaObj => {
        return(<IdeaCard key={ideaObj.id} userEventId={ideaObj.id} idea={ideaObj.idea} />)
      })
    }
  }

  render() {
    return (
      <div>
        <h3>Saved Ideas</h3>
        {this.renderSavedIdeaCards()}
        <p><Link to="/new-idea">Add New Idea</Link></p>
        <p><Link to="/brainstorm">Back to Brainstorming</Link></p>
      </div>

    );
  }
}

IdeaBoard.propTypes = {
  savedIdeas: PropTypes.array.isRequired
}

function mapStateToProps(state){
  return {
    savedIdeas: state.ideas.savedIdeas
  }
}

export default connect(mapStateToProps)(IdeaBoard);
