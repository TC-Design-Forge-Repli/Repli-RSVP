import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import Dashboard from '../Dashboard/Dashboard';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import CreateEventPage from '../CreateEventPage/CreateEventPage';
import AddGuestsPage from '../AddGuestsPage/AddGuestsPage';
import AddMealsPage from '../AddMealsPage/AddMealsPage';
import ManageEventPage from '../ManageEventPage/ManageEventPage';
import ManageGuestsPage from '../ManageGuestsPage/ManageGuestsPage';
import EventCodePage from '../EventCodePage/EventCodePage';
import SelectPartyPage from '../SelectPartyPage/SelectPartyPage';
import RsvpPage from '../RsvpPage/RsvpPage';
import RemindersPage from '../RemindersPage/RemindersPage';
import SuccessPage from '../SuccessPage/SuccessPage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/landingPage" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the Dashboard if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows Dashboard else shows LoginPage
            exact
            path="/dashboard"
          >
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          {/* Host Routes */}
          <ProtectedRoute exact path="/createEvent">
            <CreateEventPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/addGuests">
            <AddGuestsPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/addMeals">
            <AddMealsPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/manageEvent">
            <ManageEventPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/manageGuests">
            <ManageGuestsPage />
          </ProtectedRoute>

          {/* Guest Routes */}
          <Route exact path="/eventCode">
            <EventCodePage />
          </Route>

          <Route exact path="/selectParty/:id">
            <SelectPartyPage />
          </Route>

          <Route exact path="/rsvp">
            <RsvpPage />
          </Route>

          <Route exact path="/reminders">
            <RemindersPage />
          </Route>

          <Route exact path="/success">
            <SuccessPage />
          </Route>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/landingPage"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/dashboard" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
