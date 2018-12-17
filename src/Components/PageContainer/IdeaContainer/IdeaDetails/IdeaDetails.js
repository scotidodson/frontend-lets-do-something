import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { saveIdea, fetchIdeas } from '../../../../Actions/IdeaActions.js'


class IdeaDetails extends Component {
  handleSaveIdea = () => {
    console.log('saving this one');
    const saveThisIdea = {
      idea_id: Number(this.props.match.params.ideaId),
      user_id: 1,
      archive: false,
      experience_count: 0
    }
    this.props.saveIdea(saveThisIdea)
    // window.location.href = "http://localhost:3000/brainstorm"
  }

  render() {
    const idea = this.props.ideas.find(idea => {
      return idea.id === Number(this.props.match.params.ideaId)
    })

    return (
      <div>
        <h4>-- {idea.title} --</h4>
        <p>Details here</p>
        <Link to="/brainstorm">
          <button>Back to all ideas</button>
        </Link>
        <button onClick={this.handleSaveIdea}>Save Idea</button>

      </div>
    );
  }
}

IdeaDetails.propTypes = {
  fetchIdeas: PropTypes.func.isRequired,
  saveIdea: PropTypes.func.isRequired,
  ideas: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  ideas: state.ideas.items
})

export default connect(mapStateToProps, { fetchIdeas, saveIdea })(IdeaDetails);
