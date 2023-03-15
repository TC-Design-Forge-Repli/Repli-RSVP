import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* deleteOneMealSaga() {
    yield takeEvery('SAGA/DELETE_ONE_MEAL', deleteOneMeal)
}


// Will get Party Names to be listed on the Party Names page
function* deleteOneMeal(action) {
    try {
        const response = yield axios({
            method: 'DELETE',
            url:`/api/meals/${action.payload}`
        })
        yield put({
            type:'DELETED',
            payload: 'deleted meal'  
        })
    } catch(error) {
        console.log('deleteOneMeal SAGA function failed', error)
    }
}

export default deleteOneMealSaga;