import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventCard from './EventCard.js'
import EventDetails from './EventDetails.js'
import { connect } from 'react-redux';
import { fetchEvents } from '../Actions/EventActions.js'
import '../Stylesheets/IdeaContainer.css'



class EventContainer extends Component {

  renderEvents = () => {
    const events = this.props.currentUser.events
    console.log(events);
    // return this.props.allEvents.map(event => {
    //   return(<EventCard key={event.id} event={event} />)
    // })
    if (events && events.length > 0) {
      return events.map(thisEvent => {
        // console.log(thisEvent);

        let month
        switch (thisEvent.month) {
            case 1:
              month = 'Jan.'
            break;
            case 2:
              month = 'Feb.'
            break;
            case 3:
              month = 'Mar.'
            break;
            case 4:
              month = 'Apr.'
            break;
            case 5:
              month = 'May'
            break;
            case 6:
              month = 'June'
            break;
            case 7:
              month = 'July'
            break;
            case 8:
              month = 'Aug.'
            break;
            case 9:
              month = 'Sept.'
            break;
            case 10:
              month = 'Oct.'
            break;
            case 11:
              month = 'Nov.'
            break;
            case 12:
              month = 'Dec.'
            break;
            default:
          }

        let thisIdea
        if (thisEvent.winner) {
          thisIdea = this.props.allIdeas.find(idea => {return idea.id === thisEvent.winner})

        }

        return (
          <div className="idea-card" key={thisEvent.id} data-id={thisEvent.id} onClick={this.handleClick}>
            {thisEvent.winner ? <h4 data-id={thisEvent.id}>{thisIdea.title}</h4>:<h4 data-id={thisEvent.id}>TBD</h4>}

            <h4 data-id={thisEvent.id}>{month} {thisEvent.day}</h4>
            <h4 data-id={thisEvent.id}>{thisEvent.hour}:{thisEvent.minute} {thisEvent.am ? "am":"pm"}</h4>
          </div>
        )
      })
    } else {
      return <h4>You don't have any events yet!</h4>
    }
  }

  handleClick = (e) => {
    this.props.history.push(`/events/${e.target.dataset.id}`)

  }

  render() {
    return (
      <div className="brainstorm-page">
      <div>
        <h3>Events</h3>
        <br/>
        <br/>
      </div>


          <div className="idea-container">
            {this.renderEvents()}
          </div>
      </div>

    );
  }
}

EventContainer.propTypes = {
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  allIdeas: state.ideas.allIdeas
})

export default connect(mapStateToProps)(EventContainer);

// <div className="brainstorm-buttons">
  // <Link to="/new-idea"><button>Add New Idea</button></Link>
  // <Link to="/saved-ideas"><button>Saved Ideas</button></Link>
// </div>
