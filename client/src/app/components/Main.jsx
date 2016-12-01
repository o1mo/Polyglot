// import React, { Component } from 'react';
// import { indigo500 } from 'material-ui/styles/colors';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Splash from './Splash';
// import TitleBar from './TitleBar';

// const muiTheme = getMuiTheme({
//   palette: {
//     accent1Color: indigo500,
//   },
// });

// class Main extends Component {
//   constructor(props, context) {
//     super(props, context);

//     this.handleRequestClose = this.handleRequestClose.bind(this);
//     this.handleTouchTap = this.handleTouchTap.bind(this);

//     this.state = {
//       open: false,
//     };
//   }

//   handleRequestClose() {
//     this.setState({
//       open: false,
//     });
//   }

//   handleTouchTap() {
//     this.setState({
//       open: true,
//     });
//   }

//   render() {
//     return (
//       <MuiThemeProvider muiTheme={muiTheme}>
//         <div>
//           <TitleBar />
//           <Splash />
//         </div>
//       </MuiThemeProvider>
//     );
//   }
// }

// export default Main;
