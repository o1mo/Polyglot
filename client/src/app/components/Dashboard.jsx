import React, { Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import * as types from '../actionTypes';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import ApiServices from '../componentServices/ApiServices';
import LaunchPad from './LaunchPad';
import NavBar from './NavBar';
import Chat from './Chat';
import Cards from './Cards';
import Credits from './Credits';
import ExitChat from './ExitChat';
import DashButtons from './DashButtons';
import dashReducer from '../reducers/Dashboard';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import axios from 'axios';

let userId;

const style = {
  container: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  navContainer: {
    textAlign: 'center',
  },
  logoContainer: {
    textAlign: 'center',
    paddingTop: 30,
    paddingLeft: 30,
  }, 
  credits: {
    margin: '0px 0px 0px 20px',
  },
  logo: {    
    backgroundImage: "url('../src/public/img/lango.png')",
    backgroundSize: '250px 250px',
    backgroundRepeat: 'no-repeat',
    height: 250,
    width: 250,
    textAlign: 'center',
    display: 'inline-block',
    opacity: '.8'
  }
};

// look for reducer not found error
export class Dashboard extends Component {
  constructor(props) {
    super(props);

    axios.get('/api/users')
      .then((resp) => {
        this.props.sendId( resp.data.id );
      });
  }

  handleGetUser(){
    axios.get('/api/users')
    .then(user => {
      console.log('got it', user);
    });
  }

  render() {
    let viewControl = this.props.view;
    let comp = null;
    
    /* eslint-disable */
    if ( viewControl === 0 ) {
      comp = <DashButtons/>
    } else if ( viewControl === 1 ) {
      comp = <LaunchPad myId={ userId }/>
    } else if ( viewControl === 2 ) {
      comp = <Chat/>
    } else if ( viewControl === 3 ) {
      comp = <Cards/>
    } else if ( viewControl === 4 ) {
      comp = <ExitChat/>
    } 
    /* eslint-enable */
    return (
      <div>
        <div style={style.navContainer}>
          <NavBar />        
        </div>
        <div style={style.credits} onClick={this.handleGetUser.bind(this)} >
          <Credits />
        </div>
        <div style={style.container}>
          { comp }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( store ) => {
  return {
    view: store.view
  };
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
  return {
    sendId: ( newId ) => {
      let action = { type: types.GET_ID, myId: newId };
      dispatch(action);
    }
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(Dashboard);
