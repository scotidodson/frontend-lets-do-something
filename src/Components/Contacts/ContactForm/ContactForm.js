// import React, { Component } from 'react';
// import  PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { fetchUsers } from '../../../../Actions/UserActions.js'
//
// class ContactForm extends Component {
//   state = {
//     first_name: '',
//     last_name: '',
//     phone: '',
//     default_city: '',
//     app_member: false
//   }
//
//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value })
//   }
//
//   handleSubmit = (e) => {
//     e.preventDefault();
//     const newUser = {...this.state}
//     this.props.createUser(newUser)
//     // NEED TO ADD FRIENDSHIP HERE
//   }
//
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//
//         First Name:<br/>
//         <input type="text" name="first_name" onChange={this.handleChange} value={this.state.title} /><br/><br/>
//
//         Last Name:<br/>
//         <input type="text" name="last_name" onChange={this.handleChange} value={this.state.street} /><br/><br/>
//
//         Phone:<br/>
//         <input type="text" name="phone" onChange={this.handleChange} value={this.state.neighborhood} /><br/><br/>
//
//         City:<br/>
//         <select name="city" onChange={this.handleChange}>
//           <option value="NYC">NYC</option>
//         </select><br/><br/>
//
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }
//
// ContactForm.propTypes = {
//   fetchUsers: PropTypes.func.isRequired,
//   allUsers: PropTypes.array.isRequired
// }
//
// const mapStateToProps = state => ({
//   allUsers: state.users.allUsers
// })
//
// export default connect(mapStateToProps, { fetchUsers })(ContactForm);
