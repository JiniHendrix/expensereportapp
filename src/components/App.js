import React from 'react';
import Expenses from './Expenses';
import Nav from './Nav';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Expenses />
      </div>
    )
  }
}