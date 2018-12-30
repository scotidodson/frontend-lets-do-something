import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'



class NotificationContainer extends Component {

  renderNotifications = () => {
    const notifications = this.props.currentUser.notifications
    // this.updateUserNotifications()
    return notifications.map(alert => {
      this.updateNotification(alert)
      return(
        <div key={alert.id}>
          <p>{alert.message}</p>
        </div>
      )
    })
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
