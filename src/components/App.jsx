'use strict';

import React, { Component } from 'react';
import ajaxFunctions from '../common/ajax-functions.jsx';

import Result from './Result.jsx';

export default class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         city: 'New York',
         venues: []
      };
      this.handleChange = this.handleChange.bind(this);
   }
   handleChange(event) {
      this.setState({
         city: event.currentTarget.value
      });
      this.pullVenues();
   }
   pullVenues() {
      if (this.state.city !== '') {
         ajaxFunctions.ajaxRequest('POST', '/' + this.state.city, (response) => {

            const venues = [];
            JSON.parse(response)
               .map((item) => {
                  venues.push(item.name);
               });

            this.setState({
               venues: venues
            });
         });
      }
   }
   componentWillMount() {
      this.pullVenues();
   }
   render() {
      const children = [];
      this.state.venues.map((item, index) => {
         children.push(<Result key={index} city={this.state.city} item={item}/>);
      });

      return (
         <div>
          <h1>City: {this.state.city}</h1>
            <input type='text' onChange={this.handleChange}/>
            <br/>
            Results:
            <div>
              {children}
            </div>
          </div>
      );
   };
};
