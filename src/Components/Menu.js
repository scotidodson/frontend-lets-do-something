import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../Stylesheets/Menu.css'

class Menu extends Component {
  render() {
    return (
      <div className="menu-page">

        <div className="menu-div">
          <h3><Link to="/events">EVENTS</Link></h3>
        </div>
        <div className="menu-div">
          <h3><Link to="/contacts">CONTACTS</Link></h3>
        </div>
        <div className="menu-div">
          <h3><Link to="/saved-ideas">SAVED IDEAS</Link></h3>
        </div>
      </div>
    );
  }
}

export default Menu;
