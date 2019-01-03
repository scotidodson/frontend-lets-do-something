import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import IdeaCard from '../IdeaCard/IdeaCard.js'

import { connect } from 'react-redux';


class IdeaBoard extends Component {

  renderSavedIdeaCards = () => {
    if (this.props.savedIdeas.length === 0) {
      return(
        <h4>You don't have anything saved yet!</h4>
      )
    } else {
      return this.props.savedIdeas.map(ideaObj => {
        return(<IdeaCard key={ideaObj.id} userEventId={ideaObj.id} idea={ideaObj.idea} />)
      })
    }
  }

  render() {
    return (
      <div className="brainstorm-page">
        <div>
          <h3>Your NYC Bucket List</h3>
          <br/>
          <br/>
        </div>

        <div className="brainstorm-buttons">
          <Link to="/new-idea"><button>Add New Idea</button></Link>
          <Link to="/brainstorm"><button>Brainstorm</button></Link>
        </div>
          <div className="idea-container">
            {this.renderSavedIdeaCards()}
          </div>
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
