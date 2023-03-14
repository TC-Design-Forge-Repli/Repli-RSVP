import { ContactlessTwoTone } from '@material-ui/icons';
import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* rsvpSaga() {
    yield takeEvery('SAGA/UPDATE_RESPONSE', updateResponse);
    yield takeEvery('SAGA/UPDATE_MEAL', updateMeal);
    // yield takeEvery ('SAGA/FETCH_EVENT_ID', fetchEventId);
}

// Will get Party Names to be listed on the Party Names page
function* updateResponse(action) {
    try {
        const guest_id = action.payload.guest_id;
        const rsvp = action.payload.response;
        const meal_id = action.payload.meal_id;
        const response = yield axios({
            method: 'PUT',
            url:`/api/rsvp/response/${guest_id}`,
            data: {
                response: rsvp,
                meal_id: meal_id
            }
        })
    //store in reducer?
    } catch(error) {
        console.log('updateResponse SAGA function failed', error)
    }
}

function* updateMeal(action) {
    try {
        const guest_id = action.payload.guest_id;
        const rsvp = action.payload.response;
        const meal_id = action.payload.meal_id
        const response = yield axios({
            method: 'PUT',
            url:`/api/rsvp/meal/${guest_id}`,
            data: {
                response: rsvp,
                meal_id: meal_id
            }
        })  
    //store in reducer?
    } catch(error) {
        console.log('updateMeal SAGA function failed', error)
    }
}



export default rsvpSaga;