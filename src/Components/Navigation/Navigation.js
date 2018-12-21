import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../Images/lds_logo.png'
import notification from '../../Images/notification.png'
import account from '../../Images/account.png'
import menu from '../../Images/menu.png'

import './Navigation.scss';




class Navigation extends Component {
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
                <li><Link to="/notifications"><img src={notification} alt="notifications" height="80px" /></Link></li>
                <li><Link to="/account"><img src={account} alt="account" height="80px" /></Link></li>
              </ul>
          </nav>
        </div>
      </header>

    );
  }
}

export default Navigation;
