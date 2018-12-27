import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Splash.css'
import arrow from '../../Images/arrow.png'


class Splash extends Component {
  render() {
    return (
      <div className="splash">
        <div className="splash-logo">
          <h1>Let's Do Something </h1>
        </div>
        <div className="arrow">
            <Link to="/login">
              <img src={arrow} alt="arrow to login" className="arrow" />
            </Link>
        </div>
      </div>
    );
  }
}

export default Splash;
