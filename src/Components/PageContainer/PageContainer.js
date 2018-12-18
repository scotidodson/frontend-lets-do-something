import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation.js'
import ContactsContainer from '../Contacts/ContactsContainer/ContactsContainer.js'
import IdeaContainer from '../IdeaContainer/IdeaContainer.js'
import IdeaForm from '../IdeaContainer/IdeaForm/IdeaForm.js'
import IdeaBoard from '../IdeaContainer/IdeaBoard/IdeaBoard.js'
import EventForm from '../EventContainer/EventForm/EventForm.js'
import IdeaDetails from '../IdeaContainer/IdeaDetails/IdeaDetails.js'



class PageContainer extends Component {
  state = {
    currentUserId: 1
  }

  componentWillMount() {
    if (this.state.currentUserId === 0) {
      window.location.href = "http://localhost:3000/welcome"
    }
  }

  render() {
    return (
      <div>
        <Navigation />
        <ul>
          <li>
            <Link to="/brainstorm">Brainstorm</Link>
          </li>
          <li>
            <Link to="/host">Host</Link>
          </li>
        </ul>
        <Switch>
          <Route path='/brainstorm' component={IdeaContainer} />
          <Route path='/new-idea' component={IdeaForm} />
          <Route path='/saved-ideas' component={IdeaBoard} />
          <Route path='/host' component={EventForm} />
          <Route path='/users' component={ContactsContainer} />
          <Route path={`/ideas/:ideaId`} component={IdeaDetails} />
        </Switch>
      </div>
    );
  }
}

export default PageContainer;
