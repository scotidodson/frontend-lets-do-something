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
    searchInput: ""
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
    return userFriends.map(user => { return(<ContactCard key={user.id} user={user} loggedIn={this.props.currentUser} alreadyFriended={true} /> ) })
  }

  findUserFriends = () => {
    const userFriendships = this.props.currentUser.friendships
    let userFriends = []
    userFriendships.forEach(friendship=> {userFriends.push(friendship.friend)})
    return userFriends
  }

  render() {
    return(
      <div>
        <h2>Your Contacts</h2>
        <div className="friend-card-container">
          {this.renderFriendCards()}
        </div>

        <h2>Find Friends</h2>
        <input
        name="search"
        onChange={this.handleChange}
        placeholder="Search users..." /><br/>
        <div className="contact-card-container">
          {this.state.showForm ? <ContactForm /> : null }
          {this.renderContactCards()}
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
