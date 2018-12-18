import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import IdeaCard from '../IdeaCard/IdeaCard.js'

import { connect } from 'react-redux';
import { fetchSavedIdeas } from '../../../Actions/IdeaActions.js'


class IdeaBoard extends Component {

  componentWillMount() {
    this.props.fetchSavedIdeas(1)
  }

  renderSavedIdeaCards = () => {
    if (this.props.savedIdeas.length === 0) {
      return(
        <h3>You don't have anything saved yet!</h3>
      )
    } else {
      return this.props.savedIdeas.map(idea => {
        return(<IdeaCard key={idea.id} idea={idea} />)
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
  fetchSavedIdeas: PropTypes.func.isRequired,
  savedIdeas: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  savedIdeas: state.ideas.savedIdeas
})

export default connect(mapStateToProps, { fetchSavedIdeas })(IdeaBoard);
