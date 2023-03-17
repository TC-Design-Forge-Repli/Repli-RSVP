import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchPartyGuestsSaga() {
    yield takeEvery('SAGA/FETCH_PARTY_GUESTS', fetchPartyGuests);
    yield takeEvery('SAGA/FETCH_ALL_GUESTS', fetchAllGuests);
    yield takeEvery('SAGA/FETCH_GUESTS_PER_PARTY', fetchGuestsPerParty);
}

function* fetchPartyGuests(action) {
    try {
        const party_id = action.payload;
        const response = yield axios({
            method: 'GET',
            url:`/api/partyGuests/${party_id}`
        })
        yield put({
            type:'SET_PARTY_GUESTS',
            payload: response.data
        })
    } catch(error) {
        console.error('fetchPartyGuests SAGA function failed', error);
    }
}

function* fetchAllGuests() {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/partyGuests'
        })
        yield put({
            type: 'SET_PARTY_GUESTS',
            payload: response.data
        })
        console.log(response.data)
    } catch (error) {
        console.error('Error fetchAllGuests saga:', error);
    }
}

function* fetchGuestsPerParty(action) {
    console.log('action.payload:', action.payload);
    const event_id = action.payload;
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/partyGuests/guests/${event_id}`
        })
        yield put({
            type: 'SET_PARTY_GUESTS',
            payload: response.data
        })
        console.log('response.data:', response.data);
    } catch (error) {
        console.error('Error fetchGuestsPerParty saga:', error);
    }
}

export default fetchPartyGuestsSaga;