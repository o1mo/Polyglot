import React from 'react';
// shallow is important it makes sure your test only tests intended component and not it's children
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import { NavBar } from '../../client/src/app/components/NavBar';

describe('NavBar Component', function () {

  it('Should be stateful', function() {
    const wrapper = shallow(<NavBar />);
    expect( wrapper.state().existTest).to.be.defined;
  });

  it('Should have Drawer component', function() {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.find(Drawer)).to.have.length(1);
  });

  it('Should have an AppBar component', function() {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.find(AppBar)).to.have.length(2);
  });

  it('Should have 4 menu items', function() {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.find(MenuItem)).to.have.length(4);
  });
});
