import React, { Component } from 'react';
import $ from 'jquery';
import SimpleWebRTC from 'simplewebrtc';
import { connect } from 'react-redux';
import VideoChat from './VideoChat';
import TextChat from './TextChat';
import CardAdd from './CardAdd';
import * as types from '../actionTypes.js';
import Paper from 'material-ui/Paper';
let IP;

if (process.env.NODE_ENV === 'development') {
  IP = 'http://localhost:8888';
} else {
  IP = 'https://lango-1698536321.us-west-2.elb.amazonaws.com/';
}

export class Chat extends Component {
  constructor(props) {
    super(props);

    // This is in the constructor
    // bc it needs to happen before
    // the component mounts
    this.webrtc = new SimpleWebRTC({
      // TODO: dynamically configure the url
      // for dev and production environments
      // url: `${IP}`,
      localVideoEl: 'videoChat',
      remoteVideosEl: 'inbound-video',
      autoRequestMedia: true,
      nick: this.props.myId
    });
    this.leave = () => {
      this.webrtc.leaveRoom();
    };
  }
  
  componentDidMount() {
    const videoChat = document.getElementById('videoChat');
    let language = this.props.language;
    let postParams = {
      userId: this.props.myId,
      teacher: this.props.teacher
    };
    

    $.post(`/api/sessions/${ language }`, postParams)
      .done((pair) => {
        if ( pair === 'OK' ) {
          { console.log(pair); }
          
          // set up answer
          this.webrtc.on('readyToCall', () => {
            this.webrtc.joinRoom(JSON.stringify(postParams.userId));
          });
          this.webrtc.on('videoAdded', ( video, peer ) => {
            { console.log('PEER ANS', peer.nick); }
            this.props.getPeer( peer.nick ); 
          });
        } else {
          { console.log(pair); }
          // make a call
          this.webrtc.on('readyToCall', () => {
            this.webrtc.joinRoom(pair);
          });
          this.webrtc.on('videoAdded', ( video, peer ) => {
            { console.log('PEER CALL', peer.nick); }
            this.props.getPeer( peer.nick );
          });
        }
      });
  }
  
  render () {
    return (
      <div className='chat-container'>
        <Paper className='paper vc-paper'>
          <VideoChat leave={ this.leave }/>
        </Paper>
        <div>
          <Paper className='paper card-paper'>
            <CardAdd/>
          </Paper>
          {
            // <Paper className='paper text-paper'>
            //   <TextChat/>
            // </Paper>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( store ) => {
  return {
    myId: store.myId,
    teacher: store.teacher,
    language: store.language
  };
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
  return {
    getPeer: ( peerId ) => {
      let action = { type: types.ADD_PAIR, pairId: peerId };
      dispatch( action );
    }
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Chat );
