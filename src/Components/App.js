import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from '../store.js'
import Login from './Login.js'
import PageContainer from './PageContainer.js'
import SignUp from './SignUp.js'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/sign-up' component={SignUp}/>
          <Route path='/' component={PageContainer}/>
        </Switch>

      </Provider>
    );
  }
}

export default App;
