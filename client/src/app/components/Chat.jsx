import React, { Component } from 'react';
import $ from 'jquery';
import SimpleWebRTC from 'simplewebrtc';

const videoStyle = {
  height: '75px'
};

class Chat extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    const videoChat = document.getElementById('videoChat');
    let language = this.props.store.getState().language;
    let postParams = {
      userId: this.props.store.getState().myId,
      teacher: this.props.store.getState().teacher
    };
    let webrtc = new SimpleWebRTC({
      localVideoEl: 'videoChat',
      remoteVideosEl: 'remoteVideos',
      autoRequestMedia: true
    });

    $.post(`/api/sessions/${ language }`, postParams)
      .done((pair) => {
        if ( pair === 'OK' ) {
          // set up answer
          webrtc.on('readyToCall', () => {
            webrtc.joinRoom(JSON.stringify(postParams.userId));
          });
        } else {
          // make a call
          webrtc.on('readyToCall', () => {
            webrtc.joinRoom(pair);
          });
        }
      });
  }
  
  render () {
    return (
      <div>
        <div id='remoteVideos'></div>
        <video style={ videoStyle } id='videoChat'></video>
      </div>
    );
  }
}

export default Chat;
