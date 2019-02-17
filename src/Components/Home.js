import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="home">
          <Link to="/brainstorm">
            <div className="home-brainstorm">
              <h3>Brainstorm</h3>
            </div>
          </Link>
          <Link to="/host">
            <div className="home-host">
              <h3>Host</h3>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
