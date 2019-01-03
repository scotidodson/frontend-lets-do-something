import React, { Component } from 'react';
import { Link } from 'react-router-dom'



class Menu extends Component {
  render() {
    return (
      <div>
        <li><Link to="/events">EVENTS</Link></li>
        <li><Link to="/contacts">CONTACTS</Link></li>
        <li><Link to="/saved-ideas">SAVED IDEAS</Link></li>
      </div>
    );
  }
}

export default Menu;
