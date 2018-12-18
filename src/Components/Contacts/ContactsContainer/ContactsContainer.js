import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUsers } from '../../../Actions/UserActions.js'
import ContactForm from '../ContactForm/ContactForm.js'
import ContactCard from '../ContactCard/ContactCard.js'


class ContactsContainer extends Component {
  state = {
    showUsers: true,
    showForm: false,
    searchInput: ""
  }

  componentWillMount() {
    this.props.fetchUsers()
  }

  handleChange = (e) => {
      this.setState({ searchInput: e.target.value })
    }

  renderContactCards = () => {
    return this.props.allUsers.map(user => {
      return(<ContactCard key={user.id} user={user} />)
    })}

  render() {
    return(
      <div>
        <input
          name="search"
          onChange={this.handleChange}
          placeholder="Search users..." />
        {this.state.showForm ? <ContactForm /> : null }
        {this.renderContactCards()}
      </div>
    )
  }
}

ContactsContainer.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  allUsers: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  allUsers: state.users.allUsers
})

export default connect(mapStateToProps, { fetchUsers })(ContactsContainer);
