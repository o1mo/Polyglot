import React from 'react';
// shallow is important it makes sure your test only tests intended component and not it's children
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';
import { Chat } from '../../client/src/app/components/Chat';
import { VideoChat } from '../../client/src/app/components/VideoChat';
import TextChat from '../../client/src/app/components/TextChat';
import CardAdd from '../../client/src/app/components/CardAdd';
import InboundVideo from '../../client/src/app/components/InboundVideo';
import OutboundVideo from '../../client/src/app/components/OutboundVideo';
import { ExitChat } from '../../client/src/app/components/ExitChat';
import TextChatInput from '../../client/src/app/components/TextChatInput';
import TextChatLog from '../../client/src/app/components/TextChatLog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
});

describe('Chat Component', function () {

  it('Should have a defined VideoChat component', function() {
    const wrapper = shallow(<VideoChat/>);
    expect( wrapper.props().existTest ).to.be.undefined;
  });
  
  it('Should have a defined TextChat component', function() {
    const wrapper = shallow(<TextChat/>);
    expect( wrapper.props().existTest ).to.be.undefined;
  }); 
  
  it('Should have a defined CardAdd component', function() {
    const wrapper = shallow(<CardAdd/>);
    expect( wrapper.props().existTest ).to.be.undefined;
  });
  
  xit('Should hold a VideoChat, Text Chat, and a Card Add', function() {
    const wrapper = mount(<Chat/>, {
      context: { muiTheme },
      childContextTypes: { muiTheme: React.PropTypes.object }
    });

    expect( wrapper.containsAllMatchingElements([
      <VideoChat/>,
      <CardAdd/>,
      <TextChat/>
    ])).to.be.true;
  });

  xit('Should render their children', function() {
    const wrapper = mount(<VideoChat/>, {
      context: { muiTheme },
      childContextTypes: { muiTheme: React.PropTypes.object }
    });
    const second = mount(<TextChat/>, {
      context: { muiTheme },
      childContextTypes: { muiTheme: React.PropTypes.object }
    });
    
    expect( wrapper.containsAllMatchingElements([
      <InboundVideo/>,
      <OutboundVideo/>,
      <ExitChat/>
    ])).to.be.true;

    expect( second.containsAllMatchingElements([
      <TextChatLog />,
      <TextChatInput />
    ])).to.be.true;
  });
  
  it('Should pass an outbound video stream to OutboundVideo');

  it('Should accept and incoming video stream to Inbound Video');

  it('Should pass chats from the TextChatInput to the TextChatLog');

});
