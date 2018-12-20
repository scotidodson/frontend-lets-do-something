import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import Menu from './Menu/Menu.js'
// import NotificationContainer from './NotificationContainer/NotificationContainer.js'
// import Account from '../Account/Account.js'



class Navigation extends Component {
  render() {
    return (
      <div>
        <h1>Let's Do Something </h1>
        <ul>

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/notifications">Notifications</Link>
          </li>

          <li>
            <Link to="/events">My Events</Link>
          </li>

          <li>
            <Link to="/contacts">Contacts</Link>
          </li>


        </ul>
      </div>
    );
  }
}

export default Navigation;
