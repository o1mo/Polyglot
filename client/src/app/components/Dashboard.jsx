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

let userId;

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 100,
  }
};

// look for reducer not found error
class Dashboard extends Component {
  constructor(props) {
    super(props);

    const logger = createLogger();
    let initialState = {
      myId: null,
      pairId: null,
      language: null,
      teacher: null,
      view: 0,
    };

    this.store = createStore(dashReducer, initialState, applyMiddleware( thunk, promise, logger ));
    this.store.subscribe(this.setState.bind(this, {}));

    $.get('/api/users')
      .done((data) => {
        userId = data;
      });
  }

  componentWillMount() {
    this.props.getUserId().then( (resp) => { console.log('hhhhh', resp.data); });
  }

  reDirect() {
    return <Link to='/dashboard'><button>Save</button></Link>;
  }

  render() {

    let viewControl = this.store.getState().view;
    let comp = null;

    if ( viewControl === 0 ) {
      comp = <DashButtons store={ this.store } />;
    } else if ( viewControl === 1 ) {
      comp = <LaunchPad userId={ userId } store={ this.store }/>;
    } else if ( viewControl === 2 ) {
      comp = <Chat store={ this.store }/>;
    }

    return (
      <div>
        <AppBar
          title="Lango"
          titleStyle={{ textAlign: 'center' }}
          showMenuIconButton={false}
        />
        <div style={styles.container}>
          { comp }
        </div>
      </div>
    );
  }
}

export default ApiServices(Dashboard);
