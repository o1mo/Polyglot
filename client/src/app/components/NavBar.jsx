import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(){
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div>
        <AppBar
          title="Lango"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={ ()=>this.handleToggle() }
        />
        <Drawer open={this.state.open}>
          <AppBar title="Lango" onLeftIconButtonTouchTap={ ()=>this.handleToggle() } />
          <div className="innerDrawer">
            <MenuItem onTouchTap={ ()=>browserHistory.push('dashboard') }>DashBoard</MenuItem>
            <MenuItem onTouchTap={ ()=>browserHistory.push('Profile') }>Profile</MenuItem>
            <MenuItem onTouchTap={ ()=>browserHistory.push('achievements') }>Achievements</MenuItem>
            <MenuItem onTouchTap={ ()=>browserHistory.push('cards') }>Review Vocab</MenuItem>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default NavBar;
