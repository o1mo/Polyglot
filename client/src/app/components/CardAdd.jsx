import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class CardAdd extends Component {
  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Phrase you want to learn"
        /><br />
        <TextField
          floatingLabelText="Translation"
        />
        <br />
        <br />
        <FlatButton
          label="Add card"
          primary={true}
        />
      </div>
    );
  }
}

export default CardAdd;
