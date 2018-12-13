import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import IdeaCard from './IdeaCard/IdeaCard.js'

import { connect } from 'react-redux';
import { fetchIdeas } from '../../../Actions/IdeaActions.js'


class IdeaContainer extends Component {

  componentWillMount() {
    this.props.fetchIdeas()
  }

  render() {
    const renderIdeaCards = this.props.ideas.map(idea => (
      <div key={idea.id}>
        <h4>-- {idea.title} --</h4>
      </div>
    ))

    return (
      <div>
        <h3>All Ideas</h3>
        {renderIdeaCards}
        <IdeaCard />
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
