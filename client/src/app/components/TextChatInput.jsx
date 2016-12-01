import React, { Component } from 'react';

class TextChatInput extends Component {
  render() {
    return (
      <div>
        <form>
          <input type='text' placeholder='Enter text here'/>
          <input type='submit' value='Send'/>
        </form>
      </div>
    );
  }
}

export default TextChatInput;
