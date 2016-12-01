import React, { Component } from 'react';
import * as types from '../actionTypes.js';
import { connect } from 'react-redux';
import {Menu, MenuItem} from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

const style = {
  textAlign: 'center',
  margin: '50px',
};

export class DashButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div style={style}>
        <RaisedButton
          label="Teach"
          primary
          style={style}
          onTouchTap={ this.props.handleTeach.bind(this) }
        />
        <br />
        <RaisedButton
          label="Learn"
          primary
          style={style}
          onTouchTap={ this.props.handleLearn.bind(this) }
        />
        <br />
        <RaisedButton
          label="Review Vocab"
          primary
          style={style}
          onTouchTap={ this.props.handleCards.bind(this) }
        />
        <RaisedButton
          label="Achievements"
          primary
          style={style}
          onTouchTap={ () => {
            browserHistory.push('achievements');
          }}
        />
       </div>
    );
  }
}

const mapStateToProps = ( store ) => {
  return {
    view: store.view
  };
};

/* eslint-disable */
const mapDispatchToProps = ( dispatch ) => {
  return {
    handleTeach: (e) => {
      e.preventDefault();
      let teacher = true;
      let action = { type: types.ENTER_LAUNCH, teacher: teacher };
      dispatch(action);
    },
    handleLearn: (e) => {
      e.preventDefault();
      let teacher = false;
      let action = { type: types.ENTER_LAUNCH, teacher: teacher };
      dispatch(action);
    },
    handleCards: (e) => {
      e.preventDefault();
      let action = { type: types.ENTER_CARDS };
      dispatch(action);
    }
  };
};
/* eslint-enable */

export default connect(mapStateToProps, mapDispatchToProps)(DashButtons);
