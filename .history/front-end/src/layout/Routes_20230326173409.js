import React from 'react';

import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import NotFound from './NotFound';
import { today } from '../utils/date-time';
import CreateReservation from '../reservations/new/CreateReservation';

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  function useQuery() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    return params.get('date') ? params.get('date') : today();
  }
  return (
    <Switch>
      <Route exact={true} path='/'>
        <Redirect to={{ pathname: '/dashboard', search: `?date=${today()}` }} />
      </Route>
      <Route path='/dashboard'>
        <Dashboard date={today()} />
      </Route>
      <Route exact={true} path='/reservations/new'>
        <CreateReservation />
      </Route>
      <Route exact={true} path='/reservations'>
        <Redirect to={{ pathname: '/dashboard', search: `?date=${today()}` }} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
