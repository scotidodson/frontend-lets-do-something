import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { saveIdea, fetchIdeas, removeIdea, fetchUserIdeas } from '../../Actions/IdeaActions.js'


class EventDetails extends Component {

  handleSaveIdea = () => {
    // console.log('saving this one');
    // const saveThisIdea = {
    //   idea_id: Number(this.props.match.params.ideaId),
    //   user_id: 1,
    //   archive: false,
    //   experience_count: 0
    // }
    // this.props.saveIdea(saveThisIdea)
    // // window.location.href = "http://localhost:3000/brainstorm"
  }

  handleRemoveIdea = () => {
    // console.log('removing this one');
    // const ideaId = Number(this.props.match.params.ideaId)
    // const record = this.props.userIdeas.find(record =>(record.user_id === 1 && record.idea_id === ideaId))
    // this.props.removeIdea(record.id)
    // // window.location.href = "http://localhost:3000/brainstorm"
  }

  // checkPrice = (event) => {
  //   let price = ''
  //   switch (event.price_range) {
  //     case 0:
  //       price = "free"
  //     break;
  //     case 1:
  //       price = "$"
  //     break;
  //     case 2:
  //       price = "$$"
  //     break;
  //     case 3:
  //       price = "$$$"
  //     default:
  //       price = "?"
  //   }
  //   return price
  //    default:
    //  return
  // }

  render() {
    const event = this.props.event
    // this.props.allEvents.find(event => {
      // return event.id === Number(this.props.match.params.ideaId)
    // })


    return (
      <div>
        <h4>-- {event.title} --</h4>
        <p>details</p>

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

EventDetails.propTypes = {
  // fetchIdeas: PropTypes.func.isRequired,
  // saveIdea: PropTypes.func.isRequired,
  // allIdeas: PropTypes.array.isRequired,
  // removeIdea: PropTypes.func.isRequired,
  // fetchUserIdeas: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  // allIdeas: state.ideas.allIdeas,
  // userIdeas: state.ideas.userIdeas
})

export default connect(mapStateToProps, { fetchIdeas, saveIdea, removeIdea, fetchUserIdeas })(EventDetails);



// <p>Location: {event.street} {event.city} {event.state} {event.zip}</p>
// <p>Neighborhood: {event.neighborhood}</p>
// <p>Category: {event.category}</p>
// <p>Price Range: {this.checkPrice(event)}</p>
// <p>Good For:
//   {event.winter ? " Winter" : null}
//   {event.spring ? " Spring" : null}
//   {event.summer ? " Summer" : null}
//   {event.fall ? " Fall" : null}</p>
// <p>Duration: {event.duration}</p>
// <p>Category: {event.category}</p>
// { event.expiration ? <p>Have to go by: {event.expiration.date}</p> : null }
// { event.website.length > 0  ? <p>Website: {event.website}</p> : null }
// <p>Details: {event.details}</p>
//
// <br/><br/>
