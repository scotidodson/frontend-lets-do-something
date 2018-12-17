import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import IdeaCard from './IdeaCard/IdeaCard.js'

import { connect } from 'react-redux';
import { fetchIdeas } from '../../../Actions/IdeaActions.js'


class IdeaContainer extends Component {

  componentWillMount() {
    this.props.fetchIdeas()
  }

  renderIdeaCards = () => {
    return this.props.ideas.map(idea => {
      return(<IdeaCard key={idea.id} idea={idea} />)
    })}

  render() {
    return (
      <div>
        <h3>All Ideas</h3>
        {this.renderIdeaCards()}
        <p><Link to="/new-idea">Add New Idea</Link></p>
        <p><Link to="/saved-ideas">View Saved Ideas</Link></p>
      </div>

    );
  }
}

IdeaContainer.propTypes = {
  fetchIdeas: PropTypes.func.isRequired,
  ideas: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  ideas: state.ideas.items
})

export default connect(mapStateToProps, { fetchIdeas })(IdeaContainer);
