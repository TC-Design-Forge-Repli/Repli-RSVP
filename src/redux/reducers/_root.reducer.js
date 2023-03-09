import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import partyReducer from './manageGuestPage.reducer';
import partyNames from './selectParty.reducer';
import eventDetails from './createEvent.reducer';
import isEventCodeUnique from './isEventCodeUnique.reducer'
import matchEventCode from './matchEventCode.reducer';
import meals from './meals.reducer';
import partyGuests from './partyGuests.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  partyReducer,
  partyNames, 
  eventDetails,
  isEventCodeUnique,
  matchEventCode,
  meals,
  partyGuests,
});

export default rootReducer;
