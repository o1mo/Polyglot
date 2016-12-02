import React, { Component } from 'react';
import InboundVideo from './InboundVideo';
import OutboundVideo from './OutboundVideo';
import ExitChat from './ExitChat';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { connect } from 'react-redux';
import * as types from '../actionTypes.js';
import axios from 'axios';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  fab: {
    margin: 0,
    top: 'auto',
    right: 50,
    bottom: 50,
    left: 'auto',
    position: 'fixed',
  }
};

export class VideoChat extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div className='video-container'>
        <InboundVideo/>
        <OutboundVideo/>
        <FloatingActionButton style={styles.fab} onTouchTap={ this.props.handleClose }>
           <FontIcon className="material-icons" >call_end</FontIcon>
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
