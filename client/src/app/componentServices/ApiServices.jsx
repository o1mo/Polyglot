import React, { Component } from 'react';
import axios from 'axios';

var ApiServices = ComposedComponent => class extends Component {
  constructor(props) {
    super(props);   
  }
  getUserId() {
    return axios.get('api/users');
  }
  getLanguages() {
    return axios.get('api/languages');
  }
  render() {
    return <ComposedComponent 
            getUserId={ this.getUserId } 
            getLanguages = { this.getLanguages } />;
  }
};

export default ApiServices;
