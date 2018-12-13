import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import Navigation from './Navigation/Navigation.js'
import Home from './Home/Home.js'
import IdeaContainer from './IdeaContainer/IdeaContainer.js'
import IdeaForm from './IdeaContainer/IdeaForm/IdeaForm.js'
import IdeaBoard from './IdeaContainer/IdeaBoard/IdeaBoard.js'
import EventForm from './EventContainer/EventForm/EventForm.js'


class PageContainer extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route path='/home' component={Home}/>
          <Route path='/brainstorm' component={IdeaContainer}/>
          <Route path='/new-idea' component={IdeaForm}/>
          <Route path='/saved-ideas' component={IdeaBoard}/>
          <Route path='/host' component={EventForm}/>
        </Switch>
      </div>
    );
  }
}

export default PageContainer;
