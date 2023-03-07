import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import selectPartySaga from './selectPartySaga';
import checkEventCodeSaga from './checkEventCode.saga'
import remindersSaga from './reminders.saga';
import MatchEventCodeSaga from './matchEventCode.saga';
import fetchPartyGuestsSaga from './partyGuests.saga';


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
    selectPartySaga(), //fetch all party names to be rendered onto SelectPartyPage
    checkEventCodeSaga(),
    remindersSaga(),// POSTS guests communication options (email, phone, receive updates/reminders) 
    checkEventCodeSaga(),
    MatchEventCodeSaga(),
    selectPartySaga(), //fetch all party names to be rendered onto SelectPartyPage
    checkEventCodeSaga(), 
    fetchPartyGuestsSaga(),

  ]);
}
