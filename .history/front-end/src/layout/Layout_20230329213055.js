import React from 'react';
import Menu from './Menu';
import Routes from './Routes';

import './Layout.css';

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className='container-fluid'>
      <div className='row h-100'>
        <div className='col-md-2 side-bar'>
          <Menu />
        </div>
        <div className='col'>
          <img
            src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80'
            alt='banner'
            height='200px'
            width='100%'
          />
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
