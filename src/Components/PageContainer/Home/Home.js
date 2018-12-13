import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home View</h1>
        <ul>
          <li>
            <Link to="/brainstorm">Brainstorm</Link>
          </li>
          <li>
            <Link to="/host">Host</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;
