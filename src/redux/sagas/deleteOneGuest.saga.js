import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* deleteOneGuestSaga() {
    yield takeEvery('SAGA/DELETE_ONE_GUEST', deleteOneGuest)
}


// Will get Party Names to be listed on the Party Names page
function* deleteOneGuest(action) {
    try {
        console.log('$$$$$$$$$$',action.payload)
        const response = yield axios({
            method: 'DELETE',
            url:`/api/partyGuests/${action.payload}`
        })
        yield put({
            type:'DELETED',
            payload: 'deleted guest'  
        })
    } catch(error) {
        console.log('deleteOneGuest SAGA function failed', error)
    }
}

export default deleteOneGuestSaga;