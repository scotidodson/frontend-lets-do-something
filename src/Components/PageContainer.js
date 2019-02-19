import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUsers, fetchCurrentUser } from '../Actions/UserActions.js'
import { fetchIdeas, fetchSavedIdeas } from '../Actions/IdeaActions.js'
import { fetchEvents } from '../Actions/EventActions.js'
import { Route, Switch } from 'react-router-dom'
import Account from './Account.js'
import ContactsContainer from './ContactsContainer.js'
import ContactForm from './ContactForm.js'
import EventContainer from './EventContainer.js'
import EventDetails from './EventDetails.js'
import EventForm from './EventForm.js'
import Home from './Home.js'
import IdeaBoard from './IdeaBoard.js'
import IdeaContainer from './IdeaContainer.js'
import IdeaDetails from './IdeaDetails.js'
import IdeaForm from './IdeaForm.js'
import Menu from './Menu.js'
import Navigation from './Navigation.js'
import NotificationContainer from './NotificationContainer.js'
import '../Stylesheets/index.scss'

class PageContainer extends Component {
  componentWillMount() {
    this.props.fetchIdeas()
    this.props.fetchEvents()
    this.props.fetchUsers()

      if (this.props.userId === 0) {
        this.props.history.push('/login');
      } else {
        this.props.fetchCurrentUser(this.props.userId)
        setInterval(this.updateUserData, 5000)
      }
  }

  updateUserData = () => {
    console.log('fetching users again');
    console.log(this.props.userId);
    this.props.fetchCurrentUser(this.props.userId)
  }


  render() {
    return (
      <div className="page" >
        <Navigation />
        <Switch>
          <Route exact path='/account' component={Account}/>
          <Route path='/contacts' component={ContactsContainer} />
          <Route exact path='/add-contact' component={ContactForm}/>
          <Route exact path='/events' component={EventContainer} />
          <Route path={`/events/:eventId`} component={EventDetails} />
          <Route path='/host' component={EventForm} />
          <Route exact path='/' component={Home}/>
          <Route path='/saved-ideas' component={IdeaBoard} />
          <Route path='/brainstorm' component={IdeaContainer} />
          <Route path={`/ideas/:ideaId`} component={IdeaDetails} />
          <Route path='/new-idea' component={IdeaForm} />
          <Route path='/menu' component={Menu} />
          <Route path='/notifications' component={NotificationContainer} />
        </Switch>
      </div>
    );
  }
}

PageContainer.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetchIdeas: PropTypes.func.isRequired,
  fetchSavedIdeas: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  savedIdeas: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  allUsers: state.users.allUsers,
  currentUser: state.users.currentUser,
  savedIdeas: state.ideas.savedIdeas,
  userId: state.users.userId
})

export default connect(mapStateToProps, { fetchUsers, fetchIdeas, fetchSavedIdeas, fetchCurrentUser, fetchEvents })(PageContainer);
