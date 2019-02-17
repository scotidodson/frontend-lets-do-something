import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div className="home">
          <Link to="/brainstorm">
            <div className="launch brainstorm">
              <h3>Brainstorm</h3>
            </div>
          </Link>
          <Link to="/host">
            <div className="launch host">
              <h3>Host</h3>
            </div>
          </Link>
      </div>
    );
  }
}

export default Home;
