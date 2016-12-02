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
import ProgressBar from './Progress';
import LearningChips from './LearningChips';
import Credits from './Credits';
import axios from 'axios';

// import SelectableLanguages from './SelectableLanguages';

const style = {
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  bar: {
    margin: '0 0 0 37%',
    width: '28%',
  },
  credits: {
    margin: '0px 0px 0px 20px',
  }, 
  left: {float: 'left', marginLeft: '30%'},
  right: {float: 'right'},
  center: {textAlign: 'center'},
  navContainer: {textAlign: 'center'},
  li: {listStyleType: 'none'},
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trigger: 0,
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
      learning: [{languageName: "Loading", level100: 0, levelName: "Advanced", nextLevel: "Master"}],
      showDashboard: false,
      username: 'Omar',
      nativeLanguage: 'English',
      friends: ['smith', 'jones', 'snoopDog', 'jason', 'JP'],
      friendsButtonName: 'Friends',
    };
  } 

  componentWillMount() {
    var that = this;
    axios.get('/api/users')
    .then(user => {
      console.log('user', user);
      that.setState({paper: {
        backgroundImage: `url('${user.data.photo_url}')`,
        backgroundSize: '250px 250px',
        backgroundRepeat: 'no-repeat',
        height: 250,
        width: 250,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
      }});
      that.setState({
        trigger: 1,
        username: `${user.data.full_name}`,
        learning: user.data.learning
      });
      console.log('state', that.state);
    });

    axios.get('/api/userLanguages')
    .then(languages => {
      console.log('languages', languages);
      this.setState({ learning: languages.data });
    });
  }
// try display inline on the parent div
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
          {this.state.trigger === 1 ? <Paper 
          style={ this.state.paper } 
          zDepth={5} 
          circle={true} /> : null}
          <h3> {`Native ${ this.state.nativeLanguage } Speaker`}</h3>
          <h4>Currently Learning:</h4>
          {this.state.learning.map((lang, key) => {
            return <div style={ style.container } key={ key }>
                     <h5 style={ style.left }>{ lang.levelName }</h5>
                     <h4 style={ style.center }>{ lang.languageName }</h4>
                     <div style={ style.bar }>
                       <ProgressBar 
                       completed={ lang.level100 } />
                     </div>
                   </div>;
          })}
        </div>
      </div>
    );
  }
}


export default Profile;

