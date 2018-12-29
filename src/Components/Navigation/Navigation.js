import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../../Actions/UserActions.js'
import logo from '../../Images/lds_logo.png'
import notification from '../../Images/notification.png'
import newNotification from '../../Images/new_notification.png'
import account from '../../Images/account.png'
import menu from '../../Images/menu.png'
import './Navigation.scss';




class Navigation extends Component {
  checkNotifictions = () => {
    if (this.props.currentUser.notifications && this.props.currentUser.notifications.length > 0) {
      let newAlerts = this.props.currentUser.notifications.filter(alert => alert.seen === false )
      return newAlerts.length > 0 ? true:false
    } else {
      return false
    }
  }

  handleClick = () => {
    const updatedUserObj = this.props.currentUser
    const updatedAlerts = this.props.currentUser.notifications.map(alert => {
      return { ...alert, seen: true }
    })
    updatedUserObj.notifications = updatedAlerts
    this.props.updateUser(updatedUserObj)
  }

  render() {
    return (
      <header>
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
                  {this.checkNotifictions() ? <img src={newNotification} onClick={this.handleClick} alt="notifications" height="80px" />:<img src={notification} alt="notifications" height="80px" />}
                </Link></li>
                <li><Link to="/account"><img src={account} alt="account" height="80px" /></Link></li>
              </ul>
          </nav>
        </div>
      </header>

    );
  }
}

Navigation.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
})

export default connect(mapStateToProps, { updateUser })(Navigation);
