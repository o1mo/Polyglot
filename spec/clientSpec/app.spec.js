import React from 'react';
// shallow is important it makes sure your test only tests intended component and not it's children
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';
import App from '../../client/src/app/components/App';
import { Dashboard } from '../../client/src/app/components/Dashboard';
import Splash from '../../client/src/app/components/Splash';
import { Chat } from '../../client/src/app/components/Chat';
import { LaunchPad } from '../../client/src/app/components/LaunchPad';

describe('React Components', function () {

  it('Should have an App component', function () {
    const wrapper = shallow(<App />);
    expect(wrapper.props().existTest).to.be.undefined;
  });

  it('Should have a Dashboard component', function () {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.props().existTest).to.be.undefined;
  });

  it('Should have a Splash component', function () {
    const wrapper = shallow(<Splash />);
    expect(wrapper.props().existTest).to.be.undefined;
  });

  it('Should have a Chat component', function () {
    const wrapper = shallow(<Chat />);
    expect(wrapper.props().existTest).to.be.undefined;
  });

  it('Should have a LaunchPad component', function () {
    const wrapper = shallow(<LaunchPad />);
    expect(wrapper.props().existTest).to.be.undefined;
  });

  it('should have a launch pad component that renders menu items', function () {
    const wrapper = shallow(<LaunchPad />);
    expect(wrapper.props().getLanguages).to.be.defined;
  });

});
