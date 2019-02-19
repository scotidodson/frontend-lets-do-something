import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUsers } from '../Actions/UserActions.js'
import ContactCard from './ContactCard.js'
import ContactForm from './ContactForm.js'

class ContactsContainer extends Component {
  state = {
    showForm: false,
    searchInput: "",
    hasFriends: this.props.currentUser.friendships.length
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

  handleButtons = (e) => {
    console.log(e.target);
    if (e.target.dataset.type === "show-friends") {
      console.log('in if');
      document.querySelector('.contacts').id = "selected"
      document.querySelector('.not-contacts').id = ""
      document.querySelector('.friend-container').id = ""
      document.querySelector('.friend-container').style.height = "auto"
      document.querySelector('.contacts-container').id = "hidden"
      document.querySelector('.contacts-container').style.height = 0
    } else if (e.target.dataset.type === "find-friends") {
      document.querySelector('.contacts').id = ""
      document.querySelector('.not-contacts').id = "selected"
      document.querySelector('.friend-container').id = "hidden"
      document.querySelector('.friend-container').style.height = 0
      document.querySelector('.contacts-container').id = ""
      document.querySelector('.contacts-container').style.height = "auto"
    }
  }

  render() {
    return(
      <div className="contact-page">
        <div className="contact-header" onClick={this.handleButtons}>
          <div data-type="show-friends" className="contacts" id="selected">
            <h3 data-type="show-friends">CONTACTS</h3>
          </div>
          <div data-type="find-friends" className="not-contacts">
            <h3 data-type="find-friends">FIND FRIENDS</h3>
          </div>
        </div>
        <div className="friend-container" >
          {this.renderFriendCards()}
        </div>
        <div className="contacts-container" id="hidden">
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

// <input
// name="search"
// onChange={this.handleChange}
// placeholder="Search users..." /><br/>
