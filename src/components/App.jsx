'use strict';

import React, {
   Component
} from 'react';

import ajaxFunctions from '../common/ajax-functions.jsx';

class App extends React.Component {
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
      ajaxFunctions.ajaxRequest('POST', '/' + this.state.city, (response) => {

         const venues = [];
         JSON.parse(response)
            .map((item) => {
               console.log(item.name);
               venues.push(item.name);
            });

         this.setState({
            venues: venues
         });
      });
   }
   componentWillMount() {
      this.pullVenues(this.state.city);
   }
   render() {
      const children = [];
      this.state.venues.map((item, index) => {
         children.push(<Result key={index} item={item}/>);
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

const Result = ({
   item
}) => (
   <div className='result'>{item}</div>
);


export default App;
