import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchPartyGuestsSaga() {
    yield takeEvery('SAGA/FETCH_PARTY_GUESTS', fetchPartyGuests)
    yield takeEvery('SAGA/FETCH_ALL_GUESTS', fetchAllGuests)
    yield takeEvery('SAGA/FETCH_PARTY_GUEST_RESPONSES', fetchPartyGuestResponses);
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
    } catch (error) {
        console.error('Error fetchAllGuests saga:', error);
    }
}

function* fetchPartyGuestResponses(action) {
    try {
        const party_id = action.payload;
        const response = yield axios({
            method: 'GET',
            url: `/api/partyGuests/responses/${party_id}`
        })
        yield put({
            type: 'SET_PARTY_GUESTS',
            payload: response.data
        })
    } catch (error) {
        console.error('fetchPartyGuestResponses SAGA function failed', error);
    }
}

export default fetchPartyGuestsSaga;