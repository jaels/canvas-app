import React from 'react';
import { NavLink } from 'react-router-dom';

import './App.scss';

const Header: React.FC<{}> = () => {
  return (
    <div className='headerWrapper'>
      <p className='appTitle'>Hasty.ai</p>
      <div className='nav'>
        <NavLink className='navLink' activeClassName='active' to={'/draw'}>
          <i className='fas fa-pencil-alt fa-4px'></i>
          Draw
        </NavLink>
        <NavLink
          className='navLink'
          activeClassName='active'
          to={'/statistics'}
        >
          <i className='fas fa-chart-pie fa-4px'></i>
          Statistics
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
