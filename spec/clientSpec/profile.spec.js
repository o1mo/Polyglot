import React from 'react';
// shallow is important it makes sure your test only tests intended component and not it's children
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';
import Paper from 'material-ui/Paper';
import Profile from '../../client/src/app/components/Profile';
import NavBar from '../../client/src/app/components/NavBar';
import Credits from '../../client/src/app/components/Credits';
import ProgressBar from '../../client/src/app/components/progress';
import PopOverButton from '../../client/src/app/components/PopOverButton';

describe('Profile Component', function () {

  it('Should have props', function () {
    const wrapper = shallow(<Profile />);
    expect(wrapper.props().existTest).to.be.undefined;
  });

  it('Should render a PopOverButton component', function () {
    const wrapper = shallow(<Profile />);
    expect(wrapper.find(PopOverButton)).to.have.length(1);
  });

  it('Should render a NavBar component', function () {
    const wrapper = shallow(<Profile />);
    expect(wrapper.find(NavBar)).to.have.length(1);
  });

  it('Should render a Credits component', function () {
    const wrapper = shallow(<Profile />);
    expect(wrapper.find(Credits)).to.have.length(1);
  });

  xit('Should render a Paper component', function () {
    const wrapper = shallow(<Profile />);
    expect(wrapper.find(Paper)).to.have.length(1);
  });

  xit('Should render a ProgressBar component', function () {
    const wrapper = shallow(<Profile />);
    expect(wrapper.find(ProgressBar)).to.have.length(3);
  });
  it('Should have a username state', function () {
    const wrapper = shallow(<Profile />);
    expect(wrapper.state().username).to.be.a.string;
  });
});