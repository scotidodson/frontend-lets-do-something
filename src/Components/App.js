import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from '../store.js'
import Login from './Login/Login.js'
import PageContainer from './PageContainer/PageContainer.js'
import SignUp from './SignUp/SignUp.js'
import Splash from './Splash/Splash.js'
import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path='/welcome' component={Splash}/>
          <Route path='/login' component={Login}/>
          <Route path='/sign-up' component={SignUp}/>
          <Route path='/' component={PageContainer}/>
        </Switch>
      </Provider>
    );
  }
}

export default App;

// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>
