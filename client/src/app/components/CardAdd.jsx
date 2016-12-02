import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

class CardAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: '',
      translation: ''
    };
  }

  handleParent () {
    if(this.props.fromCards){
      this.props.handleCreate(this.state.phrase, this.state.translation);
      this.setState({
        phrase: '',
        translation: ''
      });
    } else {
      axios.post('/api/cards', {
        phrase: this.state.phrase,
        translation: this.state.translation
      })
        .then((resp) => {
          this.setState( {
            phrase: '',
            translation: ''
          } );
        });
    }
  }
  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Phrase you want to learn"
          value={this.state.phrase}
          onChange={(e) => {this.setState({phrase: e.target.value});}}
        /><br />
        <TextField
          floatingLabelText="Translation"
          value={this.state.translation}
          onChange={(e) => {this.setState({translation: e.target.value});}}
        />
        <br />
        <br />
        <FlatButton
          label="Add card"
          primary={true}
          onTouchTap={this.handleParent.bind(this)}
        />
      </div>
    );
  }
}

export default CardAdd;
