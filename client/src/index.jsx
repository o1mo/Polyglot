import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './app/components/App';
import Splash from './app/components/Splash';
import Dashboard from './app/components/Dashboard';
import Profile from './app/components/Profile';
import fourOFour from './app/components/fourOFour';

injectTapEventPlugin();

render((
  <Router history={browserHistory}>
    <Route path='/' component={ App }>
      <IndexRoute component={ Splash }/>
      <Route path='profile' component={ Profile }/>
      <Route path='nav' component={ Dashboard }>
      </Route>
      <Route path='dashboard' component={ Dashboard }/>
      <Route path='fourOFour' component={ fourOFour }/>
    </Route>
  </Router>
), document.getElementById('app'));
