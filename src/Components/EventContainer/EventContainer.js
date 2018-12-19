import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
// import IdeaCard from './IdeaCard/IdeaCard.js'
import { connect } from 'react-redux';
import { fetchIdeas } from '../../Actions/IdeaActions.js'


class EventContainer extends Component {

  componentWillMount() {
    // this.props.fetchIdeas()
  }

  // renderIdeaCards = () => {
  //   return this.props.allIdeas.map(idea => {
  //     return(<IdeaCard key={idea.id} idea={idea} />)
  //   })}

  render() {
    return (
      <div>
        <h3>User's Events Here</h3>
      </div>

    );
  }
}

EventContainer.propTypes = {
  // fetchIdeas: PropTypes.func.isRequired,
  // allIdeas: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  allIdeas: state.ideas.allIdeas
})

export default connect(mapStateToProps, { fetchIdeas })(EventContainer);
