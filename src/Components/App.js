import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from '../store.js'
import './App.css';

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
        </Switch>

      </Provider>
    );
  }
}

export default App;
