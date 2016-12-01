import React, { Component } from 'react';
import InboundVideo from './InboundVideo';
import OutboundVideo from './OutboundVideo';
import ExitChat from './ExitChat';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux';
import * as types from '../actionTypes.js';
import axios from 'axios';

export class VideoChat extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div>
        <InboundVideo/>
        <OutboundVideo/>
        <FloatingActionButton style={{color: 'white'}} onTouchTap={ this.props.handleClose }>
          <ContentAdd/>
        </FloatingActionButton>
      </div>
    );
  }
}

const mapStateToProps = ( store ) => {
  return {
  };
};

/* eslint-disable */
const mapDispatchToProps = ( dispatch, ownProps ) => {
  return {
    handleClose: () => {
      ownProps.leave();
      let action = { type: types.EXIT_CHAT };
      dispatch( action );
    }
  };
};
/* eslint-enable */

export default connect( mapStateToProps, mapDispatchToProps )( VideoChat );
