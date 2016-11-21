import React, { Component } from 'react';

class fourOFour extends Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
  }

  render () {
    return (
      <div>
        <h1>404</h1>
      </div>
    );
  }
}

export default fourOFour;