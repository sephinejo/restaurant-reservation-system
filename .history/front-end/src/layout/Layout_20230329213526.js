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
        <img
          src='https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          alt='banner'
          width='100%'
        />
        <div className='col'>
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
