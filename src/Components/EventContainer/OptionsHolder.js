import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import IdeaCard from '../IdeaContainer/IdeaCard/IdeaCard.js'
import { connect } from 'react-redux';
import { fetchIdeas } from '../../Actions/IdeaActions.js'
// import './OptionsHolder.css'


class OptionsHolder extends Component {

  renderOptions = () => {
    const options = [...this.props.selectedOptions]
    switch (options.length) {
      case 0:
        return (
          <div>
              <p> _____________________</p>
              <p> _____________________</p>
              <p> _____________________</p>
          </div>
        )
        break;
      case 1:
        return (
          <div>
            <div>
              <p>{options[0].title}</p>
            </div>
            <div >
              <p> _____________________</p>
            </div>
            <div>
              <p> _____________________</p>
            </div>
          </div>
        )
        break;
      case 2:
        return (
          <div>
            <div>
              <p>{options[0].title}</p>
            </div>
            <div>
              <p>{options[1].title}</p>
            </div>
            <div>
              <p> _____________________</p>
            </div>
          </div>
        )
        break;
      case 3:
        return (
          <div>
            <div>
              <p>{options[0].title}</p>
            </div>
            <div>
              <p>{options[1].title}</p>
            </div>
            <div>
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
