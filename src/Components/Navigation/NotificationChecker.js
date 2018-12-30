// import React, { Component } from 'react';
// import  PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { fetchUsers, fetchCurrentUser } from '../../Actions/UserActions.js'
//
// import './Navigation.scss';
//
//
// class NotificationChecker extends Component {
//
//   notificationChecker = (phase) => {
//     let notificationInterval
//     switch (phase) {
//       case 'start':
//         notificationInterval = setInterval(this.updateUserData, 1000)
//         break;
//       case 'end':
//         clearInterval(notificationInterval)
//         break;
//       default:
//
//     }
//   }
//
//   updateUserData = () => {
//     console.log('fetching users again');
//     console.log(this.props.userId);
//     this.props.fetchCurrentUser(this.props.userId)
//     // this.props.fetchCurrentUser(this.props.userId)
//   }
//
//
//
//   render() {
//     return (
//       <div>
//         {this.notificationChecker(this.props.phase)}
//       </div>
//     );
//   }
// }
//
//
// NotificationChecker.propTypes = {
//   fetchCurrentUser: PropTypes.func.isRequired
// }
//
// const mapStateToProps = state => ({
//   userId: state.users.userId
// })
//
// export default connect(mapStateToProps, { fetchCurrentUser })(NotificationChecker);
