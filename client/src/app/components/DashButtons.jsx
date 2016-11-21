import React, { Component } from 'react';
import * as types from '../actionTypes.js';

import {Menu, MenuItem} from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  textAlign: 'center',
  margin: 12,
};

class DashButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTeach(e) {
    e.preventDefault();
    let teacher = true;
    let action = { type: types.ENTER_LAUNCH, teacher: teacher };
    this.props.store.dispatch(action);
  }

  handleLearn(e) {
    e.preventDefault();
    let teacher = false;
    let view = 1;
    let action = { type: types.ENTER_LAUNCH, teacher: teacher, view: view };
    this.props.store.dispatch(action);
  }

  render() {
    return (
      <div style={style}>
        <RaisedButton
          label="Teach"
          primary
          style={style}
          onTouchTap={ this.handleTeach.bind(this) }
        />
        <br />
        <RaisedButton
          label="Learn"
          primary
          style={style}
          onTouchTap={ this.handleLearn.bind(this) }
        />
       </div>
    );
  }
}

export default DashButtons;
