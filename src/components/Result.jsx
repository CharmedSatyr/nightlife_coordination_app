'use strict';

import React, { Component } from 'react';
import ajaxFunctions from '../common/ajax-functions.jsx';

export default class Result extends Component {
   constructor(props) {
      super(props);
      this.state = {
         numAttending: 0
      }
      this.addAttendee = this.addAttendee.bind(this);
   }
   numAttending() {
      ajaxFunctions.ajaxRequest('GET', '/' + this.props.city + '/' + this.props.item, (response) => {
         this.setState({ numAttending: response });
         console.log('Current attendees for ' + this.props.item + ': ' + response);
      });
   }
   addAttendee() {
      ajaxFunctions.ajaxRequest('POST', '/' + this.props.city + '/' + this.props.item, (response) => {
         console.log('Add attendees to', this.props.item + '. New number: ' + response);
         this.numAttending();
      });
   }
   componentWillMount() {
      this.numAttending();
   }
   render() {
      return (
         <div name={this.props.item} onClick={this.addAttendee} className='result'>
          {this.props.item}
          <div className='numAttendingBox'>{this.state.numAttending}</div>
         </div>
      );
   }
};
