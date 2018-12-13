import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import Menu from './Menu/Menu.js'
import NotificationContainer from './NotificationContainer/NotificationContainer.js'
// import Account from '../Account/Account.js'



class Navigation extends Component {
  render() {
    return (
      <div>
        <h1>Let's Do Something </h1>
        <ul>
          <li>
            Navigation Here
          </li>
        </ul>
      </div>
    );
  }
}

export default Navigation;
