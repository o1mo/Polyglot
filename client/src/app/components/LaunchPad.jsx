import React, { Component } from 'react';
import * as types from '../actionTypes';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

  const style = {
    textAlign: 'center',
    paddingTop: 10
  };

class LaunchPad extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 2};
    this.handleSubmit = this.handleSubmit.bind(this);
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
      <div style={ style }>
        <h3>Dash is live</h3>
        <DropDownMenu value={this.state.value} onChange={this.handleSubmit}>
          <MenuItem value={1} label="English" primaryText="English" />
          <MenuItem value={2} label="Spanish" primaryText="Spanish" />
          <MenuItem value={3} label="Ethiopian" primaryText="Ethiopian" />
        </DropDownMenu>
      </div>
    );
  }
}

export default LaunchPad;
        // <form onSubmit={ this.handleSubmit.bind(this) }>
        //   <select id='language'>
        //     <option value='English'>English</option>
        //     <option value='Spanish'>Spanish</option>
        //     <option value='Mandarin'>Mandarin</option>
        //     <option value='Italian'>Italian</option>
        //     <option value='French'>French</option>
        //     <option value='Hindi'>Hindi</option>
        //     <option value='Arabic'>Arabic</option>
        //     <option value='Portuguese'>Portuguese</option>
        //     <option value='Russian'>Russian</option>
        //     <option value='Japanese'>Japanese</option>
        //   </select>
        //   <input type='submit' value='Submit'/>
        // </form>
