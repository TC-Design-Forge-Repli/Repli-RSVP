import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* editRemindersPageSaga() {
    yield takeEvery('SAGA/FETCH_REMINDERS_PAGE_TO_EDIT', fetchRemindersPageToEdit);
    yield takeEvery('SAGA/UPDATE_REMINDERS_PAGE', updateRemindersPage)
}

function* fetchRemindersPageToEdit(action) {
    const response = yield axios({
        method: 'GET',
        url:'/api/reminders'
    })
    yield put({
        type: 'SET_REMINDERS_TO_EDIT', 
        payload: response.data
    })
}

function* updateRemindersPage(action) {
    const updatedReminders = action.payload
    yield axios({
        method: 'PUT',
        url:'/api/reminders',
        data: updatedReminders
    })
}

export default editRemindersPageSaga;