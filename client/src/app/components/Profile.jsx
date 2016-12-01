import React, { Component } from 'react';
import { Link } from 'react-router';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { indigo500 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
// import AppBar from './AppBar';
import Dashboard from './Dashboard';
import PopoverButton from './PopOverButton';
import NavBar from './NavBar';
import ProgressBar from './progress';
import LearningChips from './LearningChips';
import Credits from './Credits';
import axios from 'axios';

// import SelectableLanguages from './SelectableLanguages';
const style = {
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  navContainer:{
    textAlign: 'center',
  },
  paper: {
    backgroundImage: "url('../src/public/img/Omar.jpeg')",
    backgroundSize: '250px 250px',
    backgroundRepeat: 'no-repeat',
    height: 250,
    width: 250,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
  bar: {
    margin: '0 0 0 37%',
    width: '28%',
  },
  li: {
    listStyleType: 'none',
  },
  credits: {
    margin: '0px 0px 0px 20px',
  }
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDashboard: false,
      learning: [
      {language: 'Spanish', level: 65}, 
      {language: 'German', level: 35},
      {language: 'French', level: 75},
      ],
      username: 'Omar',
      nativeLanguage: 'Egyptian',
      friends: ['smith', 'jones', 'snoopDog', 'jason', 'JP'],
      friendsButtonName: 'Friends', 
    };
  }

  render() {
    return (
      <div>
        <div style={ style.navContainer }>
          <NavBar />  
        </div>
        <div style={ style.credits }>
          <Credits />
        </div>
          <PopoverButton 
          name={ this.state.friendsButtonName } 
          friends={ this.state.friends } />
        <div style={ style.container }>
          <h1>{ this.state.username }</h1>
          <Paper 
          style={ style.paper } 
          zDepth={5} 
          circle={true} />
          <h3> {`Native ${ this.state.nativeLanguage } Speaker`}</h3>
          <h4>Currently Learning:</h4>
          {this.state.learning.map((lang, key) => {
            return <div key={ key }>
                    <h4 style={ style.li }>{ lang.language }</h4>
                    <div style={ style.bar }>
                      <ProgressBar 
                      completed={ lang.level } />
                    </div>
                  </div>;
          })}
        </div>
      </div>
    );
  }
}

export default Profile;

