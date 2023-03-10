import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import partyReducer from './manageGuestPage.reducer';
import partyNames from './selectParty.reducer';
import eventDetails from './events.reducer';
import isEventCodeUnique from './isEventCodeUnique.reducer'
import matchEventCode from './matchEventCode.reducer';
import meals from './meals.reducer';
import partyGuests from './partyGuests.reducer';
import storeNavigation from './storeNavigation.reducer';
import remindersToEdit from './editReminders.reducer'
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  partyReducer,
  partyNames, //party names that get mapped through on SelectPartyPage (for the guests)
  eventDetails,
  isEventCodeUnique,
  matchEventCode,
  meals,
  partyGuests,
  storeNavigation,
  remindersToEdit,//reducer to hold guest's: email, phone number and receive reminders choice
});

export default rootReducer;
