import React, { Component } from 'react';
import TextChatInput from './TextChatInput';
import TextChatLog from './TextChatLog';

class TextChat extends Component {
  render() {
    return (
      <div>
        <TextChatLog/>
        <TextChatInput />
      </div>
    );
  }
}

export default TextChat;
