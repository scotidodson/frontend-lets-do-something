import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { saveIdea, fetchIdeas, removeIdea, fetchUserIdeas } from '../../../Actions/IdeaActions.js'


class IdeaDetails extends Component {

  componentWillMount() {
    this.props.fetchUserIdeas()
  }

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

  handleRemoveIdea = () => {
    console.log('removing this one');
    const ideaId = Number(this.props.match.params.ideaId)
    const record = this.props.userIdeas.find(record =>(record.user_id === 1 && record.idea_id === ideaId))
    this.props.removeIdea(record.id)
    // window.location.href = "http://localhost:3000/brainstorm"
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

  // checkSeasons = (idea) => {
  //   let seasons = []
  //   switch (expression) {
  //     case expression:
  //
  //       break;
  //     default:
  //
  //   }
  //
  //   if (idea.winter) {
  //     seasons.push("Winter")
  //   }
  // }

  render() {
    const idea = this.props.allIdeas.find(idea => {
      return idea.id === Number(this.props.match.params.ideaId)
    })


    return (
      <div>
        <h4>-- {idea.title} --</h4>
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
        <Link to="/brainstorm">
          <button>Back to all ideas</button>
        </Link>
        <Link to="/saved-ideas">
          <button>Back to my saved ideas</button>
        </Link>
        <button onClick={this.handleSaveIdea}>Save Idea</button>
        <button onClick={this.handleRemoveIdea}>Remove Idea</button>

      </div>
    );
  }
}

IdeaDetails.propTypes = {
  fetchIdeas: PropTypes.func.isRequired,
  saveIdea: PropTypes.func.isRequired,
  allIdeas: PropTypes.array.isRequired,
  removeIdea: PropTypes.func.isRequired,
  fetchUserIdeas: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  allIdeas: state.ideas.allIdeas,
  userIdeas: state.ideas.userIdeas
})

export default connect(mapStateToProps, { fetchIdeas, saveIdea, removeIdea, fetchUserIdeas })(IdeaDetails);
