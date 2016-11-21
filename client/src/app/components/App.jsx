import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Link } from 'react-router';
import { indigo500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({
  // palette: {
  //   accent1Color: indigo500,
  // },
  // appBar: {
  //   color: indigo500,
  // }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
