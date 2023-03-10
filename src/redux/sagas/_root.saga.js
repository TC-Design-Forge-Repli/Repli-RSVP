import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import checkEventCodeSaga from './checkEventCode.saga'
import remindersSaga from './reminders.saga';
import matchEventCodeSaga from './matchEventCode.saga';
import fetchPartyGuestsSaga from './partyGuests.saga';
import rsvpSaga from './rsvp.saga';
import selectPartySaga from './selectPartySaga';
import eventsSaga from './events.saga'
import mealsSaga from './meals.saga';
import dashboardSaga from './dashboard.saga';
import editRemindersPageSaga from './editReminders.saga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    selectPartySaga(), //fetch all party names to be rendered onto SelectPartyPage (for guests)
    checkEventCodeSaga(),
    remindersSaga(),// PUTS email, phone, receive updates/reminders to db/guests table
    matchEventCodeSaga(), // checks to see if event code exists before moving guest to select party page
    fetchPartyGuestsSaga(), //fetches party guests to display them on rsvp page
    rsvpSaga(), // handles guest rsvps(attendance and meal choice)
    eventsSaga(),
    mealsSaga(),
    dashboardSaga(),
    editRemindersPageSaga(),//fetches email, phone and receive updates/reminders from db/guests table to edit
  ]);
}
