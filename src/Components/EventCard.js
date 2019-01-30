import React, { Component } from 'react';

class EventCard extends Component {
  render() {

    return (
        <div data-id={this.props.event.id} >
          <h4>-- {this.props.event.title} --</h4>
        </div>
    );
  }
}

export default EventCard;
