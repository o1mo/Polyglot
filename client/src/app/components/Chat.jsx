import React, { Component } from 'react';
import $ from 'jquery';
import SimpleWebRTC from 'simplewebrtc';
import { connect } from 'react-redux';

const videoStyle = {
  height: '75px'
};

export class Chat extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    const videoChat = document.getElementById('videoChat');
    let language = this.props.language;
    let postParams = {
      userId: this.props.myId,
      teacher: this.props.teacher
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

const mapStateToProps = ( store ) => {
  return {
    userId: store.userId,
    teacher: store.teacher,
    language: store.language
  };
};

export default connect( mapStateToProps )( Chat );
