import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import IdeaCard from './IdeaCard/IdeaCard.js'
import { connect } from 'react-redux';
import { fetchIdeas } from '../../Actions/IdeaActions.js'
import './IdeaContainer.css'


class IdeaContainer extends Component {

  componentWillMount() {
    this.props.fetchIdeas()
  }

  renderIdeaCards = () => {
    return this.props.allIdeas.map(idea => {
      return(<IdeaCard key={idea.id} idea={idea} />)
    })}

  render() {
    return (
      <div className="brainstorm-page">
        <div className="brainstorm-buttons">
        <Link to="/new-idea"><button>Add New Idea</button></Link>
        <Link to="/saved-ideas"><button>View Saved Ideas</button></Link>
        </div>

        <h3>All Ideas</h3>
        <div className="idea-container">
          {this.renderIdeaCards()}
        </div>
      </div>

    );
  }
}

IdeaContainer.propTypes = {
  fetchIdeas: PropTypes.func.isRequired,
  allIdeas: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  allIdeas: state.ideas.allIdeas
})

export default connect(mapStateToProps, { fetchIdeas })(IdeaContainer);
