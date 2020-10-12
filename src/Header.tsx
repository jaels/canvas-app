import React from 'react';
import { NavLink } from 'react-router-dom';

import './App.scss';

const Header: React.FC<{}> = () => {
  return (
    <div className='headerWrapper'>
      <h3>Hasty.ai</h3>
      <div className='nav'>
        <NavLink className='navLink' to={'/draw'}>
          Draw
        </NavLink>
        <NavLink className='navLink' to={'/statistics'}>
          Statistics
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
