import React, { Component } from 'react';
import { Link } from 'react-router';
// import AppBar from './AppBar';
import Dashboard from './Dashboard';
// import SelectableLanguages from './SelectableLanguages';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import { indigo500 } from 'material-ui/styles/colors';

const styles = {
  container: {
    textAlign: 'center',
    width: '50%',
    margin: 'auto',
  },
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDashboard: false,
      learnLanguages: ['spanish', 'chinese'],
      teachLanguages: ['english'],
    };

  }

  render() {

    const learn = this.state.learnLanguages.map((lang) => {
      return <ListItem primaryText={lang} />;
    });

    const teach = this.state.teachLanguages.map((lang) => {
      return <ListItem primaryText={lang} />;
    });

    return (
      <div>
        <div style={styles.container}>
        <h3>Profile</h3>
        <Link to='/dashboard'><RaisedButton label="Save Profile" primary></RaisedButton></Link>
        <br />
        <h4>Learning Languages</h4>
          <List>
            {learn}
          </List>
        <h4>Teaching Languages</h4>
          <List>
            {teach}
          </List>
        <h4>New Language</h4>
          <TextField
            inputStyle={styles.container}>
          </TextField>
          <br />
          <RaisedButton
            label="Add"
            primary
          />
        </div>
      </div>
    );
  }
}

export default Profile;
