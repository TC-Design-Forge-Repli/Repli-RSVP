import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


// Will get Party Names to be listed on the Party Names page
function* fetchPartyNames(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url:`/api/partyNames/${action.payload}`
        })
        yield put({
            type:'SET_PARTY_NAMES',
            payload: response.data,
            
        })

        console.log(response.data)
        
    } catch(error) {
        console.error('fetchPartyNames SAGA function failed', error)
    }
}

function* selectPartySaga() {
    yield takeEvery('SAGA/FETCH_PARTY_NAMES', fetchPartyNames);
}


export default selectPartySaga;