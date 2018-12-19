import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from '../store.js'
import './App.css';

import ContactsContainer from './Contacts/ContactsContainer/ContactsContainer.js'
import EventForm from './EventContainer/EventForm/EventForm.js'
import Home from './Home/Home.js'
import IdeaBoard from './IdeaContainer/IdeaBoard/IdeaBoard.js'
import IdeaContainer from './IdeaContainer/IdeaContainer.js'
import IdeaDetails from './IdeaContainer/IdeaDetails/IdeaDetails.js'
import IdeaForm from './IdeaContainer/IdeaForm/IdeaForm.js'
import Navigation from './Navigation/Navigation.js'
import Splash from './Splash/Splash.js'
import Login from './Login/Login.js'
import SignUp from './SignUp/SignUp.js'
import PageContainer from './PageContainer/PageContainer.js'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path='/welcome' component={Splash}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/sign-up' component={SignUp}/>
          <Route path='/' component={PageContainer}/>
          <Route exact path='/' component={Home}/>
        </Switch>

      </Provider>
    );
  }
}

export default App;
