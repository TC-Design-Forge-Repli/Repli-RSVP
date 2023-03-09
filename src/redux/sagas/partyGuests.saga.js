import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchPartyGuestsSaga() {
    yield takeEvery('SAGA/FETCH_PARTY_GUESTS', fetchPartyGuests)
}

function* fetchPartyGuests(action) {
    try {
        const party_id = action.payload
        const response = yield axios({
            method: 'GET',
            url:`/api/partyGuests/${party_id}`
        })
        yield put({
            type:'SET_PARTY_GUESTS',
            payload: response.data,
        })
    } catch(error) {
        console.log('fetchPartyGuests SAGA function failled', error)
    }
}

export default fetchPartyGuestsSaga;