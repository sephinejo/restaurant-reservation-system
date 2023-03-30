import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import NotFound from './NotFound';
import { today } from '../utils/date-time';
import CreateReservation from '../reservations/new/CreateReservation';
import CreateTable from '../tables/CreateTable';
import AssignSeat from '../reservations/seat/AssignSeat';
import SearchReservation from '../reservations/search/SearchReservation';
import EditReservation from '../reservations/edit/EditReservation';

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
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
      <Route exact={true} path='/reservations/:reservation_id/seat'>
        <AssignSeat />
      </Route>
      <Route path='/reservations/:reservation_id/edit'>
        <EditReservation />
      </Route>
      <Route exact={true} path='/reservations'>
        <Redirect to={{ pathname: '/dashboard', search: `?date=${today()}` }} />
      </Route>
      <Route path='/tables/new'>
        <CreateTable />
      </Route>
      <Route path='/search'>
        <SearchReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
