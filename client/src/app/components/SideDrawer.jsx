import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Profile from './Profile';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 10,
  },
};

class SideDrawer extends Component {

  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);

    this.state = { open: false };
  }

  handleToggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <div style={styles.container}>
        <RaisedButton
          label="Profile"
          onTouchTap={this.handleToggle}
        />
      <Drawer open={this.state.open}>
          <Profile />
        </Drawer>
      </div>
    );
  }
}

export default SideDrawer;
