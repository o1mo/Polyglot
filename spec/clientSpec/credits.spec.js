import React from 'react';
// shallow is important it makes sure your test only tests intended component and not it's children
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';
import Credits from '../../client/src/app/components/Credits';

describe('Credits Component', function () {

  it('Should be stateful', function() {
    const wrapper = shallow(<Credits />);
    expect( wrapper.state().existTest ).to.be.defined;
  });

  it('credits should be a number', function() {
    const wrapper = mount(<Credits />);
    expect( wrapper.state().credits).to.be.a.number;
  });
});