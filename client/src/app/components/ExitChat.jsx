import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as types from '../actionTypes.js';
import { connect } from 'react-redux';
import axios from 'axios';
import $ from 'jquery';

export class ExitChat extends Component {
  constructor( props ) {
    super( props );
    this.yesHandler = () => {
      this.props.handleYes( this.props.myId, this.props.pairId );
    };
    this.noHandler = () => {
      this.props.handleNo( this.props.myId, this.props.pairId );
    };
  }

  
  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Would you chat with this person again?"
        /><br />
        <br />
        <br />
        <FlatButton
          label="Yes"
          primary={true}
          onClick={ this.yesHandler }
        />
        <FlatButton
          label="No"
          primary={true}
          onClick={ this.noHandler }
        />
      </div>
    );
  }
}

const mapStateToProps = ( store, ownProps ) => {
  return {
    myId: store.myId,
    pairId: store.pairId
  };
};

/* eslint-disable */
const mapDispatchToProps = ( dispatch, ownProps ) => {
  return {
    handleYes: ( userId, pairId ) => {
      let userPref = {match: true, userId: userId, pairId: pairId};
      let action = { type: types.RESET };
      dispatch(action);
      axios.post('/api/users/match', userPref);
    },
    handleNo: ( userId, pairId ) => {
      let userPref = { userId: userId, pairId: pairId, match: false };
      let action = { type: types.RESET };
      dispatch(action);
      axios.post('/api/users/match', userPref);
    }
  };
};
/* eslint-enable */

export default connect( mapStateToProps, mapDispatchToProps )( ExitChat );
