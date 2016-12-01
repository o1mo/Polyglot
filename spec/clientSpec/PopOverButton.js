import React from 'react';
// shallow is important it makes sure your test only tests intended component and not it's children
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';
import RaisedButton from 'material-ui/RaisedButton';
import PopOverButton from '../../client/src/app/components/PopOverButton';

describe('PopOverButton Component', function () {

  it('Should be stateful', function() {
    const wrapper = shallow(<PopOverButton />);
    expect(wrapper.state().existTest).to.be.defined;
  });
});