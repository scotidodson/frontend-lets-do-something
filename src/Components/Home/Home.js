import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-brainstorm">
          <Link to="/brainstorm">Brainstorm</Link>
        </div>
        <div className="home-brainstorm">
          <Link to="/host">Host</Link>
        </div>
      </div>
    );
  }
}

export default Home;
