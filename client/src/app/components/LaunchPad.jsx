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
  
  // handleSubmit(e, i, value) {
  //   e.preventDefault();
  //   let language = value;
  //   let myId = this.props.userId;
  //   let action = { type: types.ENTER_CHAT, myId: myId, language: language };
  //   this.props.store.dispatch(action);
  // }

  render() {
    return (
      <div>
      <h1>Hello World</h1>
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
