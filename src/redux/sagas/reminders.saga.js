import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* remindersSaga() {
    yield takeEvery('SAGA/CREATE_REMINDERS', createReminders);
}

function* createReminders(action) {
    try{
        const reminders = action.payload;
        //reminders= email, phone# and reminders repsonse

        const response = yield axios({
            method:'PUT',
            url:'/api/reminders',
            data: reminders
        });
    } catch (error) {
        console.log('createReminders SAGA function failed', error)
    }
}

export default remindersSaga;