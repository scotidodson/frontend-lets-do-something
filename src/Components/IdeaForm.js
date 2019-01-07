import React, { Component } from 'react';
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createIdea, fetchIdeas } from '../Actions/IdeaActions.js'
import '../Stylesheets/IdeaForm.css'
// import IdeaCard from '../IdeaCard/IdeaCard.js'
// import Home from './Home/Home.js'


class IdeaForm extends Component {
  state = {
    title: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    neighborhood: '',
    category: '',
    details: '',
    winter: false,
    spring: false,
    summer: false,
    fall: false,
    price_range: 0,
    duration: 'couple hours',
    website: '',
    expiration: false,
    expiration_date: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCheckbox = (e) => {
    this.setState({ [e.target.name]: e.target.checked })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newIdea = {...this.state}
    this.props.createIdea(newIdea)
    this.props.fetchIdeas()
    this.props.history.push('/brainstorm');
  }


  render() {
    return (
      <div className="idea-page">
        <div className="idea">
          <form onSubmit={this.handleSubmit}>

            Title:<br/>
            <input type="text" name="title" onChange={this.handleChange} value={this.state.title} /><br/><br/>

            Location:<br/>
            <input type="text" name="street" onChange={this.handleChange} value={this.state.street} /><br/>

            <input type="text" name="city" onChange={this.handleChange} value={this.state.city} /><br/>

            <input type="text" name="state" onChange={this.handleChange} value={this.state.state} /><br/>

            <input type="text" name="zip" onChange={this.handleChange} value={this.state.zip} /><br/><br/>

            Neighborhood:<br/>
            <input type="text" name="neighborhood" onChange={this.handleChange} value={this.state.neighborhood} /><br/><br/>

            Price Range:<br/>
            <select name="price_range" onChange={this.handleChange}>
              <option value="0">Free</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
            </select><br/><br/>

            Category:<br/>
            <select name="category" onChange={this.handleChange}>
              <option value="food">Food</option>
              <option value="nightlife">Nightlife</option>
              <option value="sports">Sports</option>
              <option value="outdoors">Outdoors</option>
              <option value="music">Music</option>
              <option value="comedy">Comedy</option>
              <option value="theater">Theater</option>
              <option value="museum">Museum</option>
              <option value="tour">Sightseeing / Tour</option>
            </select><br/><br/>

            Season:<br/>
            <input type="checkbox" name="spring" onChange={this.handleCheckbox} /> Spring
            <input type="checkbox" name="summer" onChange={this.handleCheckbox} /> Summer
            <input type="checkbox" name="fall" onChange={this.handleCheckbox} /> Fall
            <input type="checkbox" name="winter" onChange={this.handleCheckbox} /> Winter<br/><br/>



            Duration:<br/>
            <select name="category" onChange={this.handleChange}>
              <option value="couple hours">couple hours</option>
              <option value="evening">evening</option>
              <option value="all day">all day</option>
              <option value="weekend">weekend</option>
              <option value="quick">quick</option>
            </select><br/><br/>


            Details:<br/>
            <textarea type="text" name="details" onChange={this.handleChange} value={this.state.details} /><br/><br/>

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

IdeaForm.propTypes = {
  createIdea: PropTypes.func.isRequired,
  fetchIdeas: PropTypes.func.isRequired
}
export default connect(null, { createIdea, fetchIdeas })(IdeaForm);


// expiration: null,
// expiration_date: null,



            // <input type="checkbox" name="expiration" onChange={this.handleCheckbox} /> Available for a limited time until:  <input type="date" name="expiration_date" onChange={this.handleChange}
            //     value={this.state.expiration_date}
            //     min="2018-01-01" max="2020-12-31" /><br/><br/>

                        // Website:<br/>
                        // <input type="text" name="website" onChange={this.handleChange} value={this.state.website} /><br/><br/>
