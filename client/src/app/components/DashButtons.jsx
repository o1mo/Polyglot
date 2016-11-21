import React, { Component } from 'react';
import * as types from '../actionTypes.js';

import {Menu, MenuItem} from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  textAlign: 'center',
  paddingTop: 200,  
};

class DashButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

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
           onTouchTap={this.handleTouchTap}
           label="Get Started"
           primary
         />
         <Popover
           open={this.state.open}
           anchorEl={this.state.anchorEl}
           anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
           targetOrigin={{horizontal: 'left', vertical: 'top'}}
           onRequestClose={this.handleRequestClose}
         >
           <Menu>
             <MenuItem primaryText="Teach" onClick={ this.handleTeach.bind(this)}/>
             <MenuItem primaryText="Learn" onClick={ this.handleLearn.bind(this)}/>
           </Menu>
         </Popover>
       </div>
    );
  }
}

export default DashButtons;
       