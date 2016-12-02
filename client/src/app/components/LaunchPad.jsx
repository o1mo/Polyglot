import React, { Component } from 'react';
import * as types from '../actionTypes';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ApiServices from '../componentServices/ApiServices';
import { connect } from 'react-redux';
import axios from 'axios';

const style = {
  textAlign: 'center',
  paddingTop: 10
};

let languages;

export class LaunchPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 2,
      languages: ['loading']
    };
  }

  componentWillMount() {
    return axios.get('api/languages')
      .then((lang)=>{
        this.setState({languages: lang.data});
        languages = lang;
      });
  }
 
  render() {
    let greeting;
    if ( this.props.teacher ) {
      greeting = 'Select language to teach';
    } else if ( !this.props.teacher ) {
      greeting = 'Select language to learn';
    } 
    return (
      <div>
      <h1>{ greeting }</h1>
        <DropDownMenu value={this.state.value} onChange={ this.props.handleSubmit }>
          {this.state.languages.map((lang, key)=>{
            console.log(lang, key);
            return <MenuItem value={key} key={key} label="English" primaryText={lang} />;
          })}
        </DropDownMenu>
      </div>
    );
  }
}

const mapStateToProps = ( store ) => {
  return {
    teacher: store.teacher
  };
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
  return {
    handleSubmit: ( e, i, value, fourth ) => {
      e.preventDefault();
      let language = languages.data[ value ];
      let action = { type: types.ENTER_CHAT, language: language };
      dispatch(action);
    }
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(LaunchPad);
