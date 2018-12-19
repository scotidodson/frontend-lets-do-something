import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'

class Home extends Component {

  render() {
    return (
      <ul>
        <li>
          <Link to="/brainstorm">Brainstorm</Link>
        </li>
        <li>
          <Link to="/host">Host</Link>
        </li>
      </ul>
    );
  }
}

export default Home;
