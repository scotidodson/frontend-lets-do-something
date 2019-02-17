import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser, fetchCurrentUser } from '../Actions/UserActions.js'
import account from '../Images/account.png'
import logo from '../Images/lds_logo.png'
import menu from '../Images/menu.png'
import newNotification from '../Images/new_notification.png'
import notification from '../Images/notification.png'
// import '../Stylesheets/Navigation.scss';


class Navigation extends Component {

  checkNotifications = () => {
    let alerts = [...this.props.currentUser.notifications]
    if (this.props.currentUser.notifications && this.props.currentUser.notifications.length > 0) {
      let newAlerts = alerts.filter(alert => alert.seen === false )
      return newAlerts.length > 0 ? true:false
    } else {
      return false
    }
  }

  handleClick = () => {
    let updatedUserObj = {...this.props.currentUser}
    const updatedAlerts = updatedUserObj.notifications.map(alert => {
      return { ...alert, seen: true }
    })
    updatedUserObj.notifications = updatedAlerts
    this.props.updateUser(updatedUserObj)
  }

  updateUserData = () => {
    console.log('fetching users again');
    console.log(this.props.userId);
    this.props.fetchCurrentUser(this.props.userId)
  }

  render() {
    return (
      <header className="navigation-bar">
        <div className="container" >
          <nav className="menu" id="menu">
            <ul>
                <li><Link to="/menu"><img src={menu} alt="menu" height="80px" /></Link></li>

            </ul>
          </nav>

          <Link to="/"><img src={logo} alt="Let's Do Something" className="logo" /></Link>

          <nav className="account" id="account">
            <ul>
                <li><Link to="/notifications">
                  {this.checkNotifications() ? <img src={newNotification} onClick={this.handleClick} alt="notifications" height="80px" />:<img src={notification} alt="notifications" height="80px" />}
                </Link></li>

                <li><Link to="/account" ><img src={account} alt="account" height="80px" /></Link></li>
              </ul>
          </nav>
        </div>
      </header>

    );
  }
}

Navigation.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  userId: state.users.userId
})

export default connect(mapStateToProps, { updateUser, fetchCurrentUser })(Navigation);
