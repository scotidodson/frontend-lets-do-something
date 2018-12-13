import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'



class Splash extends Component {
  render() {
    return (
      <div>
        <h1>Let's Do Something </h1>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Splash;
