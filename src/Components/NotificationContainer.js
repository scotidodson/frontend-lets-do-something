import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCurrentUser } from '../Actions/UserActions.js'
import { fetchEvents } from '../Actions/EventActions.js'
import { fetchIdeas } from '../Actions/IdeaActions.js'
// import '../Stylesheets/NotificationContainer.css'

class NotificationContainer extends Component {
  renderNotifications = () => {
    const alerts = [...this.props.currentUser.notifications]
      const notifications = alerts.sort(function (a, b) {
        return b.id - a.id;
      })
    if (notifications && notifications.length > 0) {
      return notifications.map(alert => {
        this.updateNotification(alert);
        return(
            <div className="notification-box" key={alert.id}>
              <Link to={`/events/${alert.event_id}`} >
              <p>{alert.message}</p>
              </Link>
            </div>
        )
      })
    } else {
      alert('No notifications')
      this.props.history.goBack()
    }
  }

  updateNotification = (alert) => {
    fetch(`http://localhost:4000/api/v1/notifications/${alert.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ ...alert, seen: true })
    })
  }

  handleBack = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="notification-page">
        <div className="back">
          <h3 onClick={this.handleBack}>&times;</h3>
        </div>
        {this.renderNotifications()}
      </div>
    );
  }
}

NotificationContainer.propTypes = {
  currentUser: PropTypes.object.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchIdeas: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser

})

export default connect(mapStateToProps, { fetchIdeas, fetchCurrentUser, fetchEvents })(NotificationContainer);
