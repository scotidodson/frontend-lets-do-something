import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'



class NotificationContainer extends Component {

  renderNotifications = () => {
      const notifications = (this.props.currentUser.notifications).sort(function (a, b) {
        return b.id - a.id;
      })
    // this.updateUserNotifications()
    if (notifications && notifications.length > 0) {
      return notifications.map(alert => {
        this.updateNotification(alert)
        return(
          <Link to={`/events/${alert.event_id}`}>
            <div key={alert.id}>
              <p>{alert.message}</p>
            </div>
          </Link>
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

  render() {
    return (
      <div>
        {this.renderNotifications()}
      </div>
    );
  }
}

NotificationContainer.propTypes = {
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
})

export default connect(mapStateToProps)(NotificationContainer);
