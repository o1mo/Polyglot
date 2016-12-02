import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import * as types from '../actionTypes.js';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleToggle = () => {
      this.setState({ open: !this.state.open });
    };
  }

  render() {
    return (
      <div>
        <AppBar
          title="Lango"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={ this.handleToggle }
        />
        <Drawer open={this.state.open}>
          <AppBar onLeftIconButtonTouchTap={ this.handleToggle } />
          <div className="innerDrawer">
            <MenuItem onTouchTap={ ()=>this.props.navigate('dashboard', browserHistory) }>Dashboard</MenuItem>
            <MenuItem onTouchTap={ ()=>this.props.navigate('Profile', browserHistory) }>Profile</MenuItem>
            <MenuItem onTouchTap={ ()=>this.props.navigate('achievements', browserHistory) }>Achievements</MenuItem>
            <MenuItem onTouchTap={ ()=>this.props.navigate('cards', browserHistory) }>Review Vocab</MenuItem>
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ( store ) => {
  return {};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
  return {
    navigate: ( destination, method ) => {
      method.push( destination );
      let action = { type: types.RESET };
      dispatch( action );
    }
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( NavBar );
