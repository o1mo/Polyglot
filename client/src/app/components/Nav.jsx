import React, { Component } from 'react';
import { Link } from 'react-router';
import { createStore } from 'redux';
import Chat from './Chat';
import Dash from './Dashboard';
import AppBar from 'material-ui/AppBar';
import { indigo500 } from 'material-ui/styles/colors';
import SideDrawer from './SideDrawer';
import DashButtons from './DashButtons';


const styles = {
  appBar: {
    position: 'fixed',
    top: 0,
    backgroundColor: indigo500,
  },
};

// TODO:
// Add state
// Add onClick listener
// Pass Click listener to Dash
// Pass state as props to Chat

class Nav extends Component {

  constructor(props) {
    super(props);

    this.store = createStore(this.reducer, { myId: '', language: '', teacher: false, chatActive: false });
    this.store.subscribe(this.setState.bind(this, {}));

  }

  reducer(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    if ( action.type === 'ENTER_CHAT' ) {
      newState.myId = action.myId;
      newState.language = action.language;
      newState.teacher = action.teacher;
      newState.chatActive = true;
    } else if ( action.type === 'EXIT_CHAT' ) {
      newState.language = '';
      newState.teacher = false;
      newState.chatActive = false;
    }
    return newState;
  }
  
  render() {
    return (
      <div>
        <h1>BOATS 'N POTATOES</h1>
        { this.store.getState().chatActive ? <Chat/> : <DashButtons/> }
      </div>
    );
  }
}

export default Nav;
