import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import App from './app/components/App';
import Splash from './app/components/Splash';
import Cards from './app/components/Cards';
import Dashboard from './app/components/Dashboard';
import Achievements from './app/components/Achievements';
import Profile from './app/components/Profile';
import fourOFour from './app/components/fourOFour';
import dashReducer from './app/reducers/Dashboard';

const logger = createLogger();

let initialState = {
  myId: null,
  pairId: null,
  language: null,
  teacher: null,
  view: 0
};

let store = createStore(dashReducer, initialState, applyMiddleware( thunk, promise, logger ));

injectTapEventPlugin();

render((
  <Provider store={ store }>
    <Router history={browserHistory}>
      <Route path='/' component={ App }>
        <IndexRoute component={ Splash }/>
        <Route path='profile' component={ Profile }/>
        <Route path='nav' component={ Dashboard }>
        </Route>
        <Route path='dashboard' component={ Dashboard }/>
        <Route path='Achievements' component={ Achievements }/>
        <Route path='cards' component={ Cards }/>
        <Route path='fourOFour' component={ fourOFour }/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
