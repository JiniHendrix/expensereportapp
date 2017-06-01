const expect = require('expect')
const {shallow} = require('enzyme');
const React = require('react');
const path = require('path');

import Expenses from '../src/components/Expenses';
import Expense from '../src/components/Expense';



describe('React Components', () => {
  describe('Expenses', () => {
    it('Should render', () => {
      const wrapper = shallow(<Expenses filters={{}} expenses={[]}/>);
      expect(wrapper.exists()).toEqual(true);
    });
  });

  // describe('Expense', () => {
  //   it('Should render', () => {
  //     const wrapper = shallow(<Expense />);
  //     expect(wrapper.exists()).toEqual(true);
  //   })
  // })
})