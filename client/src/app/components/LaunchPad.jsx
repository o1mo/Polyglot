import React, { Component } from 'react';
import * as types from '../actionTypes';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ApiServices from '../componentServices/ApiServices';

const style = {
  textAlign: 'center',
  paddingTop: 10
};
  
class LaunchPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 2,
      languages: ['loading']
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.getLanguages = this.getLanguages.bind(this);
  }

  componentWillMount() {
   this.props.getLanguages()
   .then((lang)=>{
    this.setState({languages: lang.data});
   }) 
  }
  
  handleSubmit(e, i, value) {
    e.preventDefault();
    let language = value;
    let myId = this.props.userId;
    let action = { type: types.ENTER_CHAT, myId: myId, language: language };
    this.props.store.dispatch(action);
  }

  render() {
    return (
      <div>
      <h1>Hello World</h1>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          {this.state.languages.map((lang, key)=>{
            console.log(lang, key)
            return <MenuItem value={key} key={key} label="English" primaryText={lang} />;
          })}
        </DropDownMenu>
      </div>
    );
  }
}

export default ApiServices(LaunchPad);
        // <DropDownMenu value={this.state.value} onChange={this.handleSubmit}>
        //   // still have that async problem, but the previous error was a loose semicolon after the code block
        // </DropDownMenu>
          // <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning" />
          // <MenuItem value={2} label="12 pm - 5 pm" primaryText="Afternoon" />
          // <MenuItem value={3} label="5 pm - 9 pm" primaryText="Evening" />
          // <MenuItem value={4} label="9 pm - 5 am" primaryText="Night" />
