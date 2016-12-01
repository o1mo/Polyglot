import React from 'react';
// shallow is important it makes sure your test only tests intended component and not it's children
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';
import { Chat } from '../../client/src/app/components/Chat';
import Cards from '../../client/src/app/components/Cards';
import TextChat from '../../client/src/app/components/TextChat';
import CardAdd from '../../client/src/app/components/CardAdd';
import InboundVideo from '../../client/src/app/components/InboundVideo';
import OutboundVideo from '../../client/src/app/components/OutboundVideo';
import ExitChat from '../../client/src/app/components/ExitChat';
import TextChatInput from '../../client/src/app/components/TextChatInput';
import TextChatLog from '../../client/src/app/components/TextChatLog';

describe('Cards Component', function () {

  it('Should have a defined Cards component', function() {
    const wrapper = shallow(<Cards/>);
    expect( wrapper.props().existTest ).to.be.undefined;
  });

  xit('Should have a cards button on Dashboard', function() {
    const wrapper = mount(<Dashboard/>);
    expect( wrapper.containsAllMatchingElements([
      
    ])).to.be.true;
  });

  it('Should have a click handler on Dashbutton');

  it('Should send an action to the store');

  // update the dashboard control flow

});
