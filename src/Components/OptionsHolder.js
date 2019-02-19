import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchIdeas } from '../Actions/IdeaActions.js'
import IdeaCard from './IdeaCard.js'


class OptionsHolder extends Component {

  renderOptions = () => {
    const options = [...this.props.selectedOptions]
    switch (options.length) {
      case 0:
        return (
          <div className="options-holder">
            <div className="option-box">
            </div>
            <div className="option-box">
            </div>
            <div className="option-box">
            </div>
          </div>
        )
        break;
      case 1:
        return (
          <div className="options-holder">
            <div className="option-box full">
              <p>{options[0].title}</p>
            </div>
            <div className="option-box">
            </div>
            <div className="option-box">
            </div>
          </div>
        )
        break;
      case 2:
        return (
          <div className="options-holder">
            <div className="option-box full">
              <p>{options[0].title}</p>
            </div>
            <div className="option-box full">
              <p>{options[1].title}</p>
            </div>
            <div className="option-box">
            </div>
          </div>
        )
        break;
      case 3:
        return (
          <div className="options-holder">
            <div className="option-box full">
              <p>{options[0].title}</p>
            </div>
            <div className="option-box full">
              <p>{options[1].title}</p>
            </div>
            <div className="option-box full">
              <p>{options[2].title}</p>
            </div>
          </div>
        )
        break;
      default:

    }
  }


  render() {
    return (
      <div>
        {this.renderOptions()}
      </div>

    );
  }
}

OptionsHolder.propTypes = {
  allIdeas: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  savedIdeas: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  allIdeas: state.ideas.allIdeas,
  currentUser: state.users.currentUser,
  savedIdeas: state.ideas.savedIdeas
})

export default connect(mapStateToProps, { fetchIdeas })(OptionsHolder);
