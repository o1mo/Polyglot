import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

export class Credits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credits: 2000,
    };
  }

  render() {
    return <h3>{`Credits: ${this.state.credits}`}</h3>;
  }
}
export default Credits;