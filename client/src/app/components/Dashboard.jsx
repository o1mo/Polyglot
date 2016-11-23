import React, { Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import ApiServices from '../componentServices/ApiServices';
import LaunchPad from './LaunchPad';
import Chat from './Chat';
import DashButtons from './DashButtons';
import $ from 'jquery';
import dashReducer from '../reducers/Dashboard';
import AppBar from 'material-ui/AppBar';
import SideDrawer from './SideDrawer';
import { connect } from 'react-redux';

let userId;

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 100,
  }
};

// look for reducer not found error
export class Dashboard extends Component {
  constructor(props) {
    super(props);

    $.get('/api/users')
      .done((data) => {
        userId = data;
      });
  }

  /* eslint-disable */
  reDirect() {
    return <Link to='/dashboard'><button>Save</button></Link>
  }

  render() {
    let viewControl = this.props.view;
    let comp = null;

    if ( viewControl === 0 ) {
      comp = <DashButtons/>
    } else if ( viewControl === 1 ) {
      comp = <LaunchPad userId={ userId }/>
    } else if ( viewControl === 2 ) {
      comp = <Chat/>
    }

    /* eslint-enable */ 

    return (
      <div>
        <AppBar
          title="Lango"
          titleStyle={{ textAlign: 'center' }}
          showMenuIconButton={false}
        >
          <SideDrawer />
        </AppBar>
        <div style={styles.container}>
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

export default connect(mapStateToProps)(Dashboard);
