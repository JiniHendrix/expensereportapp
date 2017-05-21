import React from 'react';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li><a href='/'>Home</a></li>
        <li><a href='/new_expense'>New Expense</a></li>
        <li id='user'><a href='#'>Jin Choi</a></li>
      </ul>
    </nav>
  )
}

export default Nav;