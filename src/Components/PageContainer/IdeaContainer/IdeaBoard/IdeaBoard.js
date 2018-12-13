import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import IdeaCard from '../IdeaCard/IdeaCard.js'



class IdeaBoard extends Component {
  render() {
    return (
      <div>
        User's saved ideas here
      </div>
    );
  }
}

export default IdeaBoard;
