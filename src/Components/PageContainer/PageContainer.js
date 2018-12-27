import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUsers } from '../../Actions/UserActions.js'
import { fetchIdeas, fetchSavedIdeas } from '../../Actions/IdeaActions.js'
import { Route, Switch } from 'react-router-dom'
import Navigation from '../Navigation/Navigation.js'
import Account from '../Account/AccountContainer.js'
import ContactsContainer from '../Contacts/ContactsContainer/ContactsContainer.js'
import IdeaContainer from '../IdeaContainer/IdeaContainer.js'
import EventContainer from '../EventContainer/EventContainer.js'
import IdeaForm from '../IdeaContainer/IdeaForm/IdeaForm.js'
import IdeaBoard from '../IdeaContainer/IdeaBoard/IdeaBoard.js'
import EventForm from '../EventContainer/EventForm/EventForm.js'
import IdeaDetails from '../IdeaContainer/IdeaDetails/IdeaDetails.js'
import Home from '../Home/Home.js'
import Menu from '../Navigation/Menu/Menu.js'
import NotificationContainer from '../Navigation/NotificationContainer/NotificationContainer.js'
import './PageContainer.css';




class PageContainer extends Component {
  state = {
    currentUserId: 1
  }

  componentWillMount() {
      this.props.fetchUsers()
      this.props.fetchIdeas()
  }

  componentDidMount() {
    if (this.state.currentUserId === 0) {
      window.location.href = "http://localhost:3000/welcome"
    }
  }

  render() {
    return (
      <div className="page" >
        <Navigation />
        <Switch>
          <Route path='/brainstorm' component={IdeaContainer} />
          <Route path='/new-idea' component={IdeaForm} />
          <Route path='/saved-ideas' component={IdeaBoard} />
          <Route path='/host' component={EventForm} />
          <Route path='/notifications' component={NotificationContainer} />
          <Route path='/contacts' component={ContactsContainer} />
          <Route path='/events' component={EventContainer} />
          <Route path='/menu' component={Menu} />
          <Route path={`/ideas/:ideaId`} component={IdeaDetails} />
          <Route exact path='/' component={Home}/>
          <Route exact path='/account' component={Account}/>
        </Switch>
      </div>
    );
  }
}

PageContainer.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchIdeas: PropTypes.func.isRequired,
  fetchSavedIdeas: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  savedIdeas: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  allUsers: state.users.allUsers,
  currentUser: state.users.currentUser,
  savedIdeas: state.ideas.savedIdeas
})

export default connect(mapStateToProps, { fetchUsers, fetchIdeas, fetchSavedIdeas })(PageContainer);
