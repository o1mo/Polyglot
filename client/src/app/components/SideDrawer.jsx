import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

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
          label="Toggle Drawer"
          onTouchTap={this.handleToggle}
        />
        <Drawer open={this.state.open}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default SideDrawer;
