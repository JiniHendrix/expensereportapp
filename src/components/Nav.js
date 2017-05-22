import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className='container-fluid'>
          <ul className='nav navbar-nav'>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <li>
              <Link to='/new_expense'>New Expense</Link>
            </li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li id='user'>
              <a href='#'>Jin Choi</a>
            </li>
          </ul>
        </div>
    </nav>
  )
}

export default Nav;