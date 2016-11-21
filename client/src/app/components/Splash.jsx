import React, { Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import ApiServices from '../componentServices/ApiServices';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 100,
  }
};

class Splash extends Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
  }
    
  handleEnter() {
    new Promise(resolve => {
      var auth = () => {
        return window.location = '/login/facebook';
      };
      
      resolve(auth());
    })
    .then(()=> {
      this.props.getUserId().then((user) => { 
        var id = user.data;
        if (id > 0) {
          browserHistory.push('dashboard');
        } else {
          browserHistory.push('fourOFour');
        }
      }); 
    });
  }
  
  render () {
    return (
      <div className='container' style={styles.container}>
        <div className='textIntro'>
          <h1 className='titles'>Lango</h1>
          <h2 className='titles'>Learn languages from native speakers</h2>
          <div>
            <RaisedButton
              className='enterButton'
              label="Sign In with Facebook"
              secondary
              onTouchTap={() => this.handleEnter() }/>
          </div>
        </div>
      </div>
    );
  }
}

export default ApiServices(Splash);
