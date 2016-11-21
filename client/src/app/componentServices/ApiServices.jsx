import React, { Component } from 'react';
import axios from 'axios';

var ApiServices = ComposedComponent => class extends Component {
  constructor(props) {
    super(props);   
  }
  getUserId() {
    return axios.get('api/users');
  }
  render() {
    return <ComposedComponent getUserId={this.getUserId} />;
  }
};

export default ApiServices;
