import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUsers } from '../../../Actions/UserActions.js'
import ContactForm from '../ContactForm/ContactForm.js'
import ContactCard from '../ContactCard/ContactCard.js'
import './ContactsContainer.css'

class ContactsContainer extends Component {
  state = {
    showForm: false,
    searchInput: "",
    hasFriends: this.props.currentUser.friendships.length
  }

  componentWillMount = () => {

  }

  handleChange = (e) => {
      this.setState({ searchInput: e.target.value })
    }

  renderContactCards = () => {
    const userFriends = this.findUserFriends()
    const friendNumbers = userFriends.map(user=>{return user.id})

    return this.props.allUsers.map(user => {
      if (user.id !== this.props.userId && !friendNumbers.includes(user.id)) {
        return(<ContactCard key={user.id} user={user} loggedIn={this.props.currentUser} alreadyFriended={false} />)
      } else {
        return null
      }
    })
  }

  renderFriendCards = () => {
    const userFriends = this.findUserFriends()
    if (userFriends.length > 0) {
      return userFriends.map(user => { return(<ContactCard key={user.id} user={user} loggedIn={this.props.currentUser} alreadyFriended={true} /> ) })
    } else {
      return <h4>You haven't added any friends yet.</h4>
    }
  }

  findUserFriends = () => {
    const userFriendships = this.props.currentUser.friendships
    let userFriends = []
    userFriendships.forEach(friendship=> {userFriends.push(friendship.friend)})
    return userFriends
  }

  render() {
    return(
      <div className="contact-page">
        <div className="contact-and-friend-holder">
        <div>
          <h3>Your Contacts</h3>
        </div>
        <div>
          <div className="friend-card-container" >
            {this.renderFriendCards()}
          </div>
        </div>
        <div>
          <h3>Find Friends</h3>
        </div>
        <div>
          <div className="contact-card-container">
            {this.state.showForm ? <ContactForm /> : null }
            {this.renderContactCards()}
          </div>
        </div>
        </div>

      </div>
    )
  }
}

ContactsContainer.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  allUsers: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  allUsers: state.users.allUsers,
  currentUser: state.users.currentUser,
  userId: state.users.userId
})

export default connect(mapStateToProps, { fetchUsers })(ContactsContainer);

// <Link to='/add-contact'>
//   <h4>Add New Contact</h4>
// </Link>

// <input
// name="search"
// onChange={this.handleChange}
// placeholder="Search users..." /><br/>
