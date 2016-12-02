import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import NavBar from './NavBar';
import axios from 'axios';

// list all medals in a grid with type of medal, description, time
const style = {
  paper: {
    backgroundImage: "url('../src/public/img/speak.jpeg')",
    backgroundSize: '100px 100px',
    backgroundRepeat: 'no-repeat',
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
  },
  container: {
    textAlign: 'center'
  }
};

class Achievements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalMedals: 0,
      allMedals: ['loading'],
      // goldStars: [{from: 'languist', because: 'you rock'}, {from: 'lenny', because: 'dab dab'}]
    };
  }

  componentWillMount() {
    axios.get('/api/medals')
    .then(medals => {
      var allMedals = medals.data;
      this.setState({allMedals: allMedals});
    });
  } 

  render() {
    return (
      <div style={style.container}>
        <NavBar />
        <h1>Achievements</h1>
        {this.state.allMedals.map((medal, key)=>{
          return(
            <div key={key}>
              <Paper 
              style={style.paper} 
              zDepth={5} 
              circle={true}>
              </Paper>
              <h3>{ medal }</h3>
            </div>
          );
        })}
      </div>
    );
  }
}

// {this.state.goldStars.map((star, key)=>{
//           return(
//             <div key={key}>
//               <Paper 
//               style={style.paper} 
//               zDepth={5} 
//               circle={true}>
//               </Paper>
//               <h3>{ `${star.from} says ${star.because}` }</h3>
//             </div>
//             );
//         })}

export default Achievements;


