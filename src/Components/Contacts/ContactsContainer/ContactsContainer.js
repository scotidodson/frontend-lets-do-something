import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUsers, fetchCurrentUser } from '../../../Actions/UserActions.js'
import ContactForm from '../ContactForm/ContactForm.js'
import ContactCard from '../ContactCard/ContactCard.js'


class ContactsContainer extends Component {
  state = {
    showUsers: true,
    showForm: false,
    searchInput: "",
  }



  handleChange = (e) => {
      this.setState({ searchInput: e.target.value })
    }

  renderContactCards = () => {
    let contacts = []
    console.log('render user', this.props.currentUser);
    return this.props.allUsers.map(user => {
      if (user.id !== 1) {
        return(<ContactCard key={user.id} user={user} loggedIn={this.props.currentUser}/>)
      }
    })
  }

  render() {
    return(
      <div>
      <h2>Your Contacts</h2>
      <p>current friends here</p>

      <br/><br/>
      <h2>Find Friends</h2>
        <input
          name="search"
          onChange={this.handleChange}
          placeholder="Search users..." />

        {this.state.showForm ? <ContactForm /> : null }

        <br/><br/>
        <p>this should be non-friended contacts only</p>
        {this.renderContactCards()}
      </div>
    )
  }
}

ContactsContainer.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  allUsers: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  allUsers: state.users.allUsers
})

export default connect(mapStateToProps, { fetchUsers, fetchCurrentUser })(ContactsContainer);
